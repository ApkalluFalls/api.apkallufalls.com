const Helper = require('../_helper');
const createList = require('../_list');

module.exports = new Helper("Patch", "patches", {
  api: 'title',
  list: true,
  format: (data) => {
    return {
      data: data.map(entry => ({
        id: entry.id,
        name: {
          de: entry.name_de,
          en: entry.name_en,
          fr: entry.name_fr,
          jp: entry.name_ja
        }
      }))
    }
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("titles", data, base, _helperCreateJSONFn);
});