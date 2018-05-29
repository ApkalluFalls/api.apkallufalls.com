const Helper = require('../_helper');
const createList = require('../_list');

module.exports = new Helper("Item", "items", {
  api: 'Item',
  columns: [
    'Icon',
    'ID',
    'Name_de',
    'Name_en',
    'Name_fr',
    'Name_ja',
    'ItemAction.Type',
    'ItemAction.Data_0',
    'ItemAction.Data_1',
    'ItemAction.Data_2',
    'ItemAction.Data_3'
  ],
  list: true,
  v3: true,
  format: (data, args) => {
    const response = {
      emotes: format(
        data.filter(item => item['ItemAction.Data_1'] >= 5100
          && item['ItemAction.Data_1'] <= 5300
          && item['ItemAction.Data_2'] !== 0
        ),
        'ItemAction.Data_2'
      ),
      minions: format(
        data.filter((item => item['ItemAction.Type'] === 853)),
        'ItemAction.Data_0'
      ),
      mounts: format(
        data.filter((item => item['ItemAction.Type'] === 1322)),
        'ItemAction.Data_0'
      )
    }

    return response;
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("items", data, base, _helperCreateJSONFn);
});

function format(data, awardKey) {
  return data.map(entry => ({
    icon: entry.Icon,
    id: entry.ID,
    name: {
      de: entry.Name_de,
      en: entry.Name_en,
      fr: entry.Name_fr,
      jp: entry.Name_ja
    },
    awards: entry[awardKey]
  }))
}