const Helper = require('../_helper');
const getIcons = require('./_iconHelper');

const api = "achievement";
const base = 'achievement';
const name = "Achievement";
const plural = "achievements";

module.exports = new Helper(name, plural, {
  api,
  base,
  columns: [
    "id",
    "icon"
  ],
  useCallback: true
}, (data, resolve) => {
  getIcons(base, data, resolve);
});

