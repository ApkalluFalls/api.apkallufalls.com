const fs = require('fs');
const Helper = require('../_helper');
const recursiveFetch = require('../_recursiveV3');
const config = require('../_config');
const localisation = require('../../localisation');

const api = "achievement";
const base = 'v3/achievement';
const name = "Achievement";
const plural = "achievements";

const categories = {};
const kinds = {};

module.exports = new Helper(name, plural, {
  api,
  base,
  columns: [
    "ID"
  ],
  useCallback: true,
  list: true,
  v3: true
}, (data, resolve) => {
  recursiveFetch(data, name, (entry, all) => {
    return {
      v3: true,
      api: api + '/' + entry.ID,
      base,
      format: (data) => {
        const content = data.content;
        const achievementCategory = content.AchievementCategory;
        const achievementKind = achievementCategory && achievementCategory.AchievementKind;
        const categoryId = achievementCategory && achievementCategory.ID === null ? 'unknown' : achievementCategory.ID;
        const kindId = achievementKind && achievementKind.ID === null ? 'unknown' : achievementKind.ID;
        const unknown = localisation['Unknown'];

        if (!categories[categoryId])
          categories[categoryId] = achievementCategory && {
            de: achievementCategory.Name_de,
            en: achievementCategory.Name_en,
            fr: achievementCategory.Name_fr,
            jp: achievementCategory.Name_ja
          } || {
            en: 'Unknown',
            de: unknown.de,
            de: unknown.fr,
            de: unknown.jp
          };

        if (!kinds[kindId])
          kinds[kindId] = achievementKind && {
            de: achievementKind.Name_de,
            en: achievementKind.Name_en,
            fr: achievementKind.Name_fr,
            jp: achievementKind.Name_ja
          } || {
            en: 'Unknown',
            de: unknown.de,
            de: unknown.fr,
            de: unknown.jp
          };

        return {
          id: content.ID,
          help: {
            de: content.Description_de,
            en: content.Description_en,
            fr: content.Description_fr,
            jp: content.Description_ja
          },
          img: (() => {
            return content.Icon;
          })()
        }
      }
    }
  }, () => {
    fs.writeFile(
      "../docs/v3/achievement_categories.json",
      JSON.stringify({
        categories,
        kinds
      }),
      'utf8',
      () => {
        console.log("Achievement categories updated.");
        resolve();
      }
    );
  })
});