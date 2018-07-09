const o = require('../_obtainMethods');
const getAchievement = require('../_getAchievement');
const locale = require('../_locale');

let achievements;
let barding;
let item;

const expansions = {
  Unknown: 'X',
  Legacy: 1,
  ARR: 2,
  HW: 3,
  SB: 4
};

const gilImage = 'gil';
const companySealsImage = 'cs';
const wolfMarksImage = 'wm';
const mgpImage = 'mgp';
const poeticsImage = 'poetics';
const achievementCertificate = 'ac';
const fateImage = 'fate';
const eurekaAnemosFateImage = 'fate2';
const locationImage = 'loc';
const dutyImage = 'duty';
const pvpImage = 'pvp';
const trialImage = 'trial';
const raidImage = 'raid';
const timewornImage = 'map';
const elixirImage = '4559';
const hiElixirImage = '4560';
const alliedSealsImage = 'as';
const centurioSealsImage = 'cnts';
const seedImage = 'seed';
const questImage = 'quest';
const msqImage = 'msq';
const brassSkyPirateSpoilsImage = 'bsps';
const gelmorranPotsherdImage = 'gp';
const wondrousTailsImage = 'wt';
const sasshoSekiFragmentImage = 'ssf';
const ventureImage = 'v';
const kojinSangoImage = 'ks';
const ixionHornImage = 'ih';
const anantaDreamstaffImage = 'ad';
const namazuKobanImage = 'nk';
const mythicClanLogMarkImage = 'mc';
const odinsMantleImage = 'om';

const rank = {
  sworn: ['Sworn', 'Solidarisch', 'Assermenté', '誓約'],
  honored: ['Honored', 'Geachtet', 'Émérite', '名誉'],
  trusted: ['Trusted', 'Vertraut', 'Estimé', '信頼'],
  allied: ['Allied', 'Verbündet', 'Allié', '盟友'],
  respected: ['Respected', 'Respektierte', 'Respecté', '尊敬する']
}

const beastTribe = {
  amaljaa: ['Amalj\'aa', true, true, 'アマルジャ'],
  ixal: ['Ixal', true, true, 'イクサル'],
  kobold: ['Kobold', true, 'Kobolde', 'コボルド'],
  sahagin: ['Sahagin', true, 'Sahuagin', 'サハギン'],
  sylph: ['Sylph', 'Sylphen', 'Sylphe', 'シルフ'],
  vanuVanu: ['Vanu Vanu', true, true, 'バヌバヌ'],
  vath: ['Vath', true, 'Vathe', 'ヴァス'],
  moogle: ["Moogle", "Mogry", "Mog", "モーグリ"],
  kojin: ["Kojin", true, true, "コウジン"],
  ananta: ["Ananta", true, true, "アナンタ"],
  namazu: ["Namazu", "Namazuo", true, "ナマズオ"]
}

const craftItem = {
  darksteelPlate: {
    icon: 5075,
    name: ["Darksteel Plate", "Dunkelstahlplatte", "Plaque de sombracier", "ダークスチールプレート"]
  },
  earthCluster: {
    icon: 17,
    name: ["Earth Cluster", "Erdpolykristall", "Agrégat de terre", "アースクラスター"]
  },
  goldIngot: {
    icon: 5069,
    name: ["Gold Ingot", "Goldbarren", "Lingot d'or", "ゴールドインゴット"]
  },
  hippogryphLeather: {
    icon: 5288,
    name: ["Hippogryph Leather", "Gryphenleder", "Cuir d'hippogriffe", "ヒッポグリフレザー"]
  },
  iceCluster: {
    icon: 15,
    name: ["Ice Cluster", "Eispolykristall", "Agrégat de glace", "アイスクラスター"]
  }, 
  leviathansBarb: {
    icon: 7159,
    name: ["Leviathan's Barb", "Bartel Leviathans", "Barbillon de Léviathan", "リヴァイアサンの棘"]
  },
}

const _npc = {
  minionTrader: ['Minion Trader', 'Trabantenhändlerin', 'Marchande De Mascottes', 'ミニオントレーダー'],
  lunaVanu: ["Luna Vanu", true, true, "商人のルナバヌ"],
  vathStickpeddler: ["Vath Stickpeddler", "Krämer", "Camelot", "アキンド"],
  mogmulMogbelly: ["Mogmul Mogbelly", "Mogmul Mogbauch", "Mogmul", "大食いのモグムリ"],
  stormSegeant: ["Storm Sergeant", "Sturmmaat", "Sergent Des Tempêtes", "黒渦団甲軍曹"],
  spoilsCollector: ["Spoils Collector", "Andenkenhändlerin", "Négociante D'espoilles", "スポイル取引窓口"]
}

const gil = ['Gil', true, true, 'ギル'];
const poetics = ['Allagan Tomestone of Poetics', 'Allagischer Stein der Poesie', 'Mémoquartz allagois poétique', 'アラガントームストーン:詩学'];
const mgp = ['MGP', true, 'Point du Gold Saucer', 'マンダヴィル・ゴールドソーサーポイント'];
const alliedSeals = ['Allied Seal', 'Jagdabzeichen', 'Insigne allié', '同盟記章'];
const centurioSeals = ["Centurio Seal", "Centurio-Abzeichen", "Insigne Centurio", "セントリオ記章"];
const wolfMarks = ["Wolf Marks", "Wolfsmarken", "Marques De Loup", "対人戦績の取引"];
const brassSkyPirateSpoils = ["Brass Sky Pirate Spoil", "Messing-Piratenandenken", "Espoille de pirate des cieux en laiton", "スカイパイレーツスポイル:真鍮"];
const gelmorranPotsherd = ["Gelmorran Potsherd", "Gelmorra-Scherbe", "Tesson de poterie gelmorraine", "ゲルモラ土器片"];
const sasshoSekiFragment = ["Sassho-seki Fragment", "Sassho-seki-Fragment", "Fragment de la Roche meurtrière", "殺生石の欠片"];
const kojinSango = ["Kojin Sango", "Kojin-Koralle", "Sango kojin", "コウジン珊瑚貨"];
const ixionHorn = ["Ixion Horn", "Ixion-Hornfragment", "Corne d'Ixion", "イクシオンの角片"];
const anantaDreamstaff = ["Ananta Dreamstaff", "Ananta-Traumstab", "Barrette béatifique ananta", "アナンタ魔金錫貨"];
const namazuKoban = ["Namazu Koban", "Namazuo-Koban", "Koban namazu", "ナマズオ小判"];
const mythicClanMarkLog = ["Mythic Clan Mark Log", "Clan-Mythenjäger-Tagebuch", "Journal de membre émérite du clan", "傑物クラン員の手記"];
const odinsMantle = ["Odin's Mantle", "Odins Mantel", "Mante d'Odin", "オーディンの被布"];

const location = {
  theGoldSaucer: ['The Gold Saucer', 'Gold Saucer', 'Gold Saucer', 'ゴールドソーサー']
}

const helper = {
  achievementCertificate: (quantity) => {
    return o(
      'achievementCertificate',
      [
        quantity + 'x',
        ['Achievement Certificate', 'Errungenschaftszertifikat', 'Jeton de hauts faits', 'アチーブメントスクリップ'],
        achievementCertificate,
        ['Jonathas', true, true, 'ジョナサス'],
        location.apkalluFalls,
        locationImage,
        location.oldGridania,
        10.6, 6.3
      ],
      expansions.ARR,
      true,
      false
    )
  },
  achievementReward: (achievementId, expansion, available, promo) => {
    return o(
      'achievement',
      [],
      expansion,
      available,
      promo,
      {
        achievement: getAchievement(achievements, achievementId)
      }
    )
  },
  buddySkill: (tree) => {
    return o(
      'buddySkill',
      [locale(tree)],
      expansions.ARR,
      true,
      false
    )
  },
  collectorsEdition: (expansionText, expansion, available) => {
    return o(
      'collectorsEdition',
      [
        ['Collector\'s Edition', true, true, 'コレクターズエディション'],
        expansionText,
        locale('Mog Station')
      ],
      expansion,
      available,
      true
    );
  },
  companySeals: (cost, company, item) => {
    const companySeals = ['Company Seals', 'Staatstaler', 'Sceaux de compagnie', '軍票'];

    let companyName = locale(company);
    companyName = [company, companyName.de, companyName.fr, companyName.jp];

    let npc;
    let loc;
    let x;
    let y;

    const quartermasters = ['Quartiermeisterin', 'Officier de la logistique', '補給担当官'];

    switch (company) {
      case 'Maelstrom':
        npc = ['Storm Quartermaster', ...quartermasters];
        loc = ['Limsa Lominsa Upper Decks', 'Obere Decks', 'Limsa Lominsa - Le Tillac', 'リムサ・ロミンサ：上甲板層'];
        x = 13.1;
        y = 12.7;
        break;
      case 'Order of the Twin Adder':
        npc = ['Serpent Quartermaster', ...quartermasters];
        loc = ['New Gridania', 'Neu-Gridania', 'Nouvelle Gridania', 'グリダニア：新市街'];
        x = 9.8;
        y = 11.0;
        break;
      case 'Immortal Flames':
        npc = ['Flame Quartermaster', ...quartermasters];
        loc = ['Ul\'dah - Steps of Nald', 'Nald-Kreuzgang', 'Ul\'dah - Faubourg de Nald', 'ウルダハ：ナル回廊'];
        x = 8.3;
        y = 9.0;
        break;
    }

    return o(
      'purchase',
      [cost, companySeals, companySealsImage, npc, companyName, locationImage, loc, x, y, item.name],
      expansions.ARR,
      true,
      false
    )
  },
  craft: (level, job, stars, items, expansion) => {
    const itemArr = ['', '', '', ''];
    items.forEach((item, index) => {
      for (var i = 0; i < 4; i++)
        itemArr[i] += (index === 0 ? '' : (index === items.length - 1 ? ' and ' : ', '))
                    + item.quantity + 'x '
                    + item.name[i]
                    + ' <img src="https://api.apkallufalls.com/icons/item/' + item.icon + '.png" alt="' + item.name[i] + '" />';
    });
    return o(
      'craft',
      [
        level,
        job,
        stars ? ' (' + (new Array(stars).fill()).map(s => '★').join('') + ')' : '',
        itemArr
      ],
      expansion,
      true,
      false,
      {
        job: job[0]
      }
    )
  },
  eventQuest: (level, quest, image, expansion) => {
    return o(
      'eventQuest',
      [level, locale('Seasonal Events'), quest, image],
      expansion,
      false,
      false
    )
  },
  eventQuestPurchase: (shop, event, expansion, item) => {
    return o(
      'eventQuestPurchase',
      [shop, event, item.name],
      expansion,
      false,
      false
    )
  },
  goldSaucerPrizeExchange: (cost, item) => {
    return o(
      'purchase',
      [
        cost, mgp, mgpImage,
        ['Gold Saucer Attendant', 'Sonderartikel-Händlerin', 'Préposée Aux Lots', '景品交換窓口'],
        ['(Prize Exchange I)', '(Gewinne I)', '(Lots (1))', '（景品の交換（その1））'],
        locationImage,
        location.theGoldSaucer,
        5.4, 6.7,
        item.name
      ],
      expansions.ARR,
      true,
      false
    )
  },
  grandCompany: (gc, emoteArray) => {
    return o(
      'grandCompany',
      [gc],
      expansions.ARR,
      true,
      false,
      {
        emotes: emoteArray.map(id => {
          const emote = emotes.filter(emote => emote.ID === id)[0];
          return {
            id: id,
            name: {
              de: emote.Name_de,
              en: emote.Name_en,
              fr: emote.Name_fr,
              jp: emote.Name_ja
            }
          };
        })
      }
    )
  },
  isDefault: () => {
    return o(
      'isDefault',
      [],
      expansions.ARR,
      true,
      false
    )
  },
  mogStation: (item) => {
    return o(
      'mogStation',
      [
        locale('Mog Station'),
        item.name
      ],
      expansions.ARR,
      true,
      true
    )
  },
  msq: (level, type, quest, npc, loc, x, y, expansion, available, promo) => {
    return o(
      'msq',
      [level, type, msqImage, quest, npc, locationImage, loc, x, y],
      expansion,
      available,
      promo
    )
  },
  quest: (level, type, quest, npc, loc, x, y, expansion, available, promo) => {
    return o(
      'quest',
      [level, type, questImage, quest, npc, locationImage, loc, x, y],
      expansion,
      available,
      promo
    )
  },
  recruitAFriend: () => {
    return o(
      'recruitAFriendFirst',
      [locale('Recruit a Friend Campaign')],
      expansions.ARR,
      true,
      false
    )
  },
  squareEnixStoreNoExpiration: (item, expiration) => {
    return o(
      'squareEnixStoreNoExpiration',
      [item, locale('Square Enix Store')],
      expansions.ARR,
      true,
      true
    )
  },
  veteranReward: (days) => {
    return o(
      'veteranReward',
      [locale('Veteran Reward'), days],
      expansions.ARR,
      false,
      false
    )
  }
}

let value;

/* Returns information about how minions are obtained.
 * Corresponds to ../../docs/obtainMethods.json.
 */
module.exports = (barding, achievementsIn, allBardingIn, itemIn) => {
  achievements = achievementsIn;
  allBarding = allBardingIn;
  item = itemIn;
  switch (+barding.id) {
    case 2:
      return helper.companySeals(4000, 'Maelstrom', item);

    case 3:
      return helper.companySeals(6000, 'Maelstrom', item);

    case 4:
      return helper.companySeals(8000, 'Maelstrom', item);

    case 6:
      return helper.companySeals(4000, 'Order of the Twin Adder', item);

    case 7:
      return helper.companySeals(6000, 'Order of the Twin Adder', item);

    case 8:
      return helper.companySeals(8000, 'Order of the Twin Adder', item);

    case 10:
      return helper.companySeals(4000, 'Immortal Flames', item);

    case 11:
      return helper.companySeals(6000, 'Immortal Flames', item);

    case 12:
      return helper.companySeals(8000, 'Immortal Flames', item);
    
    case 13:
      return helper.buddySkill('Defender');
    
    case 14:
      return helper.buddySkill('Attacker');
    
    case 15:
      return helper.buddySkill('Healer');

    case 16:
      return o(
        'purchase',
        [
          5, odinsMantle, odinsMantleImage,
          ["Auriana", true, true, "オーリアナ"],
          ["(Uncanny Knickknacks)", "(Gegenstände)", "(Objets (divers))", "（アイテムの取引（その他））"],
          locationImage,
          ["Mor Dhona", true, true, "モードゥナ"],
          22.8, 6.7,
          item.name
        ],
        expansions.SB,
        true,
        false
      );

    case 17:
      return helper.collectorsEdition(locale('A Realm Reborn'), expansions.ARR, true);
    
    case 18:
      return helper.quest(
        52,
        locale('Side Story Quests'),
        ["I Believe I Can Fly", "Nur Fliegen Ist Schöner!", "Vole, Beau Volatile!", "マイチョコボ、大空へ！"],
        ["Arnoulain", true, true, "アルヌーラン"],
        ["Foundation", "Fundamente", "Ishgard - L'Assise", "イシュガルド：下層"],
        7.8, 11.7,
        expansions.HW,
        true,
        false
      );
    
    case 19:
      return [
        helper.veteranReward(180),
        helper.achievementCertificate(2)
      ];

    case 20:
      return helper.achievementReward(861, expansions.ARR, true, false);
    
    case 21:
      return helper.eventQuestPurchase(
        ["Starlight Supplier", "Sternenlichtfest-Komiteemitglied", "Vendeuse De La Fête Des étoiles", "星芒祭実行委員"],
        ['Starlight Celebration 2014', true, true, '星芒祭'],
        expansions.ARR,
        item
      );
    
    case 22:
      return helper.craft(
        50,
        locale('Armorer'),
        3,
        [
          { quantity: 2, ...craftItem.iceCluster },
          { quantity: 1, ...craftItem.earthCluster },
          { quantity: 1, ...craftItem.goldIngot },
          { quantity: 1, ...craftItem.darksteelPlate },
          { quantity: 1, ...craftItem.hippogryphLeather },
          { quantity: 1, ...craftItem.leviathansBarb }
        ]
      );
    
    case 23:
      return [
        helper.veteranReward(360),
        helper.achievementCertificate(3)
      ];
    
    case 24:
      return helper.eventQuest(
        15,
        ["Hard-boiled", "Die Weisen Der Eiersuche", "Tous Ses Prœufs Dans Le Même Panier", "エッグハントの賢者様"],
        'eq7',
        expansions.ARR
      );

    default:
      console.log("Unknown method for barding " + barding.id);
      return null;
  }
}