const Helper = require('../_helper');
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
    return {
      localisation: localisationStrings,
      data: data.map(entry => {
        let method = obtainMethod(entry, args && args[0]);

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
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("mounts", data, base, _helperCreateJSONFn);
});