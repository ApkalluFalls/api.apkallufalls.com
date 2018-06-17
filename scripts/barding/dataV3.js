const fs = require('fs');
const Helper = require('../_helper');
const createHTML = require('../_HTML');
const recursiveFetch = require('../_recursiveV3');
const config = require('../_config');
const localisation = require('../../localisation');

const api = "BuddyEquip";
const base = 'v3/barding';
const name = "Barding";
const plural = "barding";

let bardingItems;

module.exports = new Helper(name, plural, {
  api,
  base,
  columns: [
    "ID"
  ],
  useCallback: true,
  list: true,
  v3: true
}, (data, resolve, args) => {
  bardingItems = args && args[0].barding;
  recursiveFetch(data, name, (entry, all) => {
    return {
      v3: true,
      api: api + '/' + entry.ID,
      base,
      format: (data) => {
        const bardingItem = bardingItems.filter(b => b.awards === data.ID)[0];

        const result = {
          iconBody: data.IconBody,
          iconHead: data.IconHead,
          iconLegs: data.IconLegs,
          id: data.ID,
          img: (() => {
            if (!bardingItem || !bardingItem.icon)
              return false;
            return bardingItem.icon;
          })(),
          xivdb: data.Url && ('/' + data.Url.charAt(1).toLowerCase() + data.Url.slice(2))
        }

        if (data.GrandCompany && data.GrandCompany.ID)
          result.grandCompany = {
            de: data.GrandCompany.Name_de,
            en: data.GrandCompany.Name_en,
            fr: data.GrandCompany.Name_fr,
            ja: data.GrandCompany.Name_ja
          }

        createHTML(result.id, {
          data: result,
          emoji: "💺",
          title: `${data.Name_en} | Apkallu Falls`,
          description: `The ${data.Singular_en} on Final Fantasy XIV.`,
          image: result.img ? config.fullImagePathV3 + result.img : undefined,
          section: "Chocobo Barding"
        }, "chocobo-barding", () => {});

        return result;
      }
    }
  }, resolve)
});