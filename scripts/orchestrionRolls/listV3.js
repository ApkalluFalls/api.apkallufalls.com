const Helper = require('../_helper');
const createHTML = require('../_HTML');
const createList = require('../_list');
const obtainMethod = require('../../filters/orchestrionRolls/obtainMethods');
const localisationStrings = require('../../filters/orchestrionRolls/localisationStrings');

module.exports = new Helper("OrchestrionRoll", "orchestrionRolls", {
  api: 'Orchestrion',
  columns: [
    'Description_de',
    'Description_en',
    'Description_fr',
    'Description_ja',
    'ID',
    'Name_de',
    'Name_en',
    'Name_fr',
    'Name_ja',
    'GamePatch.ID',
    'OrchestrionUiparam.OrchestrionCategory.ID',
    'OrchestrionUiparam.Order'
  ],
  list: true,
  v3: true,
  format: (data, args) => {
    const items = args[1];

    const response = {
      localisation: localisationStrings,
      data: data.filter(entry => entry['OrchestrionUiparam.OrchestrionCategory.ID']).map(entry => {
        const result = {
          category: entry['OrchestrionUiparam.OrchestrionCategory.ID'],
          description: {
            de: entry.Description_de,
            en: entry.Description_en && entry.Description_en.split(' ').map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' '),
            fr: entry.Description_fr,
            jp: entry.Description_ja
          },
          icon: 14267,
          id: entry.ID,
          name: {
            de: entry.Name_de,
            en: entry.Name_en && entry.Name_en.split(' ').map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' '),
            fr: entry.Name_fr,
            jp: entry.Name_ja
          },
          order: entry['OrchestrionUiparam.Order']
        }

        const item = items.orchestrionRolls
          .filter(item => item.awards === result.id)[0]

        result.patch = item.patch || entry['GamePatch.ID'];

        const method = obtainMethod(result, args && args[0], item);
        result.ref = method && !(method instanceof Array) ? [method] : method;

        return result;
      })
    }

    let methods = 0;
    const available = response.data.filter(d => {
      const m = d.ref && d.ref.filter(r => !r.promo && r.available).length;
      methods += m || 0;
      return m;
    }).length;

    createHTML("orchestrion-rolls", {
      data: response.data,
      emoji: "🎶",
      list: true,
      title: 'Orchestrion Rolls List | Apkallu Falls',
      description: `There are ${methods} ways to obtain the ${available} orchestrion rolls available right now in-game in Final Fantasy XIV. Here's how you obtain all of them.`,
      section: "Orchestrion Rolls"
    }, undefined, () => {});

    return response;
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("orchestrion-rolls", data, base, _helperCreateJSONFn);
});