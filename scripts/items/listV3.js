const Helper = require('../_helper');
const createList = require('../_list');

module.exports = new Helper("Item", "items", {
  api: 'Item',
  columns: [
    'Description_de',
    'Description_en',
    'Description_fr',
    'Description_ja',
    'Icon',
    'ID',
    'Name_de',
    'Name_en',
    'Name_fr',
    'Name_ja',
    'ItemAction.Type',
    'ItemAction.Data0',
    'ItemAction.Data1',
    'ItemAction.Data2',
    'ItemAction.Data3',
    'ItemSearchCategory',
    'GameContentLinks.Achievement.Item',
    'GamePatch.ID'
  ],
  list: true,
  v3: true,
  format: (data, args) => {
    const response = {
      achievements: format(
        data.filter(item => item.GameContentLinks.Achievement.Item),
        'GameContentLinks.Achievement.Item',
        'achievement'
      )
    };
  
    response.barding = format(
      data.filter(item => item.ItemAction.Type == 1013),
      'ItemAction.Data0',
      'barding',
      response.achievements
    );
  
    response.emotes = format(
      data.filter(item => item.ItemAction.Data1 >= 5100
        && item.ItemAction.Data1 <= 5300
        && item.ItemAction.Data2 !== 0
      ),
      'ItemAction.Data2',
      'emote',
      response.achievements
    );
  
    response.hairstyles = format(
      data.filter(item => item.ItemAction.Type == 2633
        && item.ItemAction.Data1 === 4659
      ),
      'ItemAction.Data0',
      'hairstyle',
      response.achievements
    );

    response.minions = format(
      data.filter((item => item.ItemAction.Type === 853)),
      'ItemAction.Data0',
      'minion',
      response.achievements
    );

    response.mounts = format(
      data.filter(item => item.ItemAction.Type === 1322),
      'ItemAction.Data0',
      'mount',
      response.achievements
    );

    response['orchestrion-rolls'] = format(
      data.filter(item => item.ItemAction.Type === 5845),
      'ItemAction.Data0',
      'orchestrionRoll',
      response.achievements,
      true
    )

    return response;
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("items", data, base, _helperCreateJSONFn);
});

function format(data, awardKey, subresource, achievements, requiresPatch) {
   return data.map(entry => {
     const result = {
      icon: entry.Icon,
      id: entry.ID,
      info: {
        de: entry.Description_de,
        en: entry.Description_en,
        fr: entry.Description_fr,
        jp: entry.Description_ja
      },
      name: {
        de: entry.Name_de,
        en: entry.Name_en,
        fr: entry.Name_fr,
        jp: entry.Name_ja
      }
    }

    if (entry.ItemSearchCategory === 0)
      result.untradable = true;

    if (achievements) {
      const achievement = achievements.filter(a => a.id === result.id)[0];
      result.awards = eval(`entry.${awardKey}`);

      if (achievement) {
        if (achievement.special)
          throw new Error(
            "Achievement " + achievement.source + " with item " + result.id + " already has a special value."
          );
        
        achievement.special = {
          type: subresource,
          id: result.awards
        }
      }
    }
    else {
      if (eval(`entry.${awardKey}`).length > 1)
        throw new Error('Unhandled item with multiple achievements.');
      result.source = eval(`entry.${awardKey}`)[0];
    }

    if (requiresPatch)
      result.patch = entry.GamePatch.ID;

    return result;
  })
}