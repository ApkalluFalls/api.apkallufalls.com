const fetch = require('node-fetch');
const Helper = require('../_helper');
const createList = require('../_list');
const _isAvailable = require('./_isAvailable');
const _isCumulative = require('./_isCumulative');
const _getWeight = require('./_getWeight');

module.exports = new Helper("Achievement", "achievements", {
  api: 'achievement',
  columns: [
    "achievement_category",
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
    "title",
    "type"
  ],
  list: true,
  format: (data) => {
    data.forEach(
      achievement => {
        const filtered = data.filter(
          a => a.achievement_category === achievement.achievement_category
               && a.type === achievement.type
               && a.requirement_1 === achievement.requirement_1
        );
    
        const prev = getPrev(filtered, achievement.order - 1, []);
        const next = getNext(filtered, achievement.order + 1, []);
    
        if (next.length || prev.length)
          achievement.series = [...prev, achievement.id, ...next];
      }
    );

    return {
      data: data.map(entry => {
        let response = {
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

        if (_isCumulative(entry))
          response.cumulative = true;

        return response;
      })
    }
  }
}, (data, base, _helperCreateJSONFn) => {
  fetch(
    'http://api.xivdb.com/item?columns=id,icon,name_de,name_en,name_fr,name_ja,connect_achievement',
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
        if (item)
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
      })
      createList("achievements", data, base, _helperCreateJSONFn);
    })
    .catch(e => {
      throw new Error(e)
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