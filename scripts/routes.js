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
    name: "connect",
    text: "Sign in",
    description: "Connecting with Apkallu Falls will unlock manual tracking of Final Fantasy XIV content."
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

  // Orchestrion Roll categories
  // This matches the object contained within config.js of Apkallu Falls itself.
  const orchestrionRolls = {
    2: {
      name: {"de":"Orte","en":"Locales","fr":"Lieux","jp":"フィールド"}
    },
    3: {
      name: {"de":"Dungeons","en":"Dungeons","fr":"Donjons","jp":"ダンジョン"}
    },
    4: {
      name: {"de":"Primae","en":"Trials","fr":"Défis","jp":"討伐・討滅戦"}
    },
    5: {
      name: {"de":"Raids","en":"Raids","fr":"Raids","jp":"レイド"}
    },
    6: {
      name: {"de":"Andere","en":"Others","fr":"Divers","jp":"その他"}
    },
    7: {
      name: {"de":"Saisonales Ereignis","en":"Seasonal","fr":"Événements","jp":"シーズナル"}
    },
    8: {
      name: {"de":"Mogry-Kiosk","en":"Mog Station","fr":"Station Mog","jp":"モグステーション"}
    }
  };

  Object.keys(orchestrionRolls).forEach(k => {
    const text = orchestrionRolls[k].name.en;
    createHTML(k, {
      emoji: "🎶",
      list: true,
      title: `${text} - Orchestrion Rolls | Apkallu Falls`,
      description: `This is a list of obtain methods for all orchestrion rolls in the ‘${text}’ category.`,
      section: "Orchestrion Rolls"
    }, 'orchestrion-rolls/category', () => {});
  })

  console.info('!! Make sure these look correct:', '\n');

  // Minion, Mount, Emote, Barding and Orchestrion Roll tags
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
    "default",
    "companion",
    "buddy-skill"
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
      title: `Minions tagged ‘${text}’ | Apkallu Falls`,
      description: `This is a list of obtain methods for all minions tagged ‘${text}’.`,
      section: "Minions"
    }, 'minions/tagged', () => {});

    createHTML(tag, {
      emoji: "🚲",
      list: true,
      title: `Mounts tagged ‘${text}’ | Apkallu Falls`,
      description: `This is a list of obtain methods for all mounts tagged ‘${text}’.`,
      section: "Mounts"
    }, 'mounts/tagged', () => {});

    createHTML(tag, {
      emoji: "😊",
      list: true,
      title: `Emotes tagged ‘${text}’ | Apkallu Falls`,
      description: `This is a list of obtain methods for all emotes tagged ‘${text}’.`,
      section: "Emotes"
    }, 'emotes/tagged', () => {});

    createHTML(tag, {
      emoji: "💺",
      list: true,
      title: `Chocobo Barding tagged ‘${text}’ | Apkallu Falls`,
      description: `This is a list of obtain methods for all sets of chocobo barding tagged ‘${text}’.`,
      section: "Chocobo Barding"
    }, 'chocobo-barding/tagged', () => {});

    createHTML(tag, {
      emoji: "🎶",
      list: true,
      title: `Orchestrion Rolls tagged ‘${text}’ | Apkallu Falls`,
      description: `This is a list of obtain methods for all orchestrion rolls tagged ‘${text}’.`,
      section: "Orchestrion Rolls"
    }, 'orchestrion-rolls/tagged', () => {});
  });

  console.info('\n', '!! Make sure those look correct ^.', '\n');
}