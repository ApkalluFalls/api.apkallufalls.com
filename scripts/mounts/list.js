const Helper = require('../_helper');
const createHTML = require('../_HTML');
const createList = require('../_list');
const obtainMethod = require('../../filters/mounts/obtainMethods');
const localisationStrings = require('../../filters/mounts/localisationStrings');

module.exports = new Helper("Mount", "mounts", {
  api: 'mount',
  columns: [
    "can_fly_extra",
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
      data: data.filter(entry => entry.icon).map(entry => {
        let method = obtainMethod(entry, args && args[0], data);

        if (method && !(method instanceof Array))
          method = [method];

        return {
          id: entry.id,
          icon: entry.icon,
          name: {
            de: entry.name_de,
            en: entry.name_en,
            fr: entry.name_fr,
            jp: entry.name_ja
          },
          patch: entry.patch,
          canFly: entry.can_fly_extra,
          ref: method
        }
      })
    };

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