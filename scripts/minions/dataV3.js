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
          id: data.content.ID,
          img: (() => {
            if (!data.content.Icon)
              return false;
            return config.fullImagePathV3 + data.content.Icon;
          })(),
          xivdb: data.content.Url && ('/' + data.content.Url.charAt(1).toLowerCase() + data.content.Url.slice(2))
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
          de: data.content.Behavior.Name_de,
          en: data.content.Behavior.Name_en,
          fr: data.content.Behavior.Name_fr,
          jp: data.content.Behavior.Name_ja
        }

        result.race = {
          de: data.content.MinionRace.Name_de,
          en: data.content.MinionRace.Name_en,
          fr: data.content.MinionRace.Name_fr,
          jp: data.content.MinionRace.Name_ja
        }

        result.info = {
          de: data.content.DescriptionEnhanced_de,
          en: data.content.DescriptionEnhanced_en,
          fr: data.content.DescriptionEnhanced_fr,
          jp: data.content.DescriptionEnhanced_ja
        };

        result.quote = {
          de: data.content.Tooltip_de,
          en: data.content.Tooltip_en,
          fr: data.content.Tooltip_fr,
          jp: data.content.Tooltip_ja
        };

        result.summon = {
          de: data.content.Description_de,
          en: data.content.Description_en.replace(new RegExp(`Summon your ${data.name_en}( minion)?\\. `, "i"), ''),
          fr: data.content.Description_fr,
          jp: data.content.Description_ja
        };

        const sound = soundFilter(result);

        if (sound)
          result.sound = sound;

        const name = data.content.Name_en && data.content.Name_en.split(' ').map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' ');
        createHTML(result.id, {
          data: result,
          emoji: "🐧",
          title: `${name} | Apkallu Falls`,
          description: `The ${name} minion on Final Fantasy XIV. ${result.info.en}.`,
          image: result.img,
          section: "Minions"
        }, "minion", () => {});

        return result;
      }
    }
  }, resolve)
});