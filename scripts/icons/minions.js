const Helper = require('../_helper');
const getIcons = require('./_iconHelper');

const api = "Companion";
const base = 'minion';
const name = "Minion";
const plural = "minions";

module.exports = new Helper(name, plural, {
  api,
  base,
  columns: [
    "ID",
    "IconSmall"
  ],
  list: true,
  useCallback: true,
  v3: true
}, (data, resolve) => {
  console.info("...processing minion icons");
  data = data.filter(d => d.IconSmall).map(d => ({ ...d, Icon: d.IconSmall }));
  getIcons(base, data, resolve, true);
});

