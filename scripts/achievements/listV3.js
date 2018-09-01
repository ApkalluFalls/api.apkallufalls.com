const fetch = require('node-fetch');
const Helper = require('../_helper');
const createHTML = require('../_HTML');
const createList = require('../_list');
const _isAvailable = require('./_isAvailableV3');
const _isCumulative = require('./_isCumulativeV3');
const _getWeight = require('./_getWeightV3');
const _getMountIdFromItem = require('./_getMountIdFromItem');

module.exports = new Helper("Achievement", "achievements", {
  api: 'Achievement',
  columns: [
    "AchievementCategory.ID",
    "AchievementCategory.Name",
    "AchievementCategory.AchievementKind.ID",
    "AchievementCategory.AchievementKind.Name",
    "Icon",
    "ID",
    "Name_de",
    "Name_en",
    "Name_fr",
    "Name_ja",
    "Order",
    "Points",
    "Data0",
    "Data1",
    "Data2",
    "Data3",
    "Data4",
    "Data5",
    "Data6",
    "Data7",
    "Data8",
    "Title.ID",
    "Type",
    'GamePatch.ID',
    "Item.ID"
  ],
  list: true,
  tag: 'achievements,list',
  v3: true,
  format: (data, args) => {
    data.forEach(
      achievement => {
        const filtered = data.filter(
          a => +a.AchievementCategory.ID === +achievement.AchievementCategory.ID
            && +a.Type === +achievement.Type
            && +a.Data0 === +achievement.Data0
            && +a.Data2 === 0
        );

        // If it has no Order set, and it has a Data0 property, the
        // achievements are already in order for us.
        if (filtered.length > 1) {
          if (achievement.Order === 0 && achievement.Data0) {
            const series = filtered.filter(a => a.Data0 === achievement.Data0);
            if (series.length > 1)
              achievement.series = series.map(a => a.ID);
          }
          // Otherwise, the Order is incremental.
          else {
            const prev = getPrev(filtered, achievement.Order - 1, []);
            const next = getNext(filtered, achievement.Order + 1, []);
        
            if (next.length || prev.length)
              achievement.series = [...prev, achievement.ID, ...next];
          }
        } else {
          // // If the natural filter didn't match anything, attempt to filter on the sum of the Data0
          // // and Data1 values.
          // const filtered2 = data.filter(
          //   a => +a.AchievementCategory.ID === +achievement.AchievementCategory.ID
          //       && +a.Type === +achievement.Type
          //       && +achievement.Data0 !== 0
          //       && +achievement.Data1 === 1
          //       && +achievement.Data2 === 0
          //       && +a.Data0 === +achievement.Data0 + 1
          // );

          // if (filtered2.length !== 0)
          //   console.info(achievement.ID);
        }
      }
    );

    const response = {
      data: data
        .filter(entry => entry.Icon)
        .map(entry => {
          let response = {
            tag: [
              entry.AchievementCategory.ID,
              entry.AchievementCategory.AchievementKind.ID
            ],
            id: entry.ID,
            icon: +entry.Icon.replace(/^.*\/(\d+)\.png$/, (match, group) => {
              return group;
            }),
            order: entry.Order,
            points: entry.Points,
            name: {
              de: entry.Name_de,
              en: entry.Name_en,
              fr: entry.Name_fr,
              jp: entry.Name_ja
            },
            series: entry.series,
            patch: entry['GamePatch.ID'] || 2,
            weight: _getWeight(entry)
          }

          const unavailable = _isAvailable(entry);
          if (unavailable)
            response.unavailable = unavailable;

          if (entry.Item.ID || entry.Title.ID) {
            response.reward = {};

            if (entry.Item.ID)
              response.reward.item = entry.Item.ID;
              
            if (entry.Title.ID)
              response.reward.title = entry.Title.ID;
          }

          // Entry type 2 is an achievement which requires multiple
          // different achievements to unlock (e.g. Mastering War I).
          if (entry.type === 2)
            response.mastery = [
              entry.Data0,
              entry.Data1,
              entry.Data2,
              entry.Data3,
              entry.Data4,
              entry.Data5,
              entry.Data6,
              entry.Data7,
              entry.Data8,
              entry.ID
            ].filter(e => e !== 0);

          if (_isCumulative(entry))
            response.cumulative = true;

          return response;
        })
    }

    createHTML("achievements", {
      data: response,
      emoji: "🎖️",
      list: true,
      title: `Achievements | Apkallu Falls`,
      description: `There are ${response.data.length.toLocaleString()} achievements in Final Fantasy XIV. Apkallu Falls allows you to track which ones you\\'ve unlocked.`,
      section: "Achievements"
    }, undefined, () => {});

    return response;
  }
}, (data, base, _helperCreateJSONFn, resolve) => {
  createList("achievements", data, base, _helperCreateJSONFn, resolve);
});

function getPrev(filtered, offset, result) {
  const prev = filtered.filter(
    b => b.Order === offset
  )[0];

  if (!prev)
    return result;

  result.unshift(prev.ID);
  return getPrev(filtered, offset - 1, result);
}

function getNext(filtered, offset, result) {
  const next = filtered.filter(
    b => b.Order === offset
  )[0];

  if (!next)
    return result;

  result.push(next.ID);
  return getNext(filtered, offset + 1, result);
}