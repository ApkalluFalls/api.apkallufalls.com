const Helper = require('../_helper');
const createList = require('../_list');
const obtainMethod = require('../../filters/titles/obtainMethods');
const localisationStrings = require('../../filters/titles/localisationStrings');

module.exports = new Helper("Title", "titles", {
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
          ))[0];
        }

        if (achievement) {
          let method = obtainMethod(entry, args && args[0], achievement);

          if (method && !(method instanceof Array))
            method = [method];

          response.icon = achievement.icon;
          response.patch = achievement.patch;
          response.ref = method;
          response.tag = achievement.tag;
        }

        const femaleTitles = {};

        if (entry.Name_en !== entry.Name_female_en)
          femaleTitles.en = entry.Name_female_en;

        if (entry.Name_de !== entry.Name_female_de)
          femaleTitles.de = entry.Name_female_de;

        if (entry.Name_fr !== entry.Name_female_fr)
          femaleTitles.fr = entry.Name_female_fr;

        if (entry.Name_ja !== entry.Name_female_ja)
          femaleTitles.jp = entry.Name_female_ja;

        if (Object.keys(femaleTitles).length)
          response.female = femaleTitles;

        return response;
      })
    }
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("titles", data, base, _helperCreateJSONFn);
});