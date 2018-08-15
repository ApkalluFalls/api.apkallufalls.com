const fs = require('fs');
const Helper = require('../_helper');
const createHTML = require('../_HTML');
const recursiveFetch = require('../_recursiveV3');
const config = require('../_config');

const api = "Orchestrion";
const base = 'v3/orchestrion-roll';
const name = "OrchestrionRoll";
const plural = "orchestrionRolls";

module.exports = new Helper(name, plural, {
  api,
  base,
  columns: [
    "ID",
    "Name_de",
    "Name_en",
    "Name_fr",
    "Name_ja"
  ],
  useCallback: true,
  list: true,
  v3: true
}, (data, resolve) => {
  recursiveFetch(data, name, (entry, all) => {
    return {
      v3: true,
      api: api + '/' + entry.ID,
      base,
      format: (data) => {
        const result = {
          categoryName: {
            de: data.OrchestrionUiparam.OrchestrionCategory.Name_de,
            en: data.OrchestrionUiparam.OrchestrionCategory.Name_en,
            fr: data.OrchestrionUiparam.OrchestrionCategory.Name_fr,
            jp: data.OrchestrionUiparam.OrchestrionCategory.Name_ja
          },
          id: data.ID,
          img: '/i/025000/025945.png',
          xivdb: data.Url && ('/' + data.Url.charAt(1).toLowerCase() + data.Url.slice(2))
        }

        const name = data.Name_en && data.Name_en.split(' ').map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' ');
        createHTML(result.id, {
          data: result,
          emoji: "🎶",
          title: `${name} | Apkallu Falls`,
          description: `The ${name} orchestrion roll on Final Fantasy XIV.`,
          image: config.fullImagePathV3 + result.img,
          section: "Orchestrion Rolls"
        }, "orchestrion-roll", () => {});

        return result;
      }
    }
  }, resolve)
});