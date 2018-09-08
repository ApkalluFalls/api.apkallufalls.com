const fetch = require('node-fetch');
const fs = require('fs');

module.exports = class Helper {
  constructor(name, plural, config, callback) {
    this.api = config.api;
    this.base = "../docs/" + (config.base ? config.base + "/" : '');
    this.columns = config.columns;
    this.details = config.details;
    this.format = config.format;
    this.list = !!config.list;
    this.useCallback = config.useCallback;
    this.tag = config.tag;
    this.v3 = config.v3;
    this.customId = config.customId;

    this.errors = 0;

    this.name = name;
    this.plural = plural;

    this.callback = callback;

    this.created = 0;
    this.updated = 0;
    this.processed = 0;
    this.toProcess = 0;
  }

  fetch() {
    this.args = arguments;

    return new Promise((resolve) => {
      this.resolve = resolve;
      const apiPath = this.v3
                    ? "https://xivapi.com/" + this.api.charAt(0).toUpperCase() + this.api.slice(1)
                    : "https://api.xivdb.com/" + this.api;
      const columns = this.columns && this.columns.length
                    ? "?columns=" + this.columns.join(',')
                    : "?af=1";

      if (!this.v3 || !this.list)
        return callApi(apiPath, columns, process.bind(this), this.tag);

      let paginated = true;

      if (this.api === 'PatchList')
        paginated = false;

      recursiveFetch(apiPath + columns, !paginated || undefined, undefined, this.tag)
        .then(data => process.call(this, data))
        .catch(e => console.error(e));
    });
  }
}

async function callApi(apiPath, columns, callback, tag) {
  const apiKey = await fs.readFileSync('../xivapi-key.txt', 'utf-8');

  if (!apiKey) {
    throw new Error('XIVDB API key required.')
  }

  const config = {
    method: 'GET',
    mode: 'cors'
  }

  fetch(
    `${apiPath}${columns}${columns ? '&' : '?'}key=${apiKey}${tag ? `&tags=${tag}` : ''}`,
    config
  )
    .then(response => response.json())
    .then(callback)
    .catch(e => {
      console.info(e);

      if (this.errors > 10)
        throw new Error("XIVDB API error: " + e);

      ++this.errors;
      console.info("API retry attempt ", this.errors);
      callApi(apiPath, columns, callback, tag);
    });
}

async function recursiveFetch(api, result = [], page = 1, tag) {
  const apiKey = await fs.readFileSync('../xivapi-key.txt', 'utf-8');

  if (!apiKey) {
    throw new Error('XIVDB API key required.')
  }

  const url = `${api}&page=${page}&max_items=1000&key=${apiKey}${tag ? `&tags=${tag}` : ''}`;
  const data = await fetch(url)
    .then(response => response.json());

  if (data.Error)
    throw new Error(`${url} threw error: ${data.Message}`);

  if (typeof result === 'boolean' && result)
    return data;

  result = [...result, ...data.Results];

  if (data.Pagination.PageNext !== 1)
    return recursiveFetch(api, result, data.Pagination.PageNext, tag);
  return result;
}
  
function process(data) {
  if (data && typeof data === "object" && data.error)
    return console.error(data.error);

  if (this.v3) {
    if (data instanceof Array)
      data = data.filter(d => d.ID !== 0);
  }

  // If we should ignore everything and use a callback, do that.
  if (this.useCallback)
    return resolve.call(this, data);
    
  // If we're not creating multiple files, process the entire dataset.
  if (this.list) {
    if (typeof this.callback !== 'function')
      throw new Error("list detected with no callback.");
    
    return this.callback(data, this.base + (this.v3 ? 'v3/' : ''), createJSON.bind(this), this.resolve);
  }
  
  const processData = (d) => {
    const fileName = this.customId ? this.customId : (this.v3 ? d.ID : d.id);
    const filePath = this.base + fileName + ".json";
    let logMessage = this.name + " @ " + filePath + " ";
  
    fs.exists(filePath, (exists) => {
      d = formatData.call(this, d);

      if (exists)
        return ((d, fileName, logMessage) => {
          fs.readFile(filePath, 'utf8', (e, data) => {
            // Do nothing if there are no changes.
            if (data === JSON.stringify(d)) {
              if (this.useCallback)
                return resolve.call(this, d, logMessage += "unchanged.");
              return progress.call(this);
            }
  
            logMessage += "updated.";
            
            createJSON.call(this, fileName, d, logMessage, false);
          });
        })(d, fileName, logMessage);
  
      logMessage += "created.";
      
      createJSON.call(this, fileName, d, logMessage, true);
    })
  };
  
  if (data instanceof Array) {
    this.toProcess = data.length;
    console.log("Starting processing " + this.plural + ". " + this.toProcess + " discovered.");
    console.log("\n");
    data.forEach(d => processData);
  } else if (data && typeof data === 'object') {
    this.toProcess = 1;
    this.useCallback = true;
    processData(data);
  }
}

function createJSON(fileName, data, logMessage, isNew, resolve) {
  data = formatData.call(this, data);
  fs.writeFile(this.base + (this.list && this.v3 ? 'v3/' : '') + fileName + ".json", JSON.stringify(data), 'utf8', () => {
    console.log(logMessage);

    if (this.list) {
      if (typeof resolve === 'function')
        resolve();
      return;
    }

    if (isNew)
      this.created++;
    else
      this.updated++;
    
    if (this.useCallback) {
      if (typeof this.callback !== 'function')
        throw new Error('individual request should have callback.');
      
      return this.callback();
    }

    if (this.list && typeof resolve === 'function')
      resolve();
    
    progress.call(this);
  });
}

function formatData(data) {
  if (this.formatted)
    return data;

  if (!this.formatted && typeof this.format === 'function')
    data = this.format(data, this.args);

  this.formatted = true;
  return data;
}

function progress() {
  this.processed++;

  if (this.processed === this.toProcess) {
    if (this.created || this.updated)
      console.log("\n");

    console.log(this.created + " " + this.plural + " created.");
    console.log(this.updated + " " + this.plural + " updated.");
    console.log("\n");
  }
}

function resolve(data, logMessage) {
  if (this.useCallback) {
    if (typeof this.callback !== 'function')
      throw new Error("useCallback detected with no callback.");

    if (logMessage)
      console.log(logMessage);

    return this.callback(data, this.resolve, this.args);
  }

  throw new Error("Resolve should not have been called.");
}