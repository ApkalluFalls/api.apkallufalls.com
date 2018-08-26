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
  tag: 'achievements,entry',
  v3: true
}, (data, resolve) => {
  recursiveFetch(data, name, (entry, all) => {
    return {
      v3: true,
      api: api + '/' + entry.ID,
      base,
      format: (data) => {
        return {
          id: data.ID,
          help: {
            de: data.Description_de,
            en: data.Description_en,
            fr: data.Description_fr,
            jp: data.Description_ja
          },
          img: (() => {
            if (!data.Icon)
              return false;
            return data.Icon;
          })(),
          xivdb: data.Url && ('/' + data.Url.charAt(1).toLowerCase() + data.Url.slice(2))
        }
      }
    }
  }, resolve)
});