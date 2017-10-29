const Helper = require('../_helper');
const recursiveFetch = require('../_recursive');
const config = require('../_config');

const api = "achievement";
const base = 'achievement';
const name = "Achievement";
const plural = "achievements";

module.exports = new Helper(name, plural, {
  api,
  base,
  columns: [
    "id"
  ],
  useCallback: true
}, (data, resolve) => {
  recursiveFetch(data, name, (entry) => {
    return {
      api: api + '/' + entry.id,
      base,
      format: (data) => {
        return {
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
      }
    }
  }, resolve)
});