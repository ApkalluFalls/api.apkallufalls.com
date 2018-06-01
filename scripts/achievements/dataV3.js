const fs = require('fs');
const Helper = require('../_helper');
const recursiveFetch = require('../_recursiveV3');
const config = require('../_config');
const localisation = require('../../localisation');

const api = "achievement";
const base = 'v3/achievement';
const name = "Achievement";
const plural = "achievements";

const categories = {};
const kinds = {};
const kindsCategoriesLinks = [];

module.exports = new Helper(name, plural, {
  api,
  base,
  columns: [
    "ID"
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
        const content = data.content;

        return {
          id: content.ID,
          help: {
            de: content.Description_de,
            en: content.Description_en,
            fr: content.Description_fr,
            jp: content.Description_ja
          },
          img: (() => {
            if (!data.content.Icon)
              return false;
            return config.fullImagePathV3 + data.content.Icon;
          })(),
          xivdb: data.content.Url && ('/' + data.content.Url.charAt(1).toLowerCase() + data.content.Url.slice(2))
        }
      }
    }
  }, resolve)
});