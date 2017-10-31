const Helper = require('../_helper');
const getIcons = require('./_iconHelper');

const api = "minion";
const base = 'minion';
const name = "Minion";
const plural = "minions";

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

