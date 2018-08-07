const Helper = require('../_helper');
const getIcons = require('./_iconHelper');

const api = "Emote";
const base = 'emote';
const name = "Emote";
const plural = "emotes";

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
  console.info("...processing emote icons");
  data = data.filter(emote => {
    if (!emote.Icon)
      return false;

    switch (emote.ID) {
      case 88:
        // This emote has no icon, but links to one.
        return false;
      
      default:
        return true;
    }
  })
  getIcons(base, data, resolve, true);
});

