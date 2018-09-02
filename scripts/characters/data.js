const fetch = require('node-fetch');
const fs = require('fs');
const createHTML = require('../_HTML');

module.exports = async (titles) => {
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

  const processedFriends = await getInfo(0, friends, [], "friend", titles);
  fs.writeFile(
    "../docs/friends.json",
    JSON.stringify(processedFriends),
    'utf8',
    () => {
      console.log("Updated friends.")
    }
  );

  const processedSupporters = await getInfo(0, supporters, [], "Patreon supporter", titles);
  fs.writeFile(
    "../docs/supporters.json",
    JSON.stringify(processedSupporters),
    'utf8',
    () => {
      console.log("Updated supporters.")
    }
  );

  const processedTranslators = await getInfo(0, translators, [], "translator", titles);
  fs.writeFile(
    "../docs/translators.json",
    JSON.stringify(processedTranslators),
    'utf8',
    () => {
      console.log("Updated translators.")
    }
  );
}

async function getInfo(index, content, data, description, titles) {
  const apiKey = await fs.readFileSync('../xivapi-key.txt', 'utf-8');
  const apiData = await fetch(
    `http://xivapi.com/character/${content[index].id}?columns=Character.Avatar,Character.Name,Character.Server,Character.Title&key=${apiKey}`,
    {
      method: 'GET',
      mode: 'cors'
    }
  )
    .then(response => response.json())
    .catch(e => console.error(e));

  if (!apiData || !apiData.Character || apiData.Error)
    throw new Error(`Unable to find character ${content[index].id}`);

  data.push({
    ...content[index],
    img: apiData.Character.Avatar,
    name: apiData.Character.Name,
    world: apiData.Character.Server
  });

  const avatar = await fetch(
    apiData.Character.Avatar,
    {
      method: 'GET',
      mode: 'cors'
    }
  )
    .then(response => response.arrayBuffer());
  
  const title = apiData.Character.Title && apiData.Character.Title != 247 && titles.data.filter(t => t.id === apiData.Character.Title)[0].name.en;

  if (content[index].url)  
    createHTML(content[index].url, {
      data: data[index],
      emoji: "🗡️",
      title: `${apiData.Character.Name} | Apkallu Falls`,
      description: `${apiData.Character.Name}${title ? ` «${title}»` : ''} of ${apiData.Character.Server} is a ${(description === "translator" ? content[index]['?'] + " translator" : description)} of Apkallu Falls.`,
      image: apiData.Character.Avatar,
      imageAvatar: avatar,
      section: "Characters"
    }, "!", () => {});

  createHTML(content[index].id, {
    data: data[index],
    emoji: "🗡️",
    title: `${apiData.Character.Name} | Apkallu Falls`,
    description: `${apiData.Character.Name}${title ? ` «${title}»` : ''} of ${apiData.Character.Server} is a ${(description === "translator" ? content[index]['?'] + " translator" : description)} of Apkallu Falls.`,
    image: apiData.Character.Avatar,
    imageAvatar: avatar,
    section: "Characters"
  }, "character", () => {});

  if (index === content.length - 1)
    return data;
  
  return getInfo(index += 1, content, data, description, titles);
}