const Helper = require('../_helper');
const createHTML = require('../_HTML');
const createList = require('../_list');
const obtainMethod = require('../../filters/barding/obtainMethodsV3');
const localisationStrings = require('../../filters/barding/localisationStrings');

module.exports = new Helper("Barding", "barding", {
  api: 'BuddyEquip',
  columns: [
    'IconBody',
    'IconHead',
    'IconLegs',
    'ID',
    'Name_de',
    'Name_en',
    'Name_fr',
    'Name_ja',
    'GamePatch.ID',
    'GrandCompany.Name_de',
    'GrandCompany.Name_en',
    'GrandCompany.Name_fr',
    'GrandCompany.Name_ja'
  ],
  list: true,
  v3: true,
  format: (data, args) => {
    const items = args[1];

    const response = {
      localisation: localisationStrings,
      data: data
        .filter(entry => entry.IconBody || entry.IconHead || entry.IconLegs)
        .map(entry => {
          const result = {
            icon: +(entry.IconBody || entry.IconHead || entry.IconLegs).replace(/^.*\/(\d+)\.png$/, (match, group) => {
              return group;
            }),
            id: entry.ID,
            name: {
              de: entry.Name_de,
              en: entry.Name_en,
              fr: entry.Name_fr,
              jp: entry.Name_ja
            },
            patch: entry['GamePatch.ID'] || tempGetPatch(entry.ID)
          }

          const item = items.barding
            .filter(item => item.awards === result.id)
            .map(item => ({ name: item.name }))[0];

          const itemRaw = items.barding
            .filter(item => item.awards === result.id)[0];
          
          if (!itemRaw || itemRaw.untradable)
            result.untradable = true;

          const method = obtainMethod(result, args && args[0], data, item, {
            de: entry['GrandCompany.Name_de'],
            en: entry['GrandCompany.Name_en'],
            fr: entry['GrandCompany.Name_fr'],
            jp: entry['GrandCompany.Name_ja']
          });
          result.ref = method && !(method instanceof Array) ? [method] : method;

          return result;
        })
    }

    const available = response.data.filter(d => {
      return d.ref && d.ref.filter(r => !r.promo && r.available).length;
    }).length;

    createHTML("chocobo-barding", {
      data: response.data,
      emoji: "💺",
      list: true,
      title: 'Chocobo Barding List | Apkallu Falls',
      description: `There are ${available} sets of chocobo barding available right now in-game in Final Fantasy XIV. Here's how you obtain all of them.`,
      section: 'Chocobo Barding'
    }, undefined, () => {});
    
    return response;
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("barding", data, base, _helperCreateJSONFn);
});

// Temporary workaround until XIVDB implements patch data for barding.
function tempGetPatch(id) {
  switch (id) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 19:
    case 27:
      return 2; // 2.0

    case 20:
    case 21:
      return 4; // 2.1

    case 22:
    case 23:
    case 24:
      return 8; // 2.2

    case 25:
    case 26:
      return 11; // 2.3

    case 28:
      return 14; // 2.4

    case 30:
      return 16; // 2.5

    case 29:
      return 17; // 2.51

    case 18:
    case 31:
    case 32:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
      return 19; // 3.0

    case 39:
      return 22; // 3.07

    case 40:
      return 23; // 3.1

    case 41:
    case 42:
      return 25; // 3.2

    case 44:
      return 26; // 3.25

    case 45:
      return 27; // 3.3

    case 43:
    case 47:
    case 48:
    case 49:
      return 30; // 3.4

    case 46:
    case 50:
    case 51:
    case 52:
      return 32; // 3.5

    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return 36; // 4.0

    case 59:
    case 60:
      return 40; // 4.1
    
    case 58:
    case 62:
    case 63:
      return 43; // 4.2

    case 61:
      return 44; // 4.25

    case 64:
      return 45; // 4.3

    default:
      console.info('Unknown patch for chocobo barding ' + id + '.');
      return 2;
  }
}