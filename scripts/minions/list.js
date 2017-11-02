const Helper = require('../_helper');
const createList = require('../_list');
const obtainMethod = require('../../filters/minions/obtainMethods');

module.exports = new Helper("Minion", "minions", {
  api: 'minion',
  columns: [
    "icon",
    "id",
    "name_de",
    "name_en",
    "name_fr",
    "name_ja",
    "patch"
  ],
  list: true,
  format: (data, args) => {
    return data.map(entry => {
      let method = obtainMethod(entry, args && args[0]);

      if (method && !(method instanceof Array))
        method = [method];
      
      return {
        id: entry.id,
        icon: entry.icon,
        name: {
          de: entry.name_de,
          en: entry.name_en,
          fr: entry.name_fr,
          jp: entry.name_ja
        },
        patch: entry.patch,
        ref: method
      }
    })
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("minions", data, base, _helperCreateJSONFn);
});