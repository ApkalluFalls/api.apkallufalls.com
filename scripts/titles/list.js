const Helper = require('../_helper');
const createList = require('../_list');

module.exports = new Helper("Patch", "patches", {
  api: 'title',
  columns: [
    'id',
    'name_de',
    'name_en',
    'name_fr',
    'name_ja',
    'name_female_de',
    'name_female_en',
    'name_female_fr',
    'name_female_ja',
    'is_prefix'
  ],
  list: true,
  format: (data) => {
    return {
      data: data.map(entry => {
        const response = {
          id: entry.id,
          name: {
            de: entry.name_de,
            en: entry.name_en,
            fr: entry.name_fr,
            jp: entry.name_ja
          }
        }

        if (entry.name_en !== entry.name_female_en)
          response.female = {
            de: entry.name_female_de,
            en: entry.name_female_en,
            fr: entry.name_female_fr,
            jp: entry.name_female_ja
          }

        return response;
      })
    }
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("titles", data, base, _helperCreateJSONFn);
});