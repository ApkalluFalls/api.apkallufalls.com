const Helper = require('../_helper');
const createList = require('../_list');

module.exports = new Helper("Patch", "patches", {
  api: 'data/patchlist',
  list: true,
  format: (data, args) => {
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

    if (args) {
      const achievements = args[0] && args[0].data;
      const minions = args[1] && args[1].data;
      const mounts = args[2] && args[2].data;
      const titles = args[3] && args[3].data;

      formattedData.forEach(f => {
        f.counts = {
          achievements: achievements instanceof Array && achievements.filter(a => a.patch === f.id).length || 0,
          minions: minions instanceof Array && minions.filter(a => a.patch === f.id).length || 0,
          mounts: mounts instanceof Array && mounts.filter(a => a.patch === f.id).length || 0,
          titles: titles instanceof Array && titles.filter(a => a.patch === f.id).length || 0
        }
      })
    }

    return formattedData;
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("patches", data, base, _helperCreateJSONFn);
});