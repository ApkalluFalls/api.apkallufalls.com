const fs = require('fs');
const createList = require('../_list');

module.exports = async function() {
  let achievementsList;
  let bardingList;
  let emotesList;
  let minionsList;
  let mountsList;
  let orchestrionRollsList;

  await new Promise((resolve) => fs.readFile('../docs/v3/achievements.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => achievementsList = JSON.parse(data).data);

  await new Promise((resolve) => fs.readFile('../docs/v3/barding.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => bardingList = JSON.parse(data).data);

  await new Promise((resolve) => fs.readFile('../docs/v3/emotes.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => emotesList = JSON.parse(data).data);

  await new Promise((resolve) => fs.readFile('../docs/v3/minions.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => minionsList = JSON.parse(data).data);

  await new Promise((resolve) => fs.readFile('../docs/mounts.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => mountsList = JSON.parse(data).data);

  await new Promise((resolve) => fs.readFile('../docs/v3/orchestrion-rolls.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => orchestrionRollsList = JSON.parse(data).data);

  const achievementsWithItems = achievementsList.filter(data => data.reward && data.reward.item);
  const achievementsWithTitles = achievementsList.filter(data => data.reward && data.reward.title);

  const data = {
    achievements: {
      total: achievementsList.length,
      unavailable: achievementsList.filter(data => data.unavailable).length,
      points: {
        total: achievementsList.map(a => a.points).reduce((a, b) => a + b),
        unavailable: achievementsList.filter(data => data.unavailable).map(a => a.points).reduce((a, b) => a + b)
      }
    },
    barding: {
      total: bardingList.length,
      unavailable: bardingList.filter(data => data.ref && data.ref.filter(ref => ref.available && !ref.promo).length === 0).length,
      unknown: bardingList.filter(data => !data.ref).length
    },
    emotes: {
      byDefault: emotesList.filter(data => data.ref && data.ref.filter(ref => ref.method.text === 'isDefault').length).length,
      total: emotesList.length,
      unavailable: emotesList.filter(data => data.ref && data.ref.filter(ref => ref.available && !ref.promo).length === 0).length,
      unknown: emotesList.filter(data => !data.ref).length
    },
    levels: {
      total: 25 * 70
    },
    minions: {
      total: minionsList.length,
      unavailable: minionsList.filter(data => data.hasParent || (data.ref && data.ref.filter(ref => ref.available && !ref.promo).length === 0)).length,
      unknown: minionsList.filter(data => !data.hasParent && !data.ref).length
    },
    mounts: {
      total: mountsList.length,
      unavailable: mountsList.filter(data => data.ref && data.ref.filter(ref => ref.available && !ref.promo).length === 0).length,
      unknown: mountsList.filter(data => !data.ref).length
    },
    'orchestrion-rolls': {
      total: orchestrionRollsList.length,
      unavailable: orchestrionRollsList.filter(data => data.ref && data.ref.filter(ref => ref.available && !ref.promo).length === 0).length,
      unknown: orchestrionRollsList.filter(data => !data.ref).length
    },
    rewards: {
      total: achievementsWithItems.length,
      unavailable: achievementsWithItems.filter(data => data.unavailable).length
    },
    titles: {
      total: achievementsWithTitles.length,
      unavailable: achievementsWithTitles.filter(data => data.unavailable).length
    },
    levequests: {
      ids: {
        battle: [608, 609, 610, 1341],
        crafting: {
          CRP: [611, 612, 613, 1342, 1859],
          BSM: [614, 615, 616, 1343, 1860],
          ARM: [617, 618, 619, 1344, 1861],
          GSM: [620, 621, 622, 1345, 1862],
          LTW: [623, 624, 625, 1346, 1863],
          WVR: [626, 627, 628, 1347, 1864],
          ALC: [629, 630, 631, 1348, 1865],
          CUL: [632, 633, 634, 1349, 1866]
        },
        gathering: {
          BTN: [638, 639, 640, 1351, 1867],
          MIN: [635, 636, 637, 1350, 1868],
          FSH: [641, 642, 643, 1352, 1869]
        },
        grandCompany: {
          Maelstrom: [686, 687, 688],
          TwinAdder: [689, 690, 691],
          ImmortalFlames: [692, 693, 694]
        }
      }
    }
  }

  // Node doesn't support array.reverse() :(
  data.levequests.battle = achievementsList.filter(d => d.id === data.levequests.ids.battle[data.levequests.ids.battle.length - 1])[0].weight;
  data.levequests.crafting = achievementsList.filter(d => d.id === data.levequests.ids.crafting.CRP[data.levequests.ids.crafting.CRP.length - 1])[0].weight * Object.keys(data.levequests.ids.crafting).length;
  data.levequests.gathering = achievementsList.filter(d => d.id === data.levequests.ids.gathering.BTN[data.levequests.ids.gathering.BTN.length - 1])[0].weight * Object.keys(data.levequests.ids.gathering).length;
  data.levequests.grandCompany = achievementsList.filter(d => d.id === data.levequests.ids.grandCompany.Maelstrom[data.levequests.ids.grandCompany.Maelstrom.length - 1])[0].weight * Object.keys(data.levequests.ids.grandCompany).length;

  data.levequests.total = data.levequests.battle + data.levequests.crafting + data.levequests.gathering + data.levequests.grandCompany;

  fs.writeFile("../docs/totals.json", JSON.stringify(data), 'utf8', () => {
    console.log("Totals updated.");
  });
};