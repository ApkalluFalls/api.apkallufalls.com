const Helper = require('../_helper');
const getIcons = require('./_iconHelper');

const api = "mount";
const base = 'mount';
const name = "Mount";
const plural = "mounts";

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

