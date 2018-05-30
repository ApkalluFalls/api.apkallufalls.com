const Helper = require('../_helper');
const createHTML = require('../_HTML');
const createList = require('../_list');
const obtainMethod = require('../../filters/titles/obtainMethods');
const localisationStrings = require('../../filters/titles/localisationStrings');

module.exports = new Helper("Title", "titles", {
  api: 'title',
  columns: [
    'id',
    'name_de',
    'name_en',
    'name_fr',
    'name_ja',
    'name_female_de',
    'name_female_en',
    'name_female_fr',
    'name_female_ja',
    'is_prefix',
    'patch'
  ],
  list: true,
  format: (data, args) => {
    const response = {
      localisation: localisationStrings,
      data: data.map(entry => {
        const response = {
          id: entry.id,
          name: {
            de: entry.name_de,
            en: entry.name_en,
            fr: entry.name_fr,
            jp: entry.name_ja
          },
          prefix: entry.is_prefix
        }

        let achievement;
        if (args && args[0]) {
          achievement = args[0].data.filter(achievement => (
            achievement.reward && achievement.reward.title === entry.id
          ))[0];
        }

        if (achievement) {
          let method = obtainMethod(entry, args && args[0], achievement);

          if (method && !(method instanceof Array))
            method = [method];

          response.icon = achievement.icon;
          response.patch = achievement.patch;
          response.ref = method;
          response.tag = achievement.tag;
        }

        const femaleTitles = {};

        if (entry.name_en !== entry.name_female_en)
          femaleTitles.en = entry.name_female_en;

        if (entry.name_de !== entry.name_female_de)
          femaleTitles.de = entry.name_female_de;

        if (entry.name_fr !== entry.name_female_fr)
          femaleTitles.fr = entry.name_female_fr;

        if (entry.name_ja !== entry.name_female_ja)
          femaleTitles.jp = entry.name_female_ja;

        if (Object.keys(femaleTitles).length)
          response.female = femaleTitles;

        return response;
      })
    }

    const achievementCategories = args && args[1];

    if (!achievementCategories)
      throw new Error('Ensure achievements are updated before updating titles.');

    processAchievementCategories(achievementCategories, args && args[0], response);

    const available = response.data.filter(d => {
      return d.ref && d.ref.filter(r => !r.promo && r.available).length;
    }).length;

    createHTML("titles", {
      data: response.data,
      emoji: "🔖",
      list: true,
      title: 'Titles List | Apkallu Falls',
      description: `${available} achievements award titles which are available right now in-game in Final Fantasy XIV. Here's a list of all of them.`,
      section: "Titles"
    }, undefined, () => {});

    return response;
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("titles", data, base, _helperCreateJSONFn);
});

function processAchievementCategories(achievementCategories, achievements, titles) {
  Object.keys(achievementCategories.categories).forEach(k => {
    Object.keys(achievementCategories.kinds).forEach(j => {
      const category = achievementCategories.categories[k];
      const kind = achievementCategories.kinds[j];

      const matchingTitles = titles.data.filter(t => t.tag[0] === +k && t.tag[1] === +j).length;

      if (matchingTitles)
        createHTML(`${j}-${k}`, {
          emoji: "🔖",
          list: true,
          title: ` Titles tagged ‘${kind} → ${category}’ | Apkallu Falls`,
          description: `This is a list of all titles tagged ‘${kind} → ${category}’. There ${matchingTitles === 1 ? 'is' : 'are'} ${matchingTitles} ${matchingTitles === 1 ? 'title' : 'titles'} with this tag.`
        }, 'titles/tagged', () => {});

      const matchingAchievements = achievements.data.filter(t => t.tag[0] === +k && t.tag[1] === +j).length;

      if (matchingAchievements)
        createHTML(`${j}-${k}`, {
          emoji: "🎖️",
          list: true,
          title: ` Achievements tagged ‘${kind} → ${category}’ | Apkallu Falls`,
          description: `This is a list of all achievements tagged ‘${kind} → ${category}’. There ${matchingAchievements === 1 ? 'is' : 'are'} ${matchingAchievements} ${matchingAchievements === 1 ? 'achievement' : 'achievements'} with this tag.`
        }, 'achievements/tagged', () => {});
    })
  })
}