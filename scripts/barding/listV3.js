const Helper = require('../_helper');
const createHTML = require('../_HTML');
const createList = require('../_list');
const obtainMethod = require('../../filters/barding/obtainMethodsV3');
const localisationStrings = require('../../filters/barding/localisationStrings');

module.exports = new Helper("Barding", "barding", {
  api: 'BuddyEquip',
  columns: [
    'IconBody',
    'ID',
    'Name_de',
    'Name_en',
    'Name_fr',
    'Name_ja',
    'GamePatch.ID'
  ],
  list: true,
  v3: true,
  format: (data, args) => {
    const items = args[1];

    const response = {
      localisation: localisationStrings,
      data: data.map(entry => {
          const result = {
            icon: +entry.IconBody.replace(/^.*\/(\d+)\.png$/, (match, group) => {
              return group;
            }),
            id: entry.ID,
            name: {
              de: entry.Name_de,
              en: entry.Name_en,
              fr: entry.Name_fr,
              jp: entry.Name_ja
            },
            patch: entry['GamePatch.ID'] || 2
          }

          const item = items.barding
            .filter(item => item.awards === result.id)
            .map(item => ({ name: item.name }))[0];

          const method = obtainMethod(result, args && args[0], data, item);
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