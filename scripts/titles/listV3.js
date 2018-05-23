const Helper = require('../_helper');
const createList = require('../_list');
const obtainMethod = require('../../filters/titles/obtainMethodsV3');
const localisationStrings = require('../../filters/titles/localisationStrings');

module.exports = new Helper("Title", "titles", {
  api: 'Title',
  columns: [
    'ID',
    'Name_de',
    'Name_en',
    'Name_fr',
    'Name_ja',
    'Name_female_de',
    'Name_female_en',
    'Name_female_fr',
    'Name_female_ja',
    'IsPrefix',
    'Patch'
  ],
  list: true,
  v3: true,
  format: (data, args) => {
    return {
      localisation: localisationStrings,
      data: data.map(entry => {
        const response = {
          id: entry.ID,
          name: {
            de: entry.Name_de,
            en: entry.Name_en,
            fr: entry.Name_fr,
            jp: entry.Name_ja
          },
          prefix: entry.IsPrefix
        }

        let achievement;
        if (args && args[0]) {
          achievement = args[0].data.filter(achievement => (
            achievement.reward && achievement.reward.title === entry.ID
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