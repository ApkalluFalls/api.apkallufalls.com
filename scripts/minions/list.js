const Helper = require('../_helper');
const createList = require('../_list');

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
  format: (data) => {
    return data.map(entry => {
      return {
        id: entry.id,
        icon: entry.icon,
        name: {
          de: entry.name_de,
          en: entry.name_en,
          fr: entry.name_fr,
          jp: entry.name_ja
        },
        patch: entry.patch
      }
    })
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("minions", data, base, _helperCreateJSONFn);
});