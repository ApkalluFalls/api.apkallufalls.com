const fs = require('fs');
const Helper = require('../_helper');
const createHTML = require('../_HTML');
const recursiveFetch = require('../_recursiveV3');
const config = require('../_config');
const localisation = require('../../localisation');

const hasParent = require('../../filters/minions/hasParent');
const soundFilter = require('../../filters/minions/sounds');

const api = "Companion";
const base = 'v3/minion';
const name = "Minion";
const plural = "minions";

module.exports = new Helper(name, plural, {
  api,
  base,
  columns: [
    "ID",
    "Name_de",
    "Name_en",
    "Name_fr",
    "Name_ja"
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
        const result = {
          id: data.ID,
          img: (() => {
            if (!data.Icon)
              return false;
            return data.Icon;
          })(),
          xivdb: data.Url && ('/' + data.Url.charAt(1).toLowerCase() + data.Url.slice(2))
        }

        const parent = hasParent(result);

        if (parent) {
          const minion = all.filter(minion => +minion.ID === +parent)[0];
          result.parent = {
            id: parent,
            name: {
              de: minion.Name_de,
              en: minion.Name_en,
              fr: minion.Name_fr,
              jp: minion.Name_ja
            }
          };
          return result;
        }

        result.behavior = {
          de: data.Behavior.Name_de,
          en: data.Behavior.Name_en,
          fr: data.Behavior.Name_fr,
          jp: data.Behavior.Name_ja
        }

        result.race = {
          de: data.MinionRace.Name_de,
          en: data.MinionRace.Name_en,
          fr: data.MinionRace.Name_fr,
          jp: data.MinionRace.Name_ja
        }

        result.info = {
          de: data.DescriptionEnhanced_de,
          en: data.DescriptionEnhanced_en,
          fr: data.DescriptionEnhanced_fr,
          jp: data.DescriptionEnhanced_ja
        };

        result.quote = {
          de: data.Tooltip_de,
          en: data.Tooltip_en,
          fr: data.Tooltip_fr,
          jp: data.Tooltip_ja
        };

        result.summon = {
          de: data.Description_de,
          en: data.Description_en.replace(new RegExp(`Summon your ${data.Name_en}( minion)?\\. `, "i"), ''),
          fr: data.Description_fr,
          jp: data.Description_ja
        };

        const sound = soundFilter(result);

        if (sound)
          result.sound = sound;

        const name = data.Name_en && data.Name_en.split(' ').map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' ');
        createHTML(result.id, {
          data: result,
          emoji: "🐧",
          title: `${name} | Apkallu Falls`,
          description: `The ${name} minion on Final Fantasy XIV. ${result.info.en}.`,
          image: config.fullImagePathV3 + result.img,
          section: "Minions"
        }, "minion", () => {});

        return result;
      }
    }
  }, resolve)
});