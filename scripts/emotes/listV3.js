const Helper = require('../_helper');
const createHTML = require('../_HTML');
const createList = require('../_list');
const obtainMethod = require('../../filters/emotes/obtainMethodsV3');
const localisationStrings = require('../../filters/emotes/localisationStrings');

module.exports = new Helper("Emote", "emotes", {
  api: 'Emote',
  columns: [
    'Icon',
    'ID',
    'Name_de',
    'Name_en',
    'Name_fr',
    'Name_ja',
    'TextCommand.ID',
    'Patch'
  ],
  list: true,
  v3: true,
  format: (data, args) => {
    const textCommands = args[1];
    
    const response = {
      localisation: localisationStrings,
      data: data
        .filter(d => d['TextCommand.ID'])
        .map(entry => {
          const data = {
            icon: entry.Icon,
            id: entry.ID,
            name: {
              de: entry.Name_de,
              en: entry.Name_en,
              fr: entry.Name_fr,
              jp: entry.Name_ja
            },
            patch: entry.Patch || 2,
            commands: textCommands.results
              .filter(t => t.ID === entry['TextCommand.ID'])
              .map(c => ([
                [c.Command_en, c.Command_de, c.Command_fr, c.Command_ja],
                [c.Alias_en, c.Alias_de, c.Alias_fr, c.Alias_ja],
                [c.ShortAlias_en, c.ShortAlias_de, c.ShortAlias_fr, c.ShortAlias_ja]
              ]))[0]
          }

          const method = obtainMethod(entry, args && args[0]);
          data.ref = method && !(method instanceof Array) ? [method] : method;

          return data;
        })
    }

    const available = response.data.filter(d => {
      return d.ref && d.ref.filter(r => !r.promo && r.available).length;
    }).length;

    createHTML("emotes", {
      data: response.data,
      emoji: "😊",
      list: true,
      title: 'Emotes List | Apkallu Falls',
      description: `There are ${available} emotes available right now in-game in Final Fantasy XIV. Here's how you obtain all of them.`
    }, undefined, () => {});
    
    return response;
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("emotes", data, base, _helperCreateJSONFn);
});