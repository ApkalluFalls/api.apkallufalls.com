const Helper = require('../_helper');
const createList = require('../_list');
const obtainMethod = require('../../filters/minions/obtainMethods');
const localisationStrings = require('../../filters/minions/localisationStrings');

module.exports = new Helper("Minion", "minions", {
  api: 'minion',
  columns: [
    "icon",
    "id",
    "name_de",
    "name_en",
    "name_fr",
    "name_ja",
    "patch"
  ],
  list: true,
  format: (data, args) => {
    return {
      localisation: localisationStrings,
      data: data.map(entry => {
        const response = {
          id: entry.id,
          icon: entry.icon,
          name: {
            de: entry.name_de,
            en: entry.name_en,
            fr: entry.name_fr,
            jp: entry.name_ja
          },
          patch: entry.patch
        }

        switch (response.id) {
          // Ignore child minions.
          // Individual Minion Of Light minions.
          case 68:
          case 69:
          case 70:
          // Individual Wind-up Leader minions.
          case 72:
          case 73:
          case 74:
            response.hasParent = true;
            break;

          // Populate method on all others.
          default: {
            const method = obtainMethod(entry, args && args[0]);
            if (method && !(method instanceof Array))
              response.ref = [method];
            break;
          }
        }

        return response;
      })
    }
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("minions", data, base, _helperCreateJSONFn);
});