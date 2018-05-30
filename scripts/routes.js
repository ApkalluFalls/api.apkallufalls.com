const fs = require('fs');
const createHTML = require('./_HTML');

module.exports = () => {
  // Generic pages.
  // This needs to be synchronised with the website's routing.
  [{
    name: "character-select",
    text: "Character Select",
    description: "Find a character to track on Apkallu Falls, or select from one of your tracked characters.",
    section: "Other Pages"
  }, {
    name: "translate",
    text: "Translate",
    description: "Help us translate Apkallu Falls!",
    section: "Other Pages"
  }, {
    name: "xivsync",
    text: "Add Character to XIVSync",
    description: "Before your character can be tracked on Apkallu Falls, it needs to be polled by XIVSync."
  }].forEach(tag => {
    createHTML(tag.name, {
      list: true,
      title: `${tag.text} | Apkallu Falls`,
      description: tag.description,
      section: "Other Pages"
    }, '', () => {});
  });

  console.info('!! Make sure these look correct:', '\n');

  // Minion and Mount tags
  // This needs to be synchronised with the website's tag handling method.
  [
    "achievement",
    "achievement-certificate",
    "beast-tribe",
    "crafting",
    "duty",
    "event",
    "live-Event",
    "fate",
    "instanced-fate",
    "legacy",
    "promotional",
    "gathering",
    "desynthesis",
    "free-company",
    "gardening",
    "palace-of-the-dead",
    "main-scenario-quest",
    "npc-shop",
    "pvp",
    "side-quest",
    "raid",
    "retainer-venture",
    "treasure-hunt",
    "trial",
    "veteran-reward",
    "wondrous-tails",
    "unknown",
    "grand-company",
    "default"
  ].forEach(tag => {
    const text = tag
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
      .replace(' Of ', ' of ')
      .replace(' The ', ' the ')
      .replace('Fate', 'FATE')
      .replace('Msq', 'Main Scenario Quest')
      .replace('Pvp', 'PvP');

    console.info(tag, '-->', text);

    createHTML(tag, {
      emoji: "🐧",
      list: true,
      title: ` Minions tagged ‘${text}’ | Apkallu Falls`,
      description: `This is a list of obtain methods for all minions tagged ‘${text}’.`,
      section: "Minions"
    }, 'minions/tagged', () => {});

    createHTML(tag, {
      emoji: "🚲",
      list: true,
      title: ` Mounts tagged ‘${text}’ | Apkallu Falls`,
      description: `This is a list of obtain methods for all mounts tagged ‘${text}’.`,
      section: "Mounts"
    }, 'mounts/tagged', () => {});

    createHTML(tag, {
      emoji: "😊",
      list: true,
      title: ` Emotes tagged ‘${text}’ | Apkallu Falls`,
      description: `This is a list of obtain methods for all emotes tagged ‘${text}’.`,
      section: "Emotes"
    }, 'emotes/tagged', () => {});
  });

  console.info('\n', '!! Make sure those look correct ^.', '\n');
}