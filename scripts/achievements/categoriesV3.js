const fetch = require('node-fetch');
const Helper = require('../_helper');
const createList = require('../_list');
const _isAvailable = require('./_isAvailableV3');
const _isCumulative = require('./_isCumulativeV3');
const _getWeight = require('./_getWeightV3');
const _getMountIdFromItem = require('./_getMountIdFromItem');

module.exports = new Helper("achievement category", "achievement categories", {
  api: 'AchievementCategory',
  columns: [
    "ID",
    "Name_de",
    "Name_en",
    "Name_fr",
    "Name_ja",
    "AchievementKind.ID",
    "AchievementKind.Name_de",
    "AchievementKind.Name_en",
    "AchievementKind.Name_fr",
    "AchievementKind.Name_ja"
  ],
  list: true,
  v3: true,
  format: (data, args) => {
    const response = {};

    data: data
      .forEach(entry => {
        let kind = response[entry['AchievementKind.ID']];

        if (!kind) {
          kind = {
            id: entry['AchievementKind.ID'],
            name: {
              de: entry['AchievementKind.Name_de'],
              en: entry['AchievementKind.Name_en'],
              fr: entry['AchievementKind.Name_fr'],
              jp: entry['AchievementKind.Name_ja']
            },
            categories: []
          }

          if (!isKindAvailable(kind))
            kind.unavailable = true;

          response[entry['AchievementKind.ID']] = kind;
        }

        const category = {
          id: entry.ID,
          name: {
            de: entry.Name_de,
            en: entry.Name_en,
            fr: entry.Name_fr,
            jp: entry.Name_ja
          }
        };

        if (!isCategoryAvailable(kind, category))
          category.unavailable = true;

        kind.categories.push(category)
      })
    
    return response;
  }
}, (data, base, _helperCreateJSONFn, resolve) => {
  createList("achievement_categories", data, base, _helperCreateJSONFn, resolve);
});

function isCategoryAvailable(kind, category) {
  const name = category.name.en;

  if (!name)
    return false;

  if (kind.unavailable)
    return false;

  switch (name) {
    case 'Ranking':
    case 'Seasonal Events':
      return false;

    default:
      return true;
  }
}

function isKindAvailable(kind) {
  const name = kind.name.en;

  if (!name)
    return false;

  switch (name) {
    case 'Legacy':
      return false;

    default:
      return true;
  }
}