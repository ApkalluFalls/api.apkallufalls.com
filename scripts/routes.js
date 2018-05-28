const fs = require('fs');
const createHTML = require('./_HTML');

module.exports = () => {
  // Generic pages.
  // This needs to be synchronised with the website's routing.
  [{
    name: "character-select",
    text: "Character Select",
    description: "Find a character to track on Apkallu Falls, or select from one of your tracked characters."
  }, {
    name: "translate",
    text: "Translate",
    description: "Help us translate Apkallu Falls!"
  }, {
    name: "xivsync",
    text: "Add Character to XIVSync",
    description: "Before your character can be tracked on Apkallu Falls, it needs to be polled by XIVSync."
  }].forEach(tag => {
    createHTML(tag.name, {
      list: true,
      title: `${tag.text} | Apkallu Falls`,
      description: tag.description
    }, '', () => {});
  });

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
    createHTML(tag, {
      emoji: "🐧",
      list: true,
      title: ` Minions tagged ‘${tag}’ | Apkallu Falls`,
      description: `This is a list of all minions tagged ‘${tag}’.`
    }, 'minions/tagged', () => {});

    createHTML(tag, {
      emoji: "🚲",
      list: true,
      title: ` Mounts tagged ‘${tag}’ | Apkallu Falls`,
      description: `This is a list of all mounts tagged ‘${tag}’.`
    }, 'mounts/tagged', () => {});

    createHTML(tag, {
      emoji: "😊",
      list: true,
      title: ` Emotes tagged ‘${tag}’ | Apkallu Falls`,
      description: `This is a list of all emotes tagged ‘${tag}’.`
    }, 'emotes/tagged', () => {});
  });
}