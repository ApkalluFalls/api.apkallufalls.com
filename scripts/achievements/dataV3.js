const fs = require('fs');
const Helper = require('../_helper');
const recursiveFetch = require('../_recursiveV3');
const config = require('../_config');

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
  
        if (!categories[categoryId])
          categories[categoryId] = achievementCategory && achievementCategory.Name_en || 'Unknown';

        if (!kinds[kindId])
          kinds[kindId] = achievementKind && achievementKind.Name_en || 'Unknown';

        return {
          id: content.ID,
          category: {
            name: kinds[kindId],
            subset: categories[categoryId]
          },
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