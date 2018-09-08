const fetch = require('node-fetch');
const fs = require('fs');
const cacheBust = require('./_cacheBust');

console.log("\n");

const update = async function (args) {
  let config = {};

  if (args.length)
    args.forEach(a => config[a] = true);
  else
    config = false;
  
  let achievementCategories;
  let achievementsList;
  let minionsList;
  let mountsList;
  let titlesList;

  let achievementCategoriesV3;
  let achievementsListV3;
  let bardingListV3;
  let emotesListV3;
  let hairstyleListV3;
  let minionsListV3;
  let mountsListV3;
  let orchestrionRollsListV3;
  let titlesListV3;
  let itemsV3;

  await new Promise((resolve) => fs.readFile('../docs/achievement_categories.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => achievementCategories = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/achievements.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => achievementsList = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/minions.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => minionsList = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/mounts.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => mountsList = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/titles.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => titlesList = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/v3/achievement_categories.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => achievementCategoriesV3 = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/v3/achievements.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => achievementsListV3 = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/v3/barding.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => bardingListV3 = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/v3/emotes.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => emotesListV3 = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/v3/minions.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => minionsListV3 = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/v3/mounts.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => mountsListV3 = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/v3/orchestrion-rolls.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => orchestrionRollsListV3 = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/v3/titles.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => titlesListV3 = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/v3/items.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => itemsV3 = JSON.parse(data));

  let items;

  // // Patches
  if (!config || config.patches) {
    message('Patches');
    await require('./patches/list.js').fetch(
      achievementsListV3,
      minionsListV3,
      mountsListV3,
      titlesListV3,
      emotesListV3,
      bardingListV3,
      orchestrionRollsListV3
    );
  }

  // // Achievements.
  if (!config || config.achievements) {
    message('Achievements');
    await require('./achievements/data.js').fetch();
    await require('./achievements/list.js').fetch(achievementCategories);
  }
  if (config && config.achievementsList) {
    await require('./achievements/list.js').fetch(achievementCategories);
  }

  // Minions.
  if (!config || config.minions) {
    message('Minions');
    await require('./minions/data.js').fetch();
    await require('./minions/list.js').fetch(achievementsList);
  }
  if (config && config.minionsList) {
    await require('./minions/list.js').fetch(achievementsList);
  }

  // Mounts.
  if (!config || config.mounts) {
    message('Mounts');
    await require('./mounts/data.js').fetch();
    await require('./mounts/list.js').fetch(achievementsList);
  }
  if (config && config.mountsList) {
    await require('./mounts/list.js').fetch(achievementsList);
  }

  // Titles.
  if (config && config.titlesList) {
    await require('./titles/list.js').fetch(achievementsList, achievementCategories);
  }

  // Totals.
  if (!config || config.totals) {
    message('Totals');
    require('./totals/list.js')();
  }

  if (!config || config.icons) {
    message('Icons');
    await require('./icons/achievements.js').fetch();
    await require('./icons/minions.js').fetch();
    await require('./icons/mounts.js').fetch();
    // Sprite file too large.
    // await require('./icons/items.js').fetch();
    await require('./icons/barding.js').fetch();
    await require('./icons/emotes.js').fetch();
    // Not used for now. Image size ends up > 11Mb
    // await require('./icons/itemsV3.js').fetch();
  }

  if (config && config.characters) {
    await require('./characters/data.js')(titlesListV3);
  }

  if (config && config.routes) {
    await require('./routes.js')();
  }

  if (config && config.sitemap) {
    await require('./sitemap.js')();
  }

  // // Achievements V3.
  if (!config || config.achievementsV3) {
    message('Achievements');
    await require('./achievements/dataV3.js').fetch();
    const categories = await require('./achievements/categoriesV3.js').fetch();
    await require('./achievements/listV3.js').fetch(categories);
  }
  if (config && config.achievementsListV3) {
    const categories = await require('./achievements/categoriesV3.js').fetch();
    await require('./achievements/listV3.js').fetch(categories);
  }

  // Items V3.
  if (config && config.itemsV3) {
    message('Items');
    await require('./items/listV3.js').fetch();
  }

  // Minions V3.
  if (!config || config.minionsV3) {
    message('Minions');
    await require('./minions/dataV3.js').fetch(itemsV3);
    await require('./minions/listV3.js').fetch(achievementsList, itemsV3);
    console.info("!! Remember to check sounds to filter out French text.");
  }
  if (config && config.minionsListV3) {
    await require('./minions/listV3.js').fetch(achievementsList, itemsV3);
  }

  // Mounts V3.
  if (!config || config.mountsV3) {
    message('Mounts');
    await require('./mounts/dataV3.js').fetch(itemsV3);
    await require('./mounts/listV3.js').fetch(achievementsLis, itemsV3);
    console.info("!! Remember to check sounds to filter out French text.");
  }
  if (config && config.mountsListV3) {
    await require('./mounts/listV3.js').fetch(achievementsList, itemsV3);
  }

  // Chocobo Barding V3.
  if (config && config.bardingV3) {
    message('Chocobo Barding');
    await require('./barding/dataV3.js').fetch(itemsV3);
    await require('./barding/listV3.js').fetch(achievementsListV3, itemsV3);
  }
  if (config && config.bardingListV3) {
    await require('./barding/listV3.js').fetch(achievementsListV3, itemsV3);
  }

  // Emotes V3.
  if (config && config.emotesV3) {
    message('Emotes');
    await require('./emotes/dataV3.js').fetch();
    const apiKey = await fs.readFileSync('../xivapi-key.txt', 'utf-8');
    const textCommands = await recursiveFetch(
      'https://xivapi.com/TextCommand'
      + '?columns=ID,Command_de,Command_en,Command_fr,Command_ja,ShortAlias_de,'
      + 'ShortAlias_en,ShortAlias_fr,ShortAlias_ja,Alias_de,Alias_en,Alias_fr,Alias_jp'
      + '&key=' + apiKey
    ).then(response => response).catch(e => console.error(e));
    await require('./emotes/listV3.js').fetch(achievementsListV3, textCommands, itemsV3);
  }
  if (config && config.emotesListV3) {
    // Until the V3 API is fixed...
    const apiKey = await fs.readFileSync('../xivapi-key.txt', 'utf-8');
    const textCommands = await recursiveFetch(
      'https://xivapi.com/TextCommand'
      + '?columns=ID,Command_de,Command_en,Command_fr,Command_ja,ShortAlias_de,'
      + 'ShortAlias_en,ShortAlias_fr,ShortAlias_ja,Alias_de,Alias_en,Alias_fr,Alias_jp'
      + '&key=' + apiKey
    ).then(response => response).catch(e => console.error(e));
    await require('./emotes/listV3.js').fetch(achievementsListV3, textCommands, itemsV3);
  }

  // Hairstyles V3.
  if (config && config.hairstylesV3) {
    // message('Emotes');
    // await require('./emotes/dataV3.js').fetch();
    // const textCommands = await recursiveFetch(
    //   'https://xivapi.com/TextCommand'
    //   + '?columns=ID,Command_de,Command_en,Command_fr,Command_ja,ShortAlias_de,'
    //   + 'ShortAlias_en,ShortAlias_fr,ShortAlias_ja,Alias_de,Alias_en,Alias_fr,Alias_jp'
    // ).then(response => response).catch(e => console.error(e));
    // await require('./emotes/listV3.js').fetch(achievementsListV3, textCommands, itemsV3);
  }
  if (config && config.hairstylesListV3) {
    await require('./hairstyles/listV3.js').fetch(achievementsListV3, itemsV3);
  }

  // Orchestrion Rolls V3.
  if (config && config.orchestrionRollsV3) {
    message('Orchestrion rolls');
    await require('./orchestrionRolls/dataV3.js').fetch(itemsV3);
    await require('./orchestrionRolls/listV3.js').fetch(achievementsListV3, itemsV3);
  }
  if (config && config.orchestrionRollsListV3) {
    // Until the V3 API is fixed...
    await require('./orchestrionRolls/listV3.js').fetch(achievementsListV3, itemsV3);
  }

  // Titles V3.
  if (config && config.titlesListV3) {
    await require('./titles/listV3.js').fetch(achievementsListV3, achievementCategoriesV3);
  }

  // Cache bust.
  console.info("!! Remember to run patches after all other lists are updated.");
  console.info("!! Remember to also update routes whenever new tags or main routes are added.");
  cacheBust();
}

function message(type) {
  console.info("Updating " + type + ".");
}

update(process.argv.slice(2));

// Copied from _helper class.
async function recursiveFetch(api, result = [], page = 1) {
  const data = await fetch(`${api}&page=${page}`)
    .then(response => response.json());

  result = [...result, ...data.Results];
  console.info(data);

  if (data.Pagination.PageNext !== page)
    return recursiveFetch(api, result, data.Pagination.PageNext);
  return result;
}