const Helper = require('../_helper');
const getIcons = require('./_iconHelper');

const api = "BuddyEquip";
const base = 'barding';
const name = "Barding";
const plural = "barding";

module.exports = new Helper(name, plural, {
  api,
  base,
  columns: [
    "ID",
    "IconBody",
    "IconHead",
    "IconLegs"
  ],
  useCallback: true,
  list: true,
  v3: true
}, (data, resolve) => {
  console.info("...processing chocobo barding icons");
  data = data.map(d => ({
    ...d,
    Icon: d.IconBody || d.IconHead || d.IconLegs
  })).filter(d => d.IconBody || d.IconHead || d.IconLegs);
  getIcons(base, data, resolve, true);
});

