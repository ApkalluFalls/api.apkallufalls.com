'use strict';

const Helper = require('./_helper');

module.exports = function(data, name, getConfig, resolve) {
  const all = data.slice(0);
  recursiveFetch(all, ...arguments);
}

function recursiveFetch(all, data, name, getConfig, resolve) {
  const entry = data.shift();
  new Helper(
    name + " " + entry.ID,
    name,
    getConfig(entry, all),
    () => {
      if (data.length)
        return recursiveFetch(...arguments);
      resolve();
    }
  ).fetch();
}