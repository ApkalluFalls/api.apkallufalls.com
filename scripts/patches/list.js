const Helper = require('../_helper');
const createList = require('../_list');

module.exports = new Helper("Patch", "patches", {
  api: 'data/patchlist',
  list: true,
  format: (data, args) => {
    let formattedData = [];
  
    Object.keys(data).forEach(k => {
      const patch = data[k];
      const response = {
        id: patch.patch,
        version: patch.command,
        date: +new Date(patch.date),
        name: {
          de: patch.name_de,
          en: patch.name_en,
          fr: patch.name_fr,
          jp: patch.name_ja
        }
      };

      const image = getPatchImage(patch.patch);
      if (image)
        response.image = image;

      formattedData.push(response);
    })

    if (args) {
      const achievements = args[0] && args[0].data;
      const minions = args[1] && args[1].data;
      const mounts = args[2] && args[2].data;
      const titles = args[3] && args[3].data;

      formattedData.forEach(f => {
        const counts = {};

        const achievementsChange = achievements instanceof Array && achievements.filter(a => a.patch === f.id).length || 0;
        if (achievementsChange) {
          const totalAchievements = achievements.filter(a => a.patch <= f.id).length;

          counts.achievements = {
            change: achievements.filter(a => a.patch === f.id).length || 0,
            total: totalAchievements
          };

          counts.achievements.percent = (
            Math.round(((100/totalAchievements) * achievementsChange) * 10) / 10
          );
        }

        const minionsChange = minions instanceof Array && minions.filter(a => a.patch === f.id).length || 0;
        if (minionsChange) {
          const totalMinions = minions.filter(a => a.patch <= f.id).length;

          counts.minions = {
            change: minionsChange,
            total: totalMinions
          };

          counts.minions.percent = (
            Math.round(((100/totalMinions) * minionsChange) * 10) / 10
          );
        }

        const mountsChange = mounts instanceof Array && mounts.filter(a => a.patch === f.id).length || 0;
        if (mountsChange) {
          const totalMounts = mounts.filter(a => a.patch <= f.id).length;

          counts.mounts = {
            change: mountsChange,
            total: totalMounts
          };

          counts.mounts.percent = (
            Math.round(((100/totalMounts) * mountsChange) * 10) / 10
          );
        }

        const titlesChange = titles instanceof Array && titles.filter(a => a.patch === f.id).length || 0;
        if (titlesChange) {
          const totalTitles = titles.filter(a => a.patch <= f.id).length;

          counts.titles = {
            change: titlesChange,
            total: totalTitles
          };

          counts.titles.percent = (
            Math.round(((100/totalTitles) * titlesChange) * 10) / 10
          );
        }

        if (Object.keys(counts).length)
          f.counts = counts;
      })
    }

    return formattedData;
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("patches", data, base, _helperCreateJSONFn);
});

function getPatchImage(patch) {
  switch (patch) {
    case 2:
      return "/patches/2.0.png";

    case 4:
      return "/patches/2.1.png";

    case 8:
      return "/patches/2.2.png";

    case 11:
      return "/patches/2.3.png";

    case 14:
      return "/patches/2.4.png";

    case 16:
      return "/patches/2.5.png";

    case 19:
      return "/patches/3.0.png";

    case 23:
      return "/patches/3.1.png";

    case 25:
      return "/patches/3.2.png";

    case 27:
      return "/patches/3.3.png";

    case 30:
      return "/patches/3.4.png";

    case 32:
      return "/patches/3.5.png";

    case 36:
      return "/patches/4.0.png";

    case 40:
      return "/patches/4.1.png";

    case 43:
      return "/patches/4.2.png";

    case 45:
      return "/patches/4.3.png";
  }
}