'use strict';

const fs = require('fs');

module.exports = function(fileName, data, base, _helperCreateJSONFn) {
  fs.exists(base + "/" + fileName + ".json", (exists) => {
    let logMessage = fileName + " list ";
    
    if (exists)
      logMessage += "updated.";
    else
      logMessage += "created.";

    logMessage += "\n";
    
    _helperCreateJSONFn.call(this, fileName, data, logMessage);
  })
}