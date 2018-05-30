const fs = require('fs');
const Helper = require('../_helper');
const createHTML = require('../_HTML');
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
    "id"
  ],
  useCallback: true
}, (data, resolve) => {
  recursiveFetch(data, name, (entry, all) => {
    return {
      api: api + '/' + entry.id,
      base,
      format: (data) => {
        const categoryId = data.category_id === null ? 'unknown' : data.category_id;
        const kindId = data.kind_id === null ? 'unknown' : data.kind_id;
  
        if (!categories[categoryId])
          categories[categoryId] = data.category_name || 'Unknown';

        if (!kinds[kindId])
          kinds[kindId] = data.kind_name || 'Unknown';

        const result = {
          id: data.id,
          category: {
            name: data.kind_name,
            subset: data.category_name
          },
          help: {
            de: data.help_de,
            en: data.help_en,
            fr: data.help_fr,
            jp: data.help_ja
          },
          img: (() => {
            if (data.icon === config.noIcon)
              return false;
            return data.icon.replace(config.fullImagePath, "")
          })()
        }

        createHTML(data.id, {
          data: result,
          emoji: "🎖️",
          title: `${data.name_en} | Apkallu Falls`,
          description: `The “${data.name_en}” achievement on Final Fantasy XIV. ${data.help_en}`,
          image: data.icon,
          section: "Achievements"
        }, "achievement", () => {});

        return result;
      }
    }
  }, () => {
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