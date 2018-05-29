const Helper = require('../_helper');
const getIcons = require('./_iconHelper');

const api = "Item";
const base = 'itemsV3';
const name = "Item";
const plural = "items";

module.exports = new Helper(name, plural, {
  api,
  base,
  columns: [
    "Id",
    "Icon",
    'ItemAction.Type',
    'ItemAction.Data_0',
    'ItemAction.Data_1',
    'ItemAction.Data_2',
    'ItemAction.Data_3'
  ],
  list: true,
  v3: true,
  useCallback: true
}, (data, resolve) => {
  const emote = data.filter(item => item['ItemAction.Data_1'] >= 5100
    && item['ItemAction.Data_1'] <= 5300
    && item['ItemAction.Data_2'] !== 0
  )[0];

  const minions = data.filter((item => item['ItemAction.Type'] === 853));

  const mounts = data.filter((item => item['ItemAction.Type'] === 1322));

  getIcons(base, [
    emote,
    ...minions,
    ...mounts
  ], resolve, true);
});

