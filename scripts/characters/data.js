const fetch = require('node-fetch');
const fs = require('fs');
const createHTML = require('../_HTML');

const categories = {};
const kinds = {};

module.exports = async () => {
  let friends;
  let supporters;
  let translators;

  await new Promise((resolve) => fs.readFile('../docs/friends.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => friends = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/supporters.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => supporters = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/translators.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => translators = JSON.parse(data));

  const processedFriends = await getInfo(0, friends, []);
  fs.writeFile(
    "../docs/friends.json",
    JSON.stringify(processedFriends),
    'utf8',
    () => {
      console.log("Updated friends.")
    }
  );

  const processedSupporters = await getInfo(0, supporters, []);
  fs.writeFile(
    "../docs/supporters.json",
    JSON.stringify(processedSupporters),
    'utf8',
    () => {
      console.log("Updated supporters.")
    }
  );

  const processedTranslators = await getInfo(0, translators, []);
  fs.writeFile(
    "../docs/translators.json",
    JSON.stringify(processedTranslators),
    'utf8',
    () => {
      console.log("Updated translators.")
    }
  );
}

async function getInfo(index, content, data) {
  console.info(index, content[index].id);
  const apiData = await fetch(
    'http://api.xivdb.com/character/' + content[index].id,
    {
      method: 'GET',
      mode: 'cors'
    }
  )
    .then(response => response.json())
    .catch(e => console.error(e));

  data.push({
    ...content[index],
    img: apiData.data.avatar,
    name: apiData.data.name,
    world: apiData.data.server
  });

  if (index === content.length - 1)
    return data;
  
  return getInfo(index += 1, content, data);
}