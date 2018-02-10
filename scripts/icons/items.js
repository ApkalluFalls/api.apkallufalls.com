const fetch = require('node-fetch');
const Helper = require('../_helper');
const getIcons = require('./_iconHelper');

const api = "item";
const base = 'item';
const name = "Item";
const plural = "items";

module.exports = new Helper(name, plural, {
  api,
  base,
  columns: [
    "id",
    "icon",
    "connect_achievement"
  ],
  useCallback: true
}, (data, resolve) => {
  data = data.filter(item => {
    // If it is associated with an achievement.
    if (item.connect_achievement !== 0)
      return true;
  })
  console.info(data.length);
  // todo 'https://raw.githubusercontent.com/viion/ffxiv-datamining/master/csv/ItemAction.csv'
  getIcons(base, data, resolve);
});

