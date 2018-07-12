const o = require('../_obtainMethods');
const getAchievement = require('../_getAchievement');
const locale = require('../_locale');

let achievements;
let allBarding;
let grandCompany;
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
const heavensWardHelmFragmentImage = 'hwhf';
const veteransClanMarkLogImage = 'vcml';

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

const specialItem = {
  anemosLockbox: ["Anemos Lockbox", "Anemos-Schließkassette", "Coffre verrouillé d'Anemos", "アネモス帯のロックボックス"],
  goldHaloedSack: ["Gold-haloed Sack", "Gülden strahlender Schatzbeutel", "Trésor énigmatique de grade II", "埋もれた財宝【弐】"],
  goldTrimmedSack: ["Gold-trimmed Sack", "Gefundener Schatz IV", "Trésor mystérieux de grade IV", "埋もれた財宝G4"],
  pieceOfAccursedHoard: ['piece of the Accursed Hoard', 'verborgenen Schatz', 'trésor caché', '埋もれた財宝'],
  platinumHaloedSack: ["Platinum-haloed Sack", "Platin strahlender Schatzbeutel", "Trésor énigmatique de grade III", "埋もれた財宝【参】"],
  silverTrimmedSack: ["Silver-trimmed Sack", "Gefundener Schatz III", "Trésor mystérieux de grade III", "埋もれた財宝G3"]
}

const craftItem = {
  adamantiteNugget: {
    icon: 12526,
    name: ["Adamantite Nugget", "Adamantium-Nugget", "Pépite d'adamant", "アダマンナゲット"]
  },
  allaganLeather: {
    icon: 9364,
    name: ["Allagan Leather", "Allagisches Leder", "Cuir chimérique allagois", "アラガンキメラレザー"]
  },
  aurumRegisNugget: {
    icon: 12522,
    name: ["Aurum Regis Nugget", "Königsgold-Nugget", "Pépite d'aurum regis", "オーラムレギスナゲット"]
  },
  azurite: {
    icon: 19965,
    name: ["Azurite", "Azurit", "Azurite", "アズライト"]
  },
  beastkinHorn: {
    icon: 14190,
    name: ["Beastkin Horn", "Bestienhorn", "Corne de bête", "枯角"]
  },
  bismarcksBaleen: {
    icon: 12256,
    name: ["Bismarck's Baleen", "Bismarck-Barte", "Corne de Bismarck", "ビスマルクの角"]
  },
  bladeOfRevelry: {
    icon: 19123,
    name: ["Blade of Revelry", "Verspielte Klinge", "Lame de Susano", "豪神スサノオの刃"]
  },
  blissfulShroud: {
    icon: 19124,
    name: ["Blissful Shroud", "Gepflegtes Tuch", "Étole de Lakshmi", "美神ラクシュミの羽衣"]
  },
  blueFoxHide: {
    icon: 7041,
    name: ["Blue Fox Hide", "Blaufuchsfell", "Fourrure de renard bleu", "ブルーフォックスの毛皮"]
  },
  byakkosMane: {
    icon: 22307,
    name: ["Byakko's Mane", "Byakko-Mäne", "Crinière du Tigre blanc", "白虎のタテガミ"]
  },
  cashmereCloth: {
    icon: 7609,
    name: ['Cashmere Cloth', 'Kaschmir', 'Étoffe de cachemire', 'カシミヤ織物']
  },
  celestialKimonoRemnant: {
    icon: 21609,
    name: ["Celestial Kimono Remnant", "Himmlischer Kimonostoff", "Lambeau du kimono de Tsukuyomi", "夜神ツクヨミの反物"]
  },
  chromiteIngot: {
    icon: 19949,
    name: ["Chromite Ingot", "Chromeisen-Barren", "Lingot de chromite", "クロマイトインゴット"]
  },
  darksteelPlate: {
    icon: 5075,
    name: ["Darksteel Plate", "Dunkelstahlplatte", "Plaque de sombracier", "ダークスチールプレート"]
  },
  diamondTear: {
    icon: 9378,
    name: ["Diamond Tear", "Diamantenträne", "Larme de la Furie des neiges", "氷神シヴァの涙"]
  },
  dinosaurLeather: {
    icon: 13745,
    name: ["Dinosaur Leather", "Dinosaurierleder", "Cuir de dinosaure", "ダイノレザー"]
  },
  dhalmelLeather: {
    icon: 12564,
    name: ["Dhalmel Leather", "Dhalmelleder", "Cuir de dhalmel", "ダルメルレザー"]
  },
  earthCluster: {
    icon: 17,
    name: ["Earth Cluster", "Erdpolykristall", "Agrégat de terre", "アースクラスター"]
  },
  earthShard: {
    icon: 5,
    name: ["Earth Shard", "Erdscherbe", "Éclat de terre", "アースシャード"]
  },
  eikonIronIngot: {
    icon: 14149,
    name: ["Eikon Iron Ingot", "Ikoneneisenbarren", "Lingot de fer primordial", "イコンアロイインゴット"]
  },
  eikonLeather: {
    icon: 14155,
    name: ["Eikon Leather", "Ikonenleder", "Cuir primordial", "イコンレザー"]
  },
  electrumIngot: {
    icon: 5066,
    name: ["Electrum Ingot", "Elektrum-Barren", "Lingot d'électrum", "エレクトラムインゴット"]
  },
  elmLumber: {
    icon: 5367,
    name: ["Elm Lumber", "Ulmen-Bauholz", "Madrier d'orme", "エルム材"]
  },
  fireCluster: {
    icon: 14,
    name: ["Fire Cluster", "Feuerpolykristall", "Agrégat de feu", "ファイアクラスター"]
  },
  gazelleLeather: {
    icon: 19997,
    name: ["Gazelle Leather", "Gazellenleder", "Cuir de gazelle", "ガゼルレザー"]
  },
  goldIngot: {
    icon: 5069,
    name: ["Gold Ingot", "Goldbarren", "Lingot d'or", "ゴールドインゴット"]
  },
  griffinLeatherStrap: {
    icon: 14187,
    name: ["Griffin Leather Strap", "Greifenleder-Riemen", "Lanière en cuir de griffon", "グリフィンストラップ"]
  },
  halgaiMane: {
    icon: 19985,
    name: ["Halgai Mane", "Halgai-Mähne", "Crinière de halgai", "ハルガイのタテガミ"]
  },
  hallowedRamieCloth: {
    icon: 12591,
    name: ["Hallowed Ramie Cloth", "Geheiligter Ramienstoff", "Étoffe de ramie sacrée", "聖麻布"]
  },
  heavyMetalIngot: {
    icon: 16705,
    name: ["Heavy Metal Ingot", "Schwermetall-Barren", "Lingot d'alliage de tungstène", "ヘヴィアロイインゴット"]
  },
  hemicyonLeather: {
    icon: 16708,
    name: ["Hemicyon Leather", "Hemicyonleder", "Cuir d'hemicyon", "ヘミキオンレザー"]
  },
  hippogryphLeather: {
    icon: 5288,
    name: ["Hippogryph Leather", "Gryphenleder", "Cuir d'hippogriffe", "ヒッポグリフレザー"]
  },
  iceCluster: {
    icon: 15,
    name: ["Ice Cluster", "Eispolykristall", "Agrégat de glace", "アイスクラスター"]
  },
  kyanite: {
    icon: 19963,
    name: ["Kyanite", "Kyanit", "Disthène", "カイヤナイト"]
  },
  larimar: {
    icon: 12541,
    name: ["Larimar", "Larimar", "Larimar", "ラリマール"]
  },
  leviathansBarb: {
    icon: 7159,
    name: ["Leviathan's Barb", "Bartel Leviathans", "Barbillon de Léviathan", "リヴァイアサンの棘"]
  },
  levinOrb: {
    icon: 8019,
    name: ["Levin Orb", "Ramuh-Kugel", "Orbe de Ramuh", "ラムウのオーブ"]
  },
  lightningCluster: {
    icon: 18,
    name: ["Lightning Cluster", "Blitzpolykristall", "Agrégat de foudre", "ライトニングクラスター"]
  },
  lightningCrystal: {
    icon: 12,
    name: ["Lightning Crystal", "Blitzkristall", "Cristal de foudre", "ライトニングクリスタル"]
  },
  molybdenumIngot: {
    icon: 19947,
    name: ["Molybdenum Ingot", "Molybdän-Barren", "Lingot de molybdène", "モリブデンインゴット"]
  },
  nidhoggsScale: {
    icon: 15653,
    name: ["Nidhogg's Scale", "Nidhogg-Schuppe", "Écaille de Nidhogg", "邪竜の鱗"]
  },
  palladiumIngot: {
    icon: 19948,
    name: ["Palladium Ingot", "Palladium-Barren", "Lingot de palladium", "パラースインゴット"]
  },
  palladiumNugget: {
    icon: 19946,
    name: ["Palladium Nugget", "Palladium-Nugget", "Pépite de palladium", "パラースナゲット"]
  },
  platinumNugget: {
    icon: 9359,
    name: ["Platinum Nugget", "Platin-Nugget", "Pépite de platine", "プラチナナゲット"]
  },
  ramieCloth: {
    icon: 12590,
    name: ["Ramie Cloth", "Ramienstoff", "Étoffe de ramie", "青麻布"]
  },
  ravanasForewing: {
    icon: 12258,
    name: ["Ravana's Forewing", "Ravana-Schwinge", "Aile de Ravana", "ラーヴァナの翅"]
  },
  roseGoldNugget: {
    icon: 5068,
    name: ["Rose Gold Nugget", "Rosengold-Nugget", "Pépite d'or rose", "ローズゴールドナゲット"]
  },
  saurianLeather: {
    icon: 7608,
    name: ["Saurian Leather", "Echsenleder", "Cuir de saurien", "ソーリアンレザー"]
  },
  scintillantIngot: {
    icon: 16706,
    name: ["Scintillant Ingot", "Szintillator-Barren", "Lingot de scintillant", "シンチレーターインゴット"]
  },
  sephirotSap: {
    icon: 13059,
    name: ["Sephirot Sap", "Sephirot-Harz", "Sève de Sephirot", "セフィロトの樹液塊"]
  },
  shinryusScales: {
    icon: 21090,
    name: ["Shinryu's Scales", "Shinryu-Schuppe", "Écaille de Shinryu", "神龍の鱗"]
  },
  silkThread: {
    icon: 5338,
    name: ["Silk Thread", "Vanya-Seidenfäden", "Fil de soie", "山繭糸"]
  },
  silvergraceIngot: {
    icon: 22428,
    name: ["Silvergrace Ingot", "Silbergunst-Barren", "Lingot de graçargent", "グレースインゴット"]
  },  
  sophicBeadFragment: {
    icon: 16897,
    name: ["Sophic Bead Fragment", "Sophia-Edelsteinsplitter", "Fragment d'orbe sophique", "女神の宝珠片"]
  },
  starRuby: {
    icon: 12544,
    name: ["Star Ruby", "Sternenrubin", "Rubis étoilé", "スタールビー"]
  },
  starSapphire: {
    icon: 12545,
    name: ["Star Sapphire", "Sternensaphir", "Saphir étoilé", "スターサファイア"]
  },
  tigerLeather: {
    icon: 19995,
    name: ["Tiger Leather", "Tigerleder", "Cuir de tigre", "タイガーレザー"]
  },
  titaniumIngot: {
    icon: 12525,
    name: ["Titanium Ingot", "Titan-Barren", "Lingot de titane", "チタンインゴット"]
  },
  trueLinen: {
    icon: 22493,
    name: ["True Linen", "Naturbelassenes Reinleinen", "Étoffe de lin hingashien", "真麻布"]
  },
  twinsilk: {
    icon: 19987,
    name: ["Twinsilk", "Doppelseide", "Étoffe de doublesoie", "玉糸紬"]
  },
  twinthread: {
    icon: 5330,
    name: ['Twinthread', 'Doppelfaden', 'Fil de doublesoie', '玉糸']
  },
  undyedWoolenCloth: {
    icon: 5328,
    name: ["Undyed Woolen Cloth", "Naturbelassene Wolle", "Étoffe de laine", "羅紗"]
  },
  windCluster: {
    icon: 16,
    name: ["Wind Cluster", "Windpolykristall", "Agrégat de vent", "ウィンドクラスター"]
  },
  windCrystal: {
    icon: 10,
    name: ["Wind Crystal", "Windkristall", "Cristal de vent", "ウィンドクリスタル"]
  },
  windShard: {
    icon: 4,
    name: ['Wind Shard', 'Windscherbe', 'Éclat de vent', 'ウィンドシャード']
  },
  woolenYarn: {
    icon: 5337,
    name: ["Woolen Yarn", "Wollgarn", "Fil de laine", "毛糸"]
  },
  zurvaniteCarapaceFragment: {
    icon: 17572,
    name: ["Zurvanite Carapace Fragment", "Fragment von Zurvans Panzer", "Fragment de carapace zurvanique", "鬼神の甲殻片"]
  }
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
const heavensWardHelmFragment = ["Heavens' Ward Helm Fragment", "Azurgarden-Helmfragment", "Fragment de casque de l'Azur", "蒼天の甲冑片"];
const veteransClanMarkLog = ["Veteran's Clan Mark Log", "Clan-Veteranenjäger-Tagebuch", "Journal de membre éminent du clan", "名物クラン員の手記"];

const location = {
  apkalluFalls: ['Apkallu Falls', 'Apkallu-Fälle', 'Chutes De L\'Apkallu', 'アプカル滝'],
  idyllshire: ["Idyllshire", "Frohehalde", "Idyllée", "イディルシャイア"],
  oldGridania: ['Old Gridania', 'Alt-Gridania', 'Vieille Gridania', 'グリダニア：旧市街'],
  theForgottenKnight: ["The Forgotten Knight", "Der Vergessene Ritter", "Le Chevalier Oublié", "忘れられた騎士亭"],
  theGoldSaucer: ['The Gold Saucer', 'Gold Saucer', 'Gold Saucer', 'ゴールドソーサー'],
  duty: {
    thePalaceOfTheDead: ['The Palace of the Dead', 'Palast Der Toten', 'Palais Des Morts', '死者の宮殿'],
  }
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
      [
        ['Jonathas', true, true, 'ジョナサス'],
        ['Apkallu Falls', 'Apkallu-Fälle', 'Chutes De L\'Apkallu', 'アプカル滝'],
        locationImage,
        location.oldGridania,
        10.6, 6.3
      ],
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
  fate: (level, fate, loc, x, y, expansion) => {
    return o(
      x && y ? 'fate' : 'fateUnknown',
      [level, fateImage, fate, locationImage, loc, x, y],
      expansion,
      true,
      false
    )
  },
  forumContest: () => {
    return o(
      'forumContest',
      [],
      expansions.ARR,
      false,
      true
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
  itemAccursedHoard: (sack, locationIn, expansion) => {
    return o(
      'itemAccursedHoard',
      [
        sack,
        specialItem.pieceOfAccursedHoard,
        dutyImage,
        locationIn || location.duty.thePalaceOfTheDead
      ],
      expansion || expansions.ARR,
      true,
      false
    )
  },
  itemAnemosLockbox: () => {
    return o(
      'itemAnemosLockbox',
      [
        item.anemosLockbox,
        dutyImage,
        location.eurekaAnemos
      ],
      expansions.SB,
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
module.exports = (barding, achievementsIn, allBardingIn, itemIn, grandCompanyIn) => {
  achievements = achievementsIn;
  allBarding = allBardingIn;
  grandCompany = grandCompanyIn;
  item = itemIn;

  switch (+barding.id) {
    case 1:
    case 5:
    case 9:
      return o(
        'grandCompany',
        [
          [grandCompany.en, grandCompany.de, grandCompany.fr, grandCompany.jp]
        ],
        expansions.ARR,
        true,
        false
      )

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
    
    case 25:
      return helper.craft(
        50,
        locale('Leatherworker'),
        3,
        [
          { quantity: 1, ...craftItem.windCluster },
          { quantity: 2, ...craftItem.earthCluster },
          { quantity: 1, ...craftItem.roseGoldNugget },
          { quantity: 4, ...craftItem.silkThread },
          { quantity: 1, ...craftItem.saurianLeather },
          { quantity: 1, ...craftItem.levinOrb }
        ]
      );

    case 26:
      return helper.achievementReward(1020, expansions.ARR, true, false);

    case 27:
      return [
        helper.eventQuestPurchase(
          ["Shady Smock", "Verführerisch[a] Händlerin", "Vendeuse Suspecte", "いかがわしい売り子"],
          ["All Saints' Wake (2014)", true, true, "守護天節 (2014)"],
          expansions.ARR,
          item
        ),
        helper.mogStation(item)
      ];
    
    case 28:
      return helper.craft(
        50,
        locale('Leatherworker'),
        4,
        [
          { quantity: 2, ...craftItem.windCluster },
          { quantity: 2, ...craftItem.earthCluster },
          { quantity: 1, ...craftItem.cashmereCloth },
          { quantity: 1, ...craftItem.platinumNugget },
          { quantity: 1, ...craftItem.allaganLeather },
          { quantity: 1, ...craftItem.diamondTear }
        ]
      );

    case 29:
      return helper.goldSaucerPrizeExchange(20000, item);
    
    case 30:
      return helper.eventQuest(
        15,
        ["Now That We've Found Love", "Wo Die Liebe Hinfällt", "L'amour Frappe Là Où On Ne L'attend Pas", "ヴァレンティオンデーと愛の始まり"],
        'eq9',
        expansions.ARR
      );
    
    case 31:
      return helper.fate(
        56,
        ["Vedrfolnir Devoteth", "Ehrenduell Mit Dem Weißen", "Défi: Duel Amical Contre Vedrfolnir", "蒼天の白竜「ヴェズルフェルニル」"],
        ["The Churning Mists", "Wallende Nebel", "L'Écume Des Cieux De Dravania", "ドラヴァニア雲海"],
        11, 36,
        expansions.HW
      );
    
    case 32:
      return o(
        'purchase',
        [
          350, centurioSeals, centurioSealsImage,
          ["Ardolain", true, true, "アルドラン"],
          ['(Centurio Seals I)', '(Centurio-Abzeichen I)', '(Insigne Centurio I)', '（セントリオ記章（その他））'],
          locationImage,
          location.theForgottenKnight,
          13, 11,
          item.name
        ],
        expansions.HW,
        true,
        false
      );
    
    case 34:
      return helper.craft(
        60,
        locale('Armorer'),
        1,
        [
          { quantity: 2, ...craftItem.iceCluster },
          { quantity: 1, ...craftItem.earthCluster },
          { quantity: 1, ...craftItem.bismarcksBaleen },
          { quantity: 1, ...craftItem.aurumRegisNugget },
          { quantity: 4, ...craftItem.titaniumIngot },
          { quantity: 2, ...craftItem.hallowedRamieCloth }
        ]
      );
    
    case 35:
      return helper.craft(
        60,
        locale('Armorer'),
        1,
        [
          { quantity: 2, ...craftItem.iceCluster },
          { quantity: 1, ...craftItem.earthCluster },
          { quantity: 1, ...craftItem.ravanasForewing },
          { quantity: 1, ...craftItem.aurumRegisNugget },
          { quantity: 4, ...craftItem.adamantiteNugget },
          { quantity: 2, ...craftItem.dhalmelLeather }
        ]
      );
    
    case 36:
      return helper.forumContest();
    
    case 37:
      return helper.craft(
        56,
        locale('Weaver'),
        0,
        [
          { quantity: 4, ...craftItem.windCrystal },
          { quantity: 5, ...craftItem.lightningCrystal },
          { quantity: 1, ...craftItem.electrumIngot },
          { quantity: 2, ...craftItem.larimar },
          { quantity: 1, ...craftItem.dhalmelLeather },
          { quantity: 4, ...craftItem.ramieCloth }
        ]
      );
    
    case 38:
      return helper.craft(
        40,
        locale("Leatherworker"),
        0,
        [
          { quantity: 4, ...craftItem.windShard },
          { quantity: 5, ...craftItem.earthShard },
          { quantity: 2, ...craftItem.undyedWoolenCloth },
          { quantity: 3, ...craftItem.woolenYarn },
          { quantity: 1, ...craftItem.elmLumber },
          { quantity: 2, ...craftItem.blueFoxHide },
        ]
      );
    
    case 39:
      return [
        helper.veteranReward(960),
        helper.achievementCertificate(3)
      ];
    
    case 40:
      return o(
        'purchase',
        [
          15, heavensWardHelmFragment, heavensWardHelmFragmentImage,
          ["Bertana", true, true, "ベルタナ"],
          ["(Primal Gear II)", "(Primae-Ausrüstung II)", "(Armes De Primordiaux (2))", "(蛮神装備の取引（その2）)"],
          locationImage,
          location.idyllshire,
          5.8, 5.2,
          item.name
        ],
        expansions.HW,
        true,
        false
      );
    
    case 41:
      return helper.craft(
        60,
        locale("Leatherworker"),
        2,
        [
          { quantity: 2, ...craftItem.windCluster },
          { quantity: 2, ...craftItem.earthCluster },
          { quantity: 2, ...craftItem.starRuby },
          { quantity: 1, ...craftItem.starSapphire },
          { quantity: 1, ...craftItem.sephirotSap },
          { quantity: 4, ...craftItem.dinosaurLeather },
        ]
      );
    
    case 42:
      return helper.eventQuest(
        15,
        ["Eggsaltation Of A Lark", "Ein Goldener Schatz", "La Prœufétie De Jihli", "エッグハントと黄金の宝物"],
        'eq7',
        expansions.ARR
      );
    
    case 43:
    case 46:
    case 50:
    case 51:
    case 57:
    case 58:
      return helper.mogStation(item);
    
    case 44:
      return helper.achievementReward(1512, expansions.ARR, true, false);
    
    case 45:
      return helper.craft(
        60,
        locale("Leatherworker"),
        3,
        [
          { quantity: 2, ...craftItem.windCluster },
          { quantity: 3, ...craftItem.earthCluster },
          { quantity: 1, ...craftItem.eikonIronIngot },
          { quantity: 4, ...craftItem.eikonLeather },
          { quantity: 1, ...craftItem.griffinLeatherStrap },
          { quantity: 2, ...craftItem.beastkinHorn },
          { quantity: 3, ...craftItem.nidhoggsScale },
        ]
      );
    
    case 47:
      return helper.craft(
        60,
        locale("Goldsmith"),
        4,
        [
          { quantity: 3, ...craftItem.fireCluster },
          { quantity: 3, ...craftItem.windCluster },
          { quantity: 3, ...craftItem.goldIngot },
          { quantity: 2, ...craftItem.cashmereCloth },
          { quantity: 1, ...craftItem.scintillantIngot },
          { quantity: 1, ...craftItem.sophicBeadFragment },
        ]
      );
    
    case 48:
      return [
        helper.itemAccursedHoard(specialItem.silverTrimmedSack),
        helper.itemAccursedHoard(specialItem.goldTrimmedSack)
      ];
    
    case 49:
      return helper.goldSaucerPrizeExchange(150000, item);
    
    case 52:
      return helper.craft(
        60,
        locale("Armorer"),
        4,
        [
          { quantity: 3, ...craftItem.iceCluster },
          { quantity: 3, ...craftItem.earthCluster },
          { quantity: 1, ...craftItem.griffinLeatherStrap },
          { quantity: 3, ...craftItem.heavyMetalIngot },
          { quantity: 1, ...craftItem.hemicyonLeather },
          { quantity: 1, ...craftItem.zurvaniteCarapaceFragment },
        ]
      );
    
    case 53:
      return helper.craft(
        70,
        locale("Armorer"),
        1,
        [
          { quantity: 2, ...craftItem.iceCluster },
          { quantity: 1, ...craftItem.earthCluster },
          { quantity: 1, ...craftItem.bladeOfRevelry },
          { quantity: 3, ...craftItem.molybdenumIngot },
          { quantity: 2, ...craftItem.kyanite },
          { quantity: 3, ...craftItem.halgaiMane },
          { quantity: 1, ...craftItem.gazelleLeather },
        ]
      );
    
    case 54:
      return helper.fate(
        68,
        ["Rattle And Humbaba", "Hunba, Hunba, Hunba, Tätärä!", "Défi: L'affreux Humbaba", "豪腕の襲撃者「フンババ」"],
        ["The Peaks", "Die Zinnen", "Les Pics", "ギラバニア山岳地帯"],
        15.5, 30.5,
        expansions.SB
      );

    case 55:
      return helper.craft(
        70,
        locale("Goldsmith"),
        1,
        [
          { quantity: 1, ...craftItem.fireCluster },
          { quantity: 2, ...craftItem.windCluster },
          { quantity: 1, ...craftItem.blissfulShroud },
          { quantity: 2, ...craftItem.palladiumNugget },
          { quantity: 2, ...craftItem.azurite },
          { quantity: 2, ...craftItem.twinsilk },
          { quantity: 1, ...craftItem.twinthread },
        ]
      );
    
    case 56:
      return o(
        'purchase',
        [
          4, veteransClanMarkLog, veteransClanMarkLogImage,
          ["Eschina", true, true, "エシナ"],
          ["(Wondrous Sundries)", "(Gegenstände)", "(Objets)", "（アイテムの取引）"],
          locationImage,
          ["Rhalgr's Reach", "Rhalgrs Wacht", "L'Étendue De Rhalgr", "ラールガーズリーチ"],
          13.9, 11.8,
          item.name
        ],
        expansions.HW,
        true,
        false
      );
    
    case 59:
      return helper.craft(
        70,
        locale("Armorer"),
        2,
        [
          { quantity: 2, ...craftItem.iceCluster },
          { quantity: 2, ...craftItem.earthCluster },
          { quantity: 1, ...craftItem.palladiumNugget },
          { quantity: 2, ...craftItem.molybdenumIngot },
          { quantity: 2, ...craftItem.chromiteIngot },
          { quantity: 1, ...craftItem.gazelleLeather },
          { quantity: 1, ...craftItem.shinryusScales },
        ]
      )

    case 60:
      return o(
        'purchase',
        [
          5, ixionHorn, ixionHornImage,
          ["Eschina", true, true, "エシナ"],
          ["(Wondrous Sundries)", "(Gegenstände)", "(Objets)", "（アイテムの取引）"],
          locationImage,
          ["Rhalgr's Reach", "Rhalgrs Wacht", "L'Étendue De Rhalgr", "ラールガーズリーチ"],
          13.9, 11.8
        ],
        expansions.SB,
        true,
        false
      );
    
    case 61:
      return helper.itemAnemosLockbox();
    
    case 62:
      return helper.craft(
        70,
        locale("Goldsmith"),
        3,
        [
          { quantity: 2, ...craftItem.fireCluster },
          { quantity: 2, ...craftItem.windCluster },
          { quantity: 1, ...craftItem.palladiumIngot },
          { quantity: 3, ...craftItem.chromiteIngot },
          { quantity: 1, ...craftItem.tigerLeather },
          { quantity: 1, ...craftItem.byakkosMane },
        ]
      )

    case 63:
      return o(
        'purchase',
        [
          1650, ["Yellow Gatherers' Scrip", "Gelber Sammlerschein", "Assignat jaune de récolteur", "ギャザラースクリップ:黄貨"], 'ygs',
          ["Scrip Exchange", "Scheinewechslerin", "Comptable Des Assignats", "スクリップ取引窓口"],
          ["(Yellow Gatherers' Scrip Exchange (Lv. 70 Items))", "(Gelbe Sammlerscheine (ab St. 70, Anderes))", "(Assignats Jaunes De Récolteur (divers/Nv 70))", "(ギャザラースクリップ:黄貨の取引（Lv70向け・その他）)"],
          locationImage,
          ["Rhalgr's Reach", "Rhalgrs Wacht", "L'Étendue De Rhalgr", "ラールガーズリーチ"],
          9.9, 12.5
        ],
        expansions.SB,
        true,
        false
      );
    
    case 64:
      return helper.craft(
        70,
        locale("Weaver"),
        3,
        [
          { quantity: 2, ...craftItem.windCluster },
          { quantity: 2, ...craftItem.lightningCluster },
          { quantity: 1, ...craftItem.tigerLeather },
          { quantity: 1, ...craftItem.silvergraceIngot },
          { quantity: 3, ...craftItem.trueLinen },
          { quantity: 1, ...craftItem.celestialKimonoRemnant },
        ]
      )

    default:
      console.log("Unknown method for barding " + barding.id);
      return null;
  }
}