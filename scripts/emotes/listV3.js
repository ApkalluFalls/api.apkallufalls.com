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
    'EmoteCategory.Name_de',
    'EmoteCategory.Name_en',
    'EmoteCategory.Name_fr',
    'EmoteCategory.Name_ja',
    'GamePatch.ID'
  ],
  list: true,
  v3: true,
  format: (data, args) => {
    const textCommands = args[1];
    const items = args[2];

    const response = {
      localisation: localisationStrings,
      data: data
        .filter(d => d['TextCommand.ID'])
        .map(entry => {
          // Items only point to one emote. Some, like the one which teaches
          // Red Ranger Pose A and Red Ranger Pose B, have 2 emotes. This
          // corrects the lack of valid pointer.
          let itemOffsetId = entry.ID;
          switch (entry.ID) {
            case 130:
              itemOffsetId = 134;
              break;

            case 131:
              itemOffsetId = 135;
              break;

            case 132:
              itemOffsetId = 136;
              break;
          }

          const result = {
            category: {
              de: entry['EmoteCategory.Name_de'],
              en: entry['EmoteCategory.Name_en'],
              fr: entry['EmoteCategory.Name_fr'],
              jp: entry['EmoteCategory.Name_ja']
            },
            icon: +entry.Icon.replace(/^.*\/(\d+)\.png$/, (match, group) => {
              return group;
            }),
            id: entry.ID,
            name: {
              de: entry.Name_de,
              en: entry.Name_en,
              fr: entry.Name_fr,
              jp: entry.Name_ja
            },
            patch: entry['GamePatch.ID'] || 2,
            commands: textCommands
              .filter(t => t.ID === entry['TextCommand.ID'])
              .map(c => ({
                main: {
                  de: c.Command_de,
                  en: c.Command_en,
                  fr:c.Command_fr,
                  jp: c.Command_ja
                },
                alias: {
                  de: c.Alias_de,
                  en: c.Alias_en,
                  fr: c.Alias_fr,
                  jp: c.Alias_ja
                },
                short: {
                  de: c.ShortAlias_de,
                  en: c.ShortAlias_en,
                  fr: c.ShortAlias_fr,
                  jp: c.ShortAlias_ja
                }
              }))[0],
          }

          const item = items.emotes
            .filter(item => item.awards === itemOffsetId)
            .map(item => ({ name: item.name }))[0];
          
          if (!item || item.untradable)
            result.untradable = true;

          if (itemOffsetId)
            result.itemOffset = itemOffsetId

          const method = obtainMethod(result, args && args[0], data, item);
          result.ref = method && !(method instanceof Array) ? [method] : method;

          return result;
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
      description: `There are ${available} emotes available right now in-game in Final Fantasy XIV. Here's how you obtain all of them.`,
      section: 'Emotes'
    }, undefined, () => {});
    
    return response;
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("emotes", data, base, _helperCreateJSONFn);
});