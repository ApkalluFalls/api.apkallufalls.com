const Helper = require('../_helper');
const getIcons = require('./_iconHelper');

const api = "Achievement";
const base = 'achievement';
const name = "Achievement";
const plural = "achievements";

module.exports = new Helper(name, plural, {
  api,
  base,
  columns: [
    "ID",
    "Icon"
  ],
  list: true,
  useCallback: true,
  v3: true
}, (data, resolve) => {
  console.info("...processing achievement icons");
  data = data.filter(d => d.Icon);
  getIcons(base, data, resolve, true);
});

