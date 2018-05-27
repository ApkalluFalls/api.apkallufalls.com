const Helper = require('../_helper');
const getIcons = require('./_iconHelper');

const api = "emote";
const base = 'emote';
const name = "Emote";
const plural = "emotes";

module.exports = new Helper(name, plural, {
  api,
  base,
  columns: [
    "id",
    "icon"
  ],
  useCallback: true
}, (data, resolve) => {
  data = data.filter(emote => {
    switch (emote.id) {
      case 88:
        // This emote has no icon, but links to one.
        return false;
      
      default:
        return true;
    }
  })
  getIcons(base, data, resolve);
});

