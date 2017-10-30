const Helper = require('../_helper');
const recursiveFetch = require('../_recursive');
const config = require('../_config');

const hasParent = require('../../filters/minions/hasParent');
const soundFilter = require('../../filters/minions/sounds');

const api = "minion";
const base = 'minion';
const name = "Minion";
const plural = "minions";

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
        const result = {
          id: data.id,
          img: (() => {
            if (data.icon === config.noIcon)
              return false;
            return data.icon.replace(config.fullImagePath, "")
          })()
        }

        // If it has a parent, info like quote etc is redundant.
        const parent = hasParent(result);
        if (parent) {
          result.parent = parent;
          return result;
        }

        result.behavior = data.behavior;

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
          en: data.summon_en,
          fr: data.summon_fr,
          jp: data.summon_ja
        };

        const sound = soundFilter(result);

        if (sound)
          result.sound = sound;

        return result;
      }
    }
  }, resolve)
});