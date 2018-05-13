const Helper = require('../_helper');
const createList = require('../_list');
const obtainMethod = require('../../filters/titles/obtainMethods');
const localisationStrings = require('../../filters/titles/localisationStrings');

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
      localisation: localisationStrings,
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

        let achievement;
        if (args && args[0]) {
          achievement = args[0].data.filter(achievement => (
            achievement.reward && achievement.reward.title === entry.id
          )).map(achievement => ({
            icon: achievement.icon,
            id: achievement.id,
            name: achievement.name,
            unavailable: achievement.unavailable,
            patch: achievement.patch
          }))[0];
        }

        if (achievement) {
          let method = obtainMethod(entry, args && args[0], achievement);
          if (method && !(method instanceof Array))
            method = [method];
          response.ref = method;
          response.patch = achievement.patch;
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