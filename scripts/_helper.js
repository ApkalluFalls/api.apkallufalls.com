const fetch = require('node-fetch');
const fs = require('fs');

module.exports = class Helper {
  constructor(name, plural, config, callback) {
    this.api = config.api;
    this.base = "../api/" + (config.base ? config.base + "/" : '');
    this.columns = config.columns;
    this.details = config.details;
    this.format = config.format;
    this.list = !!config.list;
    this.useCallback = config.useCallback;

    this.name = name;
    this.plural = plural;

    this.callback = callback;

    this.created = 0;
    this.updated = 0;
    this.processed = 0;
    this.toProcess = 0;
  }

  fetch() {
    return new Promise((resolve) => {
      this.resolve = resolve;
      const apiPath = "https://api.xivdb.com/" + this.api;
      const columns = this.columns && this.columns.length
                    ? "?columns=" + this.columns.join(',')
                    : "";

      callApi(apiPath, columns, process.bind(this));
    });
  }
}

function callApi(apiPath, columns, callback) {
  const config = {
    method: 'GET',
    mode: 'cors'
  }

  fetch(
    apiPath + columns,
    config
  )
    .then(response => response.json())
    .then(callback)
    .catch(e => {
      throw new Error(e)
    });
}
  
function process(data) {
  if (data && typeof data === "object" && data.error)
    return console.error(data.error);

  // If we should ignore everything and use a callback, do that.
  if (this.useCallback)
    return resolve.call(this, data);
    
  // If we're not creating multiple files, process the entire dataset.
  if (this.list) {
    if (typeof this.callback !== 'function')
      throw new Error("list detected with no callback.");
    
    return this.callback(data, this.base, createJSON.bind(this));
  }
  
  const processData = (d) => {
    const fileName = d.id;
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

function createJSON(fileName, data, logMessage, isNew) {
  data = formatData.call(this, data);
  fs.writeFile(this.base + fileName + ".json", JSON.stringify(data), 'utf8', () => {
    console.log(logMessage);

    if (this.list)
      return;

    if (isNew)
      this.created++;
    else
      this.updated++;
    
    if (this.useCallback) {
      if (typeof this.callback !== 'function')
        throw new Error('individual request should have callback.');
      
      return this.callback();
    }
    
    progress.call(this);
  });
}

function formatData(data) {
  if (this.formatted)
    return data;

  if (!this.formatted && typeof this.format === 'function')
    data = this.format(data);

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

    return this.callback(data, this.resolve);
  }

  throw new Error("Resolve should not have been called.");
}