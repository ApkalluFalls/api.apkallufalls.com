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

        if (filtered.length) {
          const prev = filtered.filter(
            b => b.order === achievement.order - 1
          )[0];
          
          if (prev)
            achievement.prev = prev.id;

          const next = filtered.filter(
            b => b.order === achievement.order + 1
          )[0];

          if (next)
            achievement.next = next.id;
        }
      }
    )

    return {
      data: data.map(entry => {
        let response = {
          id: entry.id,
          icon: entry.icon,
          points: entry.points,
          name: {
            de: entry.name_de,
            en: entry.name_en,
            fr: entry.name_fr,
            jp: entry.name_ja
          },
          prev: entry.prev,
          next: entry.next,
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
  createList("achievements", data, base, _helperCreateJSONFn);
});