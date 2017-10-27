const Helper = require('../_helper');
const createList = require('../_list');

module.exports = new Helper("Patch", "patches", {
  api: 'data/patchlist',
  list: true
}, (data, base, _helperCreateJSONFn) => {
  let formattedData = [];

  Object.keys(data).forEach(k => {
    const patch = data[k];
    formattedData.push({
      id: patch.patch,
      version: patch.command,
      date: +new Date(patch.date),
      name: {
        de: patch.name_de,
        en: patch.name_en,
        fr: patch.name_fr,
        jp: patch.name_ja
      },
      image: patch.banner
    });
  })

  createList(
    "patches",
    formattedData,
    base,
    _helperCreateJSONFn
  );
});