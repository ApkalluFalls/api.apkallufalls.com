const Helper = require('../_helper');
const getIcons = require('./_iconHelper');

const api = "Mount";
const base = 'mount';
const name = "Mount";
const plural = "mounts";

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
  console.info("...processing mount icons");
  data = data.filter(d => d.IconSmall).map(d => ({ ...d, Icon: d.IconSmall }));
  getIcons(base, data, resolve, true);
});

