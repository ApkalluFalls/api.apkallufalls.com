const fetch = require('node-fetch');
const Helper = require('../_helper');
const createList = require('../_list');
const _isAvailable = require('./_isAvailable');
const _isCumulative = require('./_isCumulative');
const _getWeight = require('./_getWeight');
const _getMountIdFromItem = require('./_getMountIdFromItem');

module.exports = new Helper("Achievement", "achievements", {
  api: 'achievement',
  columns: [
    "achievement_category",
    "achievement_kind",
    "icon",
    "id",
    "item",
    "name_de",
    "name_en",
    "name_fr",
    "name_ja",
    "order",
    "patch",
    "points",
    "requirement_1",
    "requirement_2",
    "requirement_3",
    "requirement_4",
    "requirement_5",
    "requirement_6",
    "requirement_7",
    "requirement_8",
    "requirement_9",
    "title",
    "type"
  ],
  list: true,
  format: (data, args) => {
    data.forEach(
      achievement => {
        const filtered = data.filter(
          a => a.achievement_category === achievement.achievement_category
               && a.type === achievement.type
               && a.requirement_1 === achievement.requirement_1
        );

        // If it has no Order set, and it has a requirement_1 property, the
        // achievements are already in order for us.
        if (achievement.order === 0 && achievement.requirement_1) {
          const series = filtered.filter(a => a.requirement_1 === achievement.requirement_1);
          if (series.length > 1)
            achievement.series = series.map(a => a.id);
        }
        // Otherwise, the Order is incremental.
        else {
          const prev = getPrev(filtered, achievement.order - 1, []);
          const next = getNext(filtered, achievement.order + 1, []);
      
          if (next.length || prev.length)
            achievement.series = [...prev, achievement.id, ...next];
        }
      }
    );

    return {
      tags: args && args[0],
      data: data.map(entry => {
        let response = {
          tag: [entry.achievement_category, entry.achievement_kind],
          id: entry.id,
          icon: entry.icon,
          order: entry.order,
          points: entry.points,
          name: {
            de: entry.name_de,
            en: entry.name_en,
            fr: entry.name_fr,
            jp: entry.name_ja
          },
          series: entry.series,
          patch: entry.patch,
          weight: _getWeight(entry)
        }

        const unavailable = _isAvailable(entry);
        if (unavailable)
          response.unavailable = unavailable;

        if (entry.item || entry.title) {
          response.reward = {};

          if (entry.item)
            response.reward.item = entry.item;
            
          if (entry.title)
            response.reward.title = entry.title;
        }

        // Entry type 2 is an achievement which requires multiple
        // different achievements to unlock (e.g. Mastering War I).
        if (entry.type === 2)
          response.mastery = [
            entry.requirement_1,
            entry.requirement_2,
            entry.requirement_3,
            entry.requirement_4,
            entry.requirement_5,
            entry.requirement_6,
            entry.requirement_7,
            entry.requirement_8,
            entry.requirement_9,
            entry.id
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
                const item = items.filter(i => i.id === achievement.item)[0];
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