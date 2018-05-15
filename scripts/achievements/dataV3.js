const fs = require('fs');
const Helper = require('../_helper');
const recursiveFetch = require('../_recursive');
const config = require('../_config');

const api = "achievement";
const base = 'achievement';
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
        const categoryId = achievementCategory.ID === null ? 'unknown' : achievementCategory.ID;
        const kindId = achievementCategory.AchievementKind === null ? 'unknown' : achievementCategory.AchievementKind;
  
        if (!categories[categoryId])
          categories[categoryId] = achievementCategory.Name || 'Unknown';

        if (!kinds[kindId])
          kinds[kindId] = achievementCategory.AchievementKind || 'Unknown';

        return {
          id: content.ID,
          category: {
            name: achievementCategory.AchievementKind,
            subset: achievementCategory.Name
          },
          help: {
            de: content.Description_de,
            en: content.Description,
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
    throw new Error('enough');
    fs.writeFile(
      "../docs/achievement_categories.json",
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