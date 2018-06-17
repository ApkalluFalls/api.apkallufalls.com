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
    "IconBody"
  ],
  useCallback: true,
  list: true,
  v3: true
}, (data, resolve) => {
  data = data.map(d => ({
    ...d,
    Icon: d.IconBody
  })).filter(d => d.IconBody);
  getIcons(base, data, resolve, true);
});

