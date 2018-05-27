const Helper = require('../_helper');
const createHTML = require('../_HTML');
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
    const response = {
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
            response.ref = method && !(method instanceof Array) ? [method] : method;
            break;
          }
        }

        return response;
      })
    }

    let methods = 0;
    const available = response.data.filter(d => {
      const m = d.ref && d.ref.filter(r => !r.promo && r.available).length;
      methods += m || 0;
      return m;
    }).length;

    createHTML("minions", {
      data: response.data,
      emoji: "🐧",
      list: true,
      title: 'Minions List | Apkallu Falls',
      description: `There are ${methods} ways to obtain the ${available} minions available right now in-game in Final Fantasy XIV. Here's how you obtain all of them.`
    }, undefined, () => {});

    return response;
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("minions", data, base, _helperCreateJSONFn);
});