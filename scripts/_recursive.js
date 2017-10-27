'use strict';

const Helper = require('./_helper');

module.exports = function(data, name, getConfig, resolve) {
  recursiveFetch(...arguments);
}

function recursiveFetch(data, name, getConfig, resolve) {
  const entry = data.shift();
  new Helper(
    name + " " + entry.id,
    name,
    getConfig(entry),
    () => {
      if (data.length)
        return recursiveFetch(...arguments);
      resolve();
    }
  ).fetch();
}