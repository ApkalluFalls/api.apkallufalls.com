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

  await new Promise((resolve) => fs.readFile('../docs/v3/mounts.json', 'utf8', (e, data) => {
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
      unavailable: orchestrionRollsList.filter(data => (!data.order || +data.order > 10000)/* && data.ref && data.ref.filter(ref => ref.available && !ref.promo).length === 0*/).length,
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
    },
    weapons: {
      aetherpool: {
        ids: [
          1581, 1582, 1583, 1584, 1585, 1586, 1587, 1588, 1589, 1590, 1591, 1592, 1593, 1962, 1963, { id: 1658, weight: 120 }
        ],
        weight: 60
      },
      anima: {
        ids: [
          1406, 1407, 1408, 1409, 1410, 1411, 1412, 1413, 1414, 1415, 1416, 1417, 1418,
          1499, 1500, 1501, 1502, 1503, 1504, 1505, 1506, 1507, 1508, 1509, 1510, 1511,
          1605, 1606, 1607, 1608, 1609, 1610, 1611, 1612, 1613, 1614, 1615, 1616, 1617,
          1667, 1668, 1669, 1670, 1671, 1672, 1673, 1674, 1675, 1676, 1677, 1678, 1679,
          1695, 1696, 1697, 1698, 1699, 1700, 1701, 1702, 1703, 1704, 1705, 1706, 1707,
          1708, 1709, 1710, 1711, 1712, 1713, 1714, 1715, 1716, 1717, 1718, 1719, 1720
        ],
        weight: 1
      },
      eureka: {
        ids: [
          2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044,
          2082, 2083, 2084, 2085, 2086, 2087, 2088, 2089, 2090, 2091, 2092, 2093, 2094, 2095, 2096
        ],
        weight: 1
      },
      relic: {
        ids: [
          129, 130, 131, 132, 133, 134, 135, 597, 598, 1053, 1492
        ],
        weight: 1
      },
    }
  }

  console.info(data['orchestrion-rolls'].unavailable)

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