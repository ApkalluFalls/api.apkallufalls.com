const fs = require('fs');
const createList = require('../_list');

module.exports = async function() {
  let achievementsList;
  let minionsList;
  let mountsList;

  await new Promise((resolve) => fs.readFile('../docs/achievements.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => achievementsList = JSON.parse(data).data);

  await new Promise((resolve) => fs.readFile('../docs/minions.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => minionsList = JSON.parse(data).data);

  await new Promise((resolve) => fs.readFile('../docs/mounts.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => mountsList = JSON.parse(data).data);

  const data = {
    achievements: {
      total: achievementsList.length,
      unavailable: achievementsList.filter(data => data.unavailable).length
    },
    minions: {
      total: minionsList.length,
      unavailable: minionsList.filter(data => data.ref && data.ref.filter(ref => ref.available && !ref.promo).length === 0).length,
      unknown: minionsList.filter(data => !data.ref).length
    },
    mounts: {
      total: mountsList.length,
      unavailable: mountsList.filter(data => data.ref && data.ref.filter(ref => ref.available && !ref.promo).length === 0).length,
      unknown: mountsList.filter(data => !data.ref).length
    },
    titles: {
      total: achievementsList.filter(data => data.reward && data.reward.title).length,
      unavailable: 'todo'
    }
  }

  fs.writeFile("../docs/totals.json", JSON.stringify(data), 'utf8', () => {
    console.log("Totals updated.");
  });
};