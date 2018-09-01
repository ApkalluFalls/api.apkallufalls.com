const Helper = require('../_helper');
const createHTML = require('../_HTML');
const createList = require('../_list');
const obtainMethod = require('../../filters/mounts/obtainMethods');
const localisationStrings = require('../../filters/mounts/localisationStrings');

module.exports = new Helper("Mount", "mounts", {
  api: 'Mount',
  columns: [
    'IconSmall',
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
      data: data.filter(entry => entry.IconSmall && (
        // Mount 39 has an icon for some reason...
        entry.Name_de || entry.Name_en || entry.Name_fr || entry.Name_ja
      )).map(entry => {
        const result = {
          icon: +entry.IconSmall.replace(/^.*\/(\d+)\.png$/, (match, group) => {
            return group;
          }),
          id: entry.ID,
          name: {
            de: entry.Name_de,
            en: entry.Name_en && entry.Name_en.split(' ').map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' '),
            fr: entry.Name_fr,
            jp: entry.Name_ja
          },
          patch: entry.GamePatch.ID || 2
        }

        const method = obtainMethod(result, args && args[0], data.map(d => ({
          ...d,
          id: d.ID,
          name_de: d.Name_de,
          name_en: d.Name_en,
          name_fr: d.Name_fr,
          name_ja: d.Name_ja
        })));
        result.ref = method && !(method instanceof Array) ? [method] : method;

        const item = items.mounts.filter(i => i.awards === result.id)[0];

        if (item && item.untradable)
          result.untradable = true;

        return result;
      })
    }

    let methods = 0;
    const available = response.data.filter(d => {
      const m = d.ref && d.ref.filter(r => !r.promo && r.available).length;
      methods += m || 0;
      return m;
    }).length;

    createHTML("mounts", {
      data: response.data,
      emoji: "🚲",
      list: true,
      title: 'Mounts List | Apkallu Falls',
      description: `There are ${methods} ways to obtain the ${available} mounts available right now in-game in Final Fantasy XIV. Here's how you obtain all of them.`,
      section: "Mounts"
    }, undefined, () => {});

    return response;
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("mounts", data, base, _helperCreateJSONFn);
});