const Helper = require('../_helper');
const getIcons = require('./_iconHelper');

const api = "Item";
const base = 'barding';
const name = "Barding";
const plural = "barding";

module.exports = new Helper(name, plural, {
  api,
  base,
  columns: [
    "ID",
    "Icon",
    "ItemAction.Type"
  ],
  useCallback: true,
  list: true,
  v3: true
}, (data, resolve) => {
  data = data.filter(item => {
    if (item["ItemAction.Type"] === 1013)
      return true;
    return false;
  });
  getIcons(base, data, resolve, true);
});

