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
    'is_prefix',
    'patch'
  ],
  list: true,
  format: (data, args) => {
    return {
      data: data.map(entry => {
        const response = {
          id: entry.id,
          name: {
            de: entry.name_de,
            en: entry.name_en,
            fr: entry.name_fr,
            jp: entry.name_ja
          },
          prefix: entry.is_prefix
        }

        if (args && args[0]) {
          response.achievement = args[0].data.filter(achievement => (
            achievement.reward && achievement.reward.title === entry.id
          )).map(achievement => ({
            icon: achievement.icon,
            id: achievement.id,
            name: achievement.name,
            patch: achievement.patch
          }))[0];
        }

        if (response.achievement) {
          response.patch = response.achievement.patch;
          delete response.achievement.patch;
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