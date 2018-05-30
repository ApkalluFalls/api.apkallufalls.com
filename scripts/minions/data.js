const Helper = require('../_helper');
const createHTML = require('../_HTML');
const recursiveFetch = require('../_recursive');
const config = require('../_config');

const hasParent = require('../../filters/minions/hasParent');
const soundFilter = require('../../filters/minions/sounds');

const api = "minion";
const base = 'minion';
const name = "Minion";
const plural = "minions";

let minions;

module.exports = new Helper(name, plural, {
  api,
  base,
  columns: [
    "id",
    "name_de",
    "name_en",
    "name_fr",
    "name_ja"
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
          img: (() => {
            if (data.icon === config.noIcon)
              return false;
            return data.icon.replace(config.fullImagePath, "");
          })(),
          xivdb: data.url_xivdb.replace(/^https?\:\/\/xivdb\.com/, '')
        }

        // If it has a parent, info like quote etc is redundant.
        const parent = hasParent(result);
        if (parent) {
          const minion = all.filter(minion => +minion.id === +parent)[0];
          result.parent = {
            id: parent,
            name: {
              de: minion.name_de,
              en: minion.name_en,
              fr: minion.name_fr,
              jp: minion.name_ja
            }
          };
          return result;
        }

        result.behavior = data.behavior;
        result.race = data.race;

        result.info = {
          de: data.info1_de,
          en: data.info1_en,
          fr: data.info1_fr,
          jp: data.info1_ja
        };

        result.quote = {
          de: data.info2_de,
          en: data.info2_en,
          fr: data.info2_fr,
          jp: data.info2_ja
        };

        result.summon = {
          de: data.summon_de,
          en: data.summon_en.replace(new RegExp(`Summon your ${data.name_en}( minion)?\\. `, "i"), ''),
          fr: data.summon_fr,
          jp: data.summon_ja
        };

        const sound = soundFilter(result);

        if (sound)
          result.sound = sound;

        createHTML(data.id, {
          data: result,
          emoji: "🐧",
          title: `${data.name_en} | Apkallu Falls`,
          description: `The ${data.name_en} minion on Final Fantasy XIV. ${data.info1_en}.`,
          image: data.icon,
          section: "Minions"
        }, "minion", () => {});

        return result;
      }
    }
  }, resolve)
});