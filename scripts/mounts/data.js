const Helper = require('../_helper');
const createHTML = require('../_HTML');
const recursiveFetch = require('../_recursive');
const config = require('../_config');

const soundFilter = require('../../filters/mounts/sounds');

const api = "mount";
const base = 'mount';
const name = "Mount";
const plural = "mounts";

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
        const result = {
          id: data.id,
          info: {
            de: data.info1_de,
            en: data.info1_en,
            fr: data.info1_fr,
            jp: data.info1_ja
          },
          quote: {
            de: data.info2_de,
            en: data.info2_en,
            fr: data.info2_fr,
            jp: data.info2_ja
          },
          summon: {
            de: data.summon_de,
            en: data.summon_en,
            fr: data.summon_fr,
            jp: data.summon_ja
          },
          img: (() => {
            if (data.icon === config.noIcon)
              return false;
            return data.icon.replace(config.fullImagePath, "")
          })()
        }

        const sound = soundFilter(result);
        
        if (sound)
          result.sound = sound;

        createHTML(data.id, {
          data: result,
          emoji: "🚲",
          title: `${data.name_en} | Apkallu Falls`,
          description: `The ${data.name_en} mount on Final Fantasy XIV. ${data.info1_en}.`,
          image: data.icon,
          section: "Mounts"
        }, "mount", () => {});

        return result;
      }
    }
  }, resolve)
});