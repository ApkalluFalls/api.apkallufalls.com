const fetch = require('node-fetch');
const Helper = require('../_helper');
const createList = require('../_list');
const _isAvailable = require('./_isAvailableV3');
const _isCumulative = require('./_isCumulativeV3');
const _getWeight = require('./_getWeightV3');
const _getMountIdFromItem = require('./_getMountIdFromItem');

module.exports = new Helper("Achievement", "achievements", {
  api: 'achievement',
  columns: [
    "AchievementCategory.ID",
    "AchievementCategory.Name",
    "AchievementCategory.AchievementKind.ID",
    "AchievementCategory.AchievementKind.Name",
    "Icon",
    "ID",
    "Item",
    "Name_de",
    "Name_en",
    "Name_fr",
    "Name_ja",
    "Order",
    "Patch",
    "Points",
    "Data_0",
    "Data_1",
    "Data_2",
    "Data_3",
    "Data_4",
    "Data_5",
    "Data_6",
    "Data_7",
    "Data_8",
    "Title",
    "Type"
  ],
  list: true,
  v3: true,
  format: (data, args) => {
    data.forEach(
      achievement => {
        const filtered = data.filter(
          a => a["AchievementCategory.ID"] === achievement["AchievementCategory.ID"]
               && a.type === achievement.Type
               && a.requirement_1 === achievement.Requirement_1
        );

        // If it has no Order set, and it has a requirement_1 property, the
        // achievements are already in order for us.
        if (achievement.Order === 0 && achievement.Requirement_1) {
          const series = filtered.filter(a => a.requirement_1 === achievement.Requirement_1);
          if (series.length > 1)
            achievement.Series = series.map(a => a.id);
        }
        // Otherwise, the Order is incremental.
        else {
          const prev = getPrev(filtered, achievement.Order - 1, []);
          const next = getNext(filtered, achievement.Order + 1, []);
      
          if (next.length || prev.length)
            achievement.Series = [...prev, achievement.ID, ...next];
        }
      }
    );

    return {
      tags: args && args[0],
      data: data.map(entry => {
        let response = {
          tag: [
            entry["AchievementCategory.ID"],
            entry["AchievementKind.ID"]
          ],
          id: entry.ID,
          icon: entry.Icon,
          order: entry.Order,
          points: entry.Points,
          name: {
            de: entry.Name_de,
            en: entry.Name_en,
            fr: entry.Name_fr,
            jp: entry.Name_ja
          },
          series: entry.Series,
          patch: entry.Patch,
          weight: _getWeight(entry)
        }

        const unavailable = _isAvailable(entry);
        if (unavailable)
          response.unavailable = unavailable;

        if (entry.Item || entry.Title) {
          response.reward = {};

          if (entry.Item)
            response.reward.item = entry.Item;
            
          if (entry.Title)
            response.reward.title = entry.Title;
        }

        // Entry type 2 is an achievement which requires multiple
        // different achievements to unlock (e.g. Mastering War I).
        if (entry.type === 2)
          response.mastery = [
            entry.Data_0,
            entry.Data_1,
            entry.Data_2,
            entry.Data_3,
            entry.Data_4,
            entry.Data_5,
            entry.Data_6,
            entry.Data_7,
            entry.Data_8,
            entry.ID
          ].filter(e => e !== 0);

        if (_isCumulative(entry))
          response.cumulative = true;

        return response;
      })
    }
  }
}, (data, base, _helperCreateJSONFn) => {
  fetch(
    'http://api.xivdb.com/minion',
    {
      method: 'GET',
      mode: 'cors'
    }
  )
    .then(response => response.json())
    .then(minions => {
      fetch(
        'http://api.xivdb.com/mount',
        {
          method: 'GET',
          mode: 'cors'
        }
      )
        .then(response => response.json())
        .then(mounts => {
          fetch(
            'http://api.xivdb.com/item?columns=id,icon,name_de,name_en,name_fr,name_ja,connect_achievement,item_ui_category',
            {
              method: 'GET',
              mode: 'cors'
            }
          )
            .then(response => response.json())
            .then(items => {
              items = items.filter(i => i.connect_achievement !== 0);
              data.forEach(achievement => {
                const item = items.filter(i => i.id === achievement.Item)[0];
                if (item) {
                  achievement.item = {
                    icon: item.icon,
                    id: item.id,
                    name: {
                      de: item.name_de,
                      en: item.name_en,
                      fr: item.name_fr,
                      jp: item.name_ja
                    }
                  }

                  switch (item.item_ui_category) {
                    case 81: {
                      const match = minions.filter(m => m.name_en.toLowerCase() === item.name_en.toLowerCase())[0];
                      if (!match) {
                        throw new Error('Minion name not matched to item name.');
                      }
                      achievement.item.special = {
                        type: 'minion',
                        id: match.id
                      };
                      break;
                    }

                    case 63: {
                      const match = _getMountIdFromItem(mounts, item);
                      if (match)
                        achievement.item.special = {
                          type: 'mount',
                          id: match
                        };
                      break;
                      }
                  }
                }
              })
              console.info(base);
              createList("achievements", data, base, _helperCreateJSONFn);
            })
            .catch(e => {
              throw new Error(e)
            });
        });
    });
});

function getPrev(filtered, offset, result) {
  const prev = filtered.filter(
    b => b.order === offset
  )[0];

  if (!prev)
    return result;

  result.unshift(prev.id);
  return getPrev(filtered, offset - 1, result);
}

function getNext(filtered, offset, result) {
  const next = filtered.filter(
    b => b.order === offset
  )[0];

  if (!next)
    return result;

  result.push(next.id);
  return getNext(filtered, offset + 1, result);
}