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
    "Achievement",
    "Achievement Certificate",
    "Beast Tribe",
    "Crafting",
    "Duty",
    "Event",
    "Live Event",
    "FATE",
    "Instanced FATE",
    "Legacy",
    "Promotional",
    "Gathering",
    "Desynthesis",
    "Free Company",
    "Gardening",
    "Palace of the Dead",
    "Main Scenario Quest",
    "NPC Shop",
    "PvP",
    "Side Quest",
    "Raid",
    "Retainer Venture",
    "Treasure Hunt",
    "Trial",
    "Veteran Reward",
    "Wondrous Tails",
    "Unknown"
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
  });
}