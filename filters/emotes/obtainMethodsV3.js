const o = require('../_obtainMethods');
const getAchievement = require('../_getAchievement');
const locale = require('../_locale');

let achievements;

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

const rank = {
  sworn: ['Sworn', 'Solidarisch', 'Assermenté', '誓約'],
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

const item = {
  anemosLockbox: ["Anemos Lockbox", "Anemos-Schließkassette", "Coffre verrouillé d'Anemos", "アネモス帯のロックボックス"],
  bronzeTrimmedSack: ['Bronze-trimmed Sack', 'Gefundener Schatz I', 'Trésor mystérieux de grade I', '埋もれた財宝G1'],
  elixir: ['Elixir', 'Elixier', 'Élixir', 'エリクサー'],
  hiElixir: ['Hi-Elixir', 'Super-Elixier', 'Super élixir', 'ハイエリクサー'],
  ironTrimmedSack: ["Iron-trimmed Sack", "Gefundener Schatz II", "Trésor mystérieux de grade II", "埋もれた財宝G2"],
  pieceOfAccursedHoard: ['piece of the Accursed Hoard', 'verborgenen Schatz', 'trésor caché', '埋もれた財宝'],
  bait: {
    bruteLeech: ["Brute Leech", "Grobegel", "Sangsue bestiale", "ブルートリーチ"],
    lugworm: ["Lugworm", "Wattwurm", "Ver de vase", "ラグワーム"],
    northernKrill: ['Northern Krill', 'Nordkrill', 'Krill polaire', 'ポーラークリル'],
    topwaterFrog: ['Topwater Frog', 'Schwimmfrosch', 'Grenouille sèche', 'トップウォーターフロッグ']
  },
  fish: {
    assassinBetta: ["Assassin Betta", "Kampffisch", "Betta assassin", "アサシンベタ"],
    bashfulBatfish: ["Bashful Batfish", "Fledermausfisch", "Platax ombré", "アカククリ"],
    merlthorGoby: ["Merlthor Goby", "Merlthor-Grundel", "Gobie de Merlthor", "メルトールゴビー"],
    ninjaBetta: ["Ninja Betta", "Ninja-Kampffisch", "Betta ninja", "ニンジャベタ"],
    wahoo: ["Wahoo", "Räubermakrele", "Thazard noir", "ワフー"]
  },
  seeds: {
    eggplantKnight: ['Eggplant Knight Seeds', 'Ritter-Aubergine-Samen', 'Graines du Chevalier aubergine', 'エッグナイトの種'],
    garlicJester: ['Garlic Jester Seeds', 'Sir-Knoblauch-Samen', 'Graines du Baron ail', 'ガーリックスターの種'],
    mandragoraQueen: ['Mandragora Queen Seeds', 'Königin-Mandragora-Samen', 'Graines de la Reine mandragore', 'マンドラクイーンの種'],
    onionPrince: ['Onion Prince Seeds', 'Prinz-Zwiebel-Samen', 'Graines du Prince oignon', 'オニオンプリンスの種'],
    tomatoKing: ['Tomato King Seeds', 'König-Tomate-Samen', 'Graines du Roi tomate', 'キングトマトの種']
  }
}

const craftItem = {
  allaganCatalyst: {
    icon: 9376,
    name: ["Allagan Catalyst", "Allagischer Katalysator", "Catalyseur allagois", "アラグの魔触媒"]
  },
  ancientLumber: {
    icon: 7606,
    name: ['Ancient Lumber', 'Götterholz', 'Madrier de morta', '神代木']
  },
  apkalluDown: {
    icon: 5348,
    name: ['Apkallu Down', 'Apkallu-Daunen', 'Duvet d\'apkallu', 'アプカルの綿毛']
  },
  arachneWeb: {
    icon: 9367,
    name: ['Arachne Web', 'Arachne-Netz', 'Toile d\'Arachne', 'アラクネウェブ']
  },
  astralRock: {
    icon: 5158,
    name: ['Astral Rock', 'Astralgestein', 'Roche astrale', '星性岩']
  },
  atomosCorpulence: {
    icon: 12647,
    name: ["Atomos Corpulence", "Atomos-Fett", "Chair d'Atomos", "アトモスの肉片"]
  },
  birchLumber: {
    icon: 12583,
    name: ["Birch Lumber", "Birken-Bauholz", "Madrier de bouleau", "バーチ材"]
  },
  bladeOfRevelry: {
    icon: 19123,
    name: ["Blade of Revelry", "Verspielte Klinge", "Lame de Susano", "豪神スサノオの刃"]
  },
  blissfulShroud: {
    icon: 19124,
    name: ["Blissful Shroud", "Gepflegtes Tuch", "Étole de Lakshmi", "美神ラクシュミの羽衣"]
  },
  bloodPepper: {
    icon: 13754,
    name: ["Blood Pepper", "Blutpfeffer", "Piment sanglant", "ブラッドペッパー"]
  },
  broombush: {
    icon: 7776,
    name: ['Broombush', 'Ginsterstrauch', 'Genêt', 'ホウキグサ']
  },
  byakkosMane: {
    icon: 22307,
    name: ["Byakko's Mane", "Byakko-Mäne", "Crinière du Tigre blanc", "白虎のタテガミ"]
  },
  cashmereCloth: {
    icon: 7609,
    name: ['Cashmere Cloth', 'Kaschmir', 'Étoffe de cachemire', 'カシミヤ織物']
  },
  chimericalFelt: {
    icon: 12592,
    name: ["Chimerical Felt", "Chimärenfilz", "Étoffe de feutre chimérique", "キマイラフェルト"]
  },
  chocoboFeather: {
    icon: 5359,
    name: ['Chocobo Feather', 'Chocobo-Feder', 'Plume de chocobo', 'チョコボの羽根']
  },
  chromiteIngot: {
    icon: 19949,
    name: ["Chromite Ingot", "Chromeisen-Barren", "Lingot de chromite", "クロマイトインゴット"]
  },
  colossusSlab: {
    icon: 22442,
    name: ["Colossus Slab", "Kolossus-Platte", "Fragment de statue colossale", "巨像の欠片"]
  },
  cottonBoll: {
    icon: 5343,
    name: ['Cotton Boll', 'Baumwoll-Samenkapsel', 'Fleur de coton', '草綿']
  },
  crawlerSilk: {
    icon: 12596,
    name: ["Crawler Silk", "Kriecher-Seidengarn", "Fil de soie de chenille", "クロウラーの絹糸"]
  },
  darksteelNugget: {
    icon: 5061,
    name: ['Darksteel Nugget', 'Dunkelstahl-Nugget', 'Pépite de sombracier', 'ダークスチールナゲット']
  },
  dawnborneAethersand: {
    icon: 12937,
    name: ["Dawnborne Aethersand", "Morgengrauen-Seelensand", "Sable éthéréen de l'aurore", "暁光の霊砂"]
  },
  dotharliCloth: {
    icon: 23372,
    name: ["Dotharli Cloth", "Dotharl-Tuch", "Étoffe dotharl", "ドタール族の生地"]
  },
  dragonBlood: {
    icon: 12630,
    name: ["Dragon Blood", "Drachenblut", "Sang de dragon", "竜族の血"]
  },
  earthCrystal: {
    icon: 11,
    name: ["Earth Crystal", "Erdkristall", "Cristal de terre", "アースクリスタル"]
  },
  earthShard: {
    icon: 5,
    name: ["Earth Shard", "Erdscherbe", "Éclat de terre", "アースシャード"]
  },
  expanseBaleen: {
    icon: 12257,
    name: ["Expanse Baleen", "Himmels-Barte", "Corne du Migrateur des brumes", "雲神ビスマルクの角"]
  },
  fireCrystal: {
    icon: 8,
    name: ["Fire Crystal", "Feuerkristall", "Cristal de feu", "ファイアクリスタル"]
  },
  fireShard: {
    icon: 2,
    name: ['Fire Shard', 'Feuerscherbe', 'Éclat de feu', 'ファイアシャード']
  },
  garleanFiber: {
    icon: 5340,
    name: ['Garlean Fiber', 'Garleischer Faserstoff', 'Fibre impériale', '帝国製強化繊維']
  },
  garleanRubber: {
    icon: 5533,
    name: ['Garlean Rubber', 'Garleischer Gummi', 'Caoutchouc impérial', '帝国製ラバー材']
  },
  garleanSteelJoint: {
    icon: 5104,
    name: ['Garlean Steel Joint', 'Garleisches Leichtmetall-Verbindungsstück', 'Morceau d\'acier léger impérial', '帝国製軽金属片']
  },
  garleanSteelPlate: {
    icon: 5105,
    name: ['Garlean Steel Plate', 'Garleische Leichtmetall-Platte', 'Plaque d\'acier léger impérial', '帝国製軽金属板']
  },
  garudasFeather: {
    icon: 6160,
    name: ["Garuda's Feather", "Garuda-Feder", "Plume de Garuda", "ガルーダの羽根"]
  },
  gelatoFlesh: {
    icon: 12635,
    name: ["Gelato Flesh", "Gelato-Fleisch", "Viande de gelato", "ジェラートの肉"]
  },
  glazenut: {
    icon: 7775,
    name: ['Glazenut', 'Glanznuss', 'Noix luisante', 'グレイズナッツ']
  },
  gobwalkerShielding: {
    icon: 12652,
    name: ["Gobwalker Shielding", "Stampfer-Rüstungsteil", "Blindage de gobtank G-VII", "VII号ゴブリ鋼板"]
  },
  growthFormulaZeta: {
    icon: 12608,
    name: ["Growth Formula Zeta", "Wachstumsformel Zeta", "Formule de croissance zêta", "グロースフォーミュラ・ゼータ"]
  },
  hiveForewing: {
    icon: 12259,
    name: ["Hive Forewing", "Kolonie-Schwinge", "Aile du Maître des lames", "武神ラーヴァナの翅"]
  },
  iceShard: {
    icon: 3,
    name: ['Ice Shard', 'Eisscherbe', 'Éclat de glace', 'アイスシャード']
  },
  iceTear: {
    icon: 9377,
    name: ["Ice Tear", "Eisträne", "Larme de Shiva", "シヴァの涙"]
  },
  ifritsHorn: {
    icon: 6158,
    name: ["Ifrit's Horn", "Ifrit-Horn", "Corne d'Ifrit", "イフリートの角"]
  },
  ironGiantCore: {
    icon: 13003,
    name: ["Iron Giant Core", "Eisengiganten-Kern", "Cœur de géant d'acier", "鉄巨人のコア"]
  },
  ironGiantScrap: {
    icon: 12651,
    name: ["Iron Giant Scrap", "Eisengiganten-Überreste", "Débris de colosse", "鉄巨人の残骸"]
  },
  juteYarn: {
    icon: 7777,
    name: ['Jute Yarn', 'Jutegarn', 'Toile de jute', 'ジュート繊維']
  },
  kyanite: {
    icon: 19963,
    name: ["Kyanite", "Kyanit", "Disthène", "カイヤナイト"]
  },
  leviathansBarb: {
    icon: 7159,
    name: ["Leviathan's Barb", "Bartel Leviathans", "Barbillon de Léviathan", "リヴァイアサンの棘"]
  },
  levinOrb: {
    icon: 8019,
    name: ["Levin Orb", "Ramuh-Kugel", "Orbe de Ramuh", "ラムウのオーブ"]
  },
  lightningCrystal: {
    icon: 12,
    name: ["Lightning Crystal", "Blitzkristall", "Cristal de foudre", "ライトニングクリスタル"]
  },
  lightningShard: {
    icon: 6,
    name: ['Lightning Shard', 'Blitzscherbe', 'Éclat de foudre', 'ライトニングシャード']
  },
  oroniriCloth: {
    icon: 23371,
    name: ["Oroniri Cloth", "Oronir-Tuch", "Étoffe oronir", "オロニル族の生地"]
  },
  palladiumNugget: {
    icon: 19946,
    name: ["Palladium Nugget", "Palladium-Nugget", "Pépite de palladium", "パラースナゲット"]
  },
  rosewoodBranch: {
    icon: 5414,
    name: ['Rosewood Branch', 'Palisanderast', 'Branche de palissandre', 'ローズウッドの枝']
  },
  royalFern: {
    icon: 20793,
    name: ["Royal Fern", "Königsfarn", "Fougère royale", "マナゼンマイ"]
  },
  sewingThread: {
    icon: 14188,
    name: ["Sewing Thread", "Nähfaden", "Fil à coudre", "刺繍糸"]
  },
  shinryusScales: {
    icon: 21090,
    name: ["Shinryu's Scales", "Shinryu-Schuppe", "Écaille de Shinryu", "神龍の鱗"]
  },
  steelMainspring: {
    icon: 12648,
    name: ["Steel Mainspring", "Stahl-Triebfeder", "Ressort moteur en acier", "ゼンマイバネ"]
  },
  steelWheelBearing: {
    icon: 12649,
    name: ["Steel Wheel Bearing", "Stahl-Radlager", "Roulement de roue en acier", "ホイールベアリング"]
  },
  steppeSerge: {
    icon: 19983,
    name: ["Steppe Serge", "Steppen-Serge", "Étoffe de serge des steppes", "ステップサージ"]
  },
  stuffedGoblin: {
    icon: 7966,
    name: ["Stuffed Goblin", "Stoff-Goblin", "Gobelin en peluche", "ゴブリンのぬいぐるみ"]
  },
  titaniumIngot: {
    icon: 12525,
    name: ["Titanium Ingot", "Titan-Barren", "Lingot de titane", "チタンインゴット"]
  },
  titansHeart: {
    icon: 6162,
    name: ["Titan's Heart", "Herz des Titan", "Roc de Titan", "タイタンの岩塊"]
  },
  twinsilk: {
    icon: 19987,
    name: ["Twinsilk", "Doppelseide", "Étoffe de doublesoie", "玉糸紬"]
  },
  twinthread: {
    icon: 5330,
    name: ['Twinthread', 'Doppelfaden', 'Fil de doublesoie', '玉糸']
  },
  undyedCottonCloth: {
    icon: 5325,
    name: ['Undyed Cotton Cloth', 'Naturbelassene Baumwolle', 'Étoffe de coton', '綿布']
  },
  vanyaSilk: {
    icon: 19988,
    name: ['Vanya Silk', 'Vanya-Seidenstoff', 'Étoffe de soie vanya', '山繭絹布']
  },
  waterShard: {
    icon: 7,
    name: ["Water Shard", "Wasserscherbe", "Éclat d'eau", "ウォーターシャード"]
  },
  windCrystal: {
    icon: 10,
    name: ["Wind Crystal", "Windkristall", "Cristal de vent", "ウィンドクリスタル"]
  },
  windShard: {
    icon: 4,
    name: ['Wind Shard', 'Windscherbe', 'Éclat de vent', 'ウィンドシャード']
  },
  wootzIngot: {
    icon: 9358,
    name: ['Wootz Ingot', 'Wootz-Barren', 'Lingot de wootz', 'ウーツインゴット']
  },
  worstedYarn: {
    icon: 19984,
    name: ["Worsted Yarn", "Kammgarn", "Laine peignée", "梳毛糸"]
  }
}

const location = {
  apkalluFalls: ['Apkallu Falls', 'Apkallu-Fälle', 'Chutes De L\'Apkallu', 'アプカル滝'],
  azysLla: ["Azys Lla", true, true, "アジス・ラー"],
  chamber5: ['5th Chamber', 'Fünfte Kammer', 'Cinquième Salle', '第五区画'],
  coerthasCentralHighlands: ['Coerthas Central Highlands', 'Zentrales Hochland Von Coerthas', 'Hautes Terres Du Coerthas Central', 'クルザス中央高地'],
  coerthasWesternHighlands: ["Coerthas Western Highlands", "Westliches Hochland Von Coerthas", "Hautes Terres Du Coerthas Occidental", "クルザス西部高地"],
  commandRoom: ['Command Room', 'Admiralsbrücke', 'Salon De L\'Amiral', 'アドミラルブリッジ：提督室'],
  dhoroIloh: ["Dhoro Iloh", true, true, "ドーロ・イロー"],
  easternLaNoscea: ['Eastern La Noscea', 'Östliches La Noscea', 'Noscea Orientale', '東ラノシア'],
  easternThanalan: ['Eastern Thanalan', 'Östliches Thanalan', 'Thanalan Oriental', '東ザナラーン'],
  eastShroud: ['East Shroud', 'Ostwald', 'Forêt De L\'est', '黒衣森：東部森林'],
  eurekaAnemos: ["Eureka Anemos", "Eureka Anemos", "Eurêka Anemos", "エウレカ：アネモス帯"],
  fogfens: ["Fogfens", "Nebelmoor", "Fangebrume", "迷霧湿原"],
  foundation: ["Foundation", "Fundamente", "Ishgard - L'Assise", "イシュガルド：下層"],
  idyllshire: ["Idyllshire", "Frohehalde", "Idyllée", "イディルシャイア"],
  kugane:  ["Kugane", true, true, "クガネ"],
  limsaLowerDecks: ['Limsa Lominsa Lower Decks', 'Untere Decks', 'Limsa Lominsa - L\'Entrepont', 'リムサ・ロミンサ：下甲板層'],
  limsaUpperDecks: ['Limsa Lominsa Upper Decks', 'Obere Decks', 'Limsa Lominsa - Le Tillac', 'リムサ・ロミンサ：上甲板層'],
  lotusStand: ['Lotus Stand', 'Wasserrosentisch', 'Chaire Du Lotus', '不語仙の座卓'],
  lowerLaNoscea: ['Lower La Noscea', 'Unteres La Noscea', 'Basse-Noscea', '低地ラノシア'],
  matoyasCave: ["Matoya's Cave", "Matoyas Höhle", "Caverne De Matoya", "マトーヤの洞窟"],
  morDhona: ['Mor Dhona', true, true, 'モードゥナ'],
  newGridania: ['New Gridania', 'Neu-Gridania', 'Nouvelle Gridania', 'グリダニア：新市街'],
  northShroud: ['North Shroud', 'Nordwald', 'Forêt Du Nord', '黒衣森：北部森林'],
  northernThanalan: ['Northern Thanalan', 'Nördliches Thanalan', 'Thanalan Septentrional', '北ザナラーン'],
  oldGridania: ['Old Gridania', 'Alt-Gridania', 'Vieille Gridania', 'グリダニア：旧市街'],
  outerLaNoscea: ['Outer La Noscea', 'Äußeres La Noscea', 'Noscea Extérieure', '地ラノシア'],
  rhalgrsReach: ["Rhalgr's Reach", "Rhalgrs Wacht", "Temple Du Poing (entrée)", "ラールガーズリーチ"],
  southShroud: ['South Shroud', 'Südwald', 'Forêt Du Sud', '黒衣森：南部森林'],
  southernThanalan: ['Southern Thanalan', 'Südliches Thanalan', 'Thanalan Méridional', '南ザナラーン'],
  theChurningMists: ["The Churning Mists", "Wallende Nebel", "L'Écume Des Cieux De Dravania", "ドラヴァニア雲海"],
  theDiadem: ['The Diadem', 'Das Diadem', 'Le Diadème', 'ディアデム諸島'],
  theDravanianForelands: ["The Dravanian Forelands", "Dravanisches Vorland", "Avant-pays Dravanien", "高地ドラヴァニア"],
  theForgottenKnight: ["The Forgotten Knight", "Der Vergessene Ritter", "Le Chevalier Oublié", "忘れられた騎士亭"],
  theFringes: ["The Fringes", "Abanisches Grenzland", "Les Marges", "ギラバニア辺境地帯"],
  theGoldSaucer: ['The Gold Saucer', 'Gold Saucer', 'Gold Saucer', 'ゴールドソーサー'],
  thePillars: ["The Pillars", "Strebewerk", "Ishgard - Les Contreforts", "イシュガルド：上層"],
  theRisingStones: ["The Rising Stones", "Sonnenstein", "Refuge Des Roches", "石の家"],
  theRubySea: ["The Ruby Sea", "Rubinsee", "Mer De Rubis", "紅玉海"],
  theSeaOfClouds: ["The Sea Of Clouds", "Abalathisches Wolkenmeer", "L'Écume Des Cieux D'Abalathia", "アバラシア雲海"],
  theWolvesDen: ['The Wolves\' Den', 'Wolfshöhle', 'L\'Antre des loups', 'ウルヴズジェイル'],
  uldahStepsOfNald: ['Ul\'dah - Steps of Nald', 'Nald-Kreuzgang', 'Ul\'dah - Faubourg de Nald', 'ウルダハ：ナル回廊'],
  uldahStepsOfThal: ['Ul\'dah - Steps of Thal', 'Thal-Kreuzgang', 'Ul\'dah - Faubourg De Thal', 'ウルダハ：ザル回廊'],
  upperLaNoscea: ['Upper La Noscea', 'Oberes La Noscea', 'Haute-Noscea', '高地ラノシア'],
  westernLaNoscea: ['Western La Noscea', 'Westilches La Noscea', 'Noscea Occidentale', '西ラノシア'],
  duty: {
    alexanderBurdenOfTheSonSavage: ["Alexander - The Burden Of The Son (Savage)", "Alexander - Last Des Sohnes (episch)", "Alexander - Le Fardeau Du Fils (sadique)", "機工城アレキサンダー零式：律動編4"],
    alexanderSoulOfTheCreator: ["Alexander - The Soul Of The Creator", "Alexander - Seele Des Schöpfers", "Alexander - L'Âme Du Créateur", "機工城アレキサンダー：天動編4"],
    alexanderTheSoulOfTheCreatorSavage: ["Alexander - The Soul Of The Creator (Savage)", "Alexander - Seele Des Schöpfers (episch)", "Alexander - L'Âme Du Créateur (sadique)", "機工城アレキサンダー零式：天動編4"],
    amdaporKeep: ['Amdapor Keep', 'Die Ruinen Von Amdapor', 'Le Château D\'Amdapor', '邪教排撃 古城アムダプール'],
    baelsarsWall: ["Baelsar's Wall", "Baelsar-Wall", "La Muraille De Baelsar", "巨大防壁 バエサルの長城"],
    bardamsMettle: ["Bardam's Mettle", "Bardams Probe", "La Force De Bardam", "伝統試練 バルダム覇道"],
    battleInTheBigKeep: ["Battle In The Big Keep", "Revanche In Den Ruinen", "Revanche Au Vieux Château", "真ギルガメッシュ討滅戦"],
    brayfloxsLongstopHard: ['Brayflox\'s Longstop (Hard)', 'Brüllvolx\' Langrast (schwer)', 'Le Bivouac De Brayflox (brutal)', '盟友支援 ブレイフロクスの野営地 (Hard)'],
    castrumAbania: ["Castrum Abania", "Castrum Abania", "Castrum Abania", "巨砲要塞 カストルム・アバニア"],
    copperbellMinesHard: ['Copperbell Mines (Hard)', 'Kupferglocken-Mine (schwer)', 'Les Mines De Clochecuivre (brutal)', '騒乱坑道 カッパーベル銅山 (Hard)'],
    deltascapev40: ["Deltascape V4.0", "Deltametrie 4.0", "Deltastice V4.0", "次元の狭間オメガ：デルタ編4"],
    deltascapev40Savage: ["Deltascape V4.0 (Savage)", "Deltametrie 4.0 (episch)", "Deltastice V4.0 (sadique)", "次元の狭間オメガ零式：デルタ編4"],
    domaCastle: ["Doma Castle", "Burg Doma", "Le Château De Doma", "解放決戦 ドマ城"],
    dunScaith: ["Dun Scaith", true, true, "影の国ダン・スカー"],
    hellsLid: ["Hells' Lid", "Höllenspund", "Le Couvercle Des Enfers", "紅玉火山 獄之蓋"],
    hullbreakerIsle: ['Hullbreaker Isle', 'Schiffbrecher-Insel', 'L\'Île De Crèvecarène', '財宝伝説 ハルブレーカー・アイル'],
    hullbreakerIsleHard: ["Hullbreaker Isle (Hard)", "Schiffbrecher-Insel (schwer)", "L'Île De Crèvecarène (brutal)", "黒渦伝説 ハルブレーカー・アイル (Hard)"],
    kuganeCastle: ["Kugane Castle", "Schloss Kugane", "Le Château De Kugane", "悪党成敗 クガネ城"],
    neverreap: ["Neverreap", "Nimmerreich", "Nalloncques", "神域浮島 ネバーリープ"],
    sastashaHard: ['Sastasha (Hard)', 'Sastasha (schwer)', 'Sastasha (brutal)', '逆襲要害 サスタシャ浸食洞 (Hard)'],
    sohmAl: ["Sohm Al", "Sohm Al", "Sohm Al", "霊峰踏破 ソーム・アル"],
    saintMociannesArboretum: ["Saint Mocianne's Arboretum", "Sankt Mocianne-Arboretum", "L'Arboretum Sainte-Mocianne", "草木庭園 聖モシャーヌ植物園"],
    shisuiOfTheVioletTides: ["Shisui Of The Violet Tides", "Shisui", "Le Palais Aux Marées Violettes", "海底宮殿 紫水宮"],
    sigmascapev40: ["Sigmascape V4.0", "Sigmametrie 4.0", "Sigmastice V4.0", "次元の狭間オメガ：シグマ編4"],
    sigmascapev40Savage: ["Sigmascape V4.0 (Savage)", "Sigmametrie 4.0 (episch)", "Sigmastice V4.0 (sadique)", "次元の狭間オメガ零式：シグマ編4"],
    syrcusTower: ['Syrcus Tower', 'Kristallturm - Der Syrcus-Turm', 'La Tour De Cristal - Tour De Syrcus', 'クリスタルタワー：シルクスの塔'],
    theAery: ["The Aery", "Nest Des Drachen", "L'Aire", "邪竜血戦 ドラゴンズエアリー"],
    theAurumVale: ['The Aurum Vale', 'Goldklamm', 'Le Val D\'Aurum', '霧中行軍 オーラムヴェイル'],
    theAquapolis: ['The Aquapolis', 'Aquapolis', 'L\'Aquapole', '宝物庫 アクアポリス'],
    theAntitower: ["The Antitower", "Antiturm", "L'Antitour", "星海観測 逆さの塔"],
    theDragonsNeck: ["The Dragon's Neck", "Das Drachenhals-Kolosseum", "Le Col Du Dragon", "アマジナ杯闘技会決勝戦"],
    theDrownedCityOfSkalla: ["The Drowned City Of Skalla", "Die Versunkene Stadt Skalla", "La Cité Engloutie De Skalla", "水没遺構 スカラ"],
    theFeast: ["The Feast", true, true, "ザ・フィースト"],
    theFractalContinuum: ["The Fractal Continuum", "Die Fraktal-Kontinuum", "Le Continuum Fractal", "博物戦艦 フラクタル・コンティニアム"],
    theGreatGubalLibrary: ["The Great Gubal Library", "Große Gubal-Bibliothek", "La Grande Bibliothèque De Gubal", "禁書回収 グブラ幻想図書館"],
    theHiddenCanalsOfUznair: ["The Hidden Canals Of Uznair", "Vergessene Kanäle Von Uznair", "Les Canaux Cachés D'Uznair", "宝物庫 ウズネアカナル深層"],
    theLostCityOfAmdaporHard: ["The Lost City Of Amdapor (Hard)", "Historisches Amdapor (schwer)", "Les Vestiges De La Cité D'Amdapor (brutal)", "神聖遺跡 古アムダプール市街 (Hard)"],
    thePalaceOfTheDead: ['The Palace of the Dead', 'Palast Der Toten', 'Palais Des Morts', '死者の宮殿'],
    theRidoranaLighthouse: ["The Ridorana Lighthouse", "Richtfeuer Von Ridorana", "Le Phare De Ridorana", "封じられた聖塔 リドルアナ"],
    theSirensongSea: ["The Sirensong Sea", "Sirenen-See", "La Mer Du Chant Des Sirènes", "漂流海域 セイレーン海"],
    theSunkenTempleOfQarnHard: ['The Sunken Temple of Qarn (Hard)', 'Versunkener Tempel Von Qarn (schwer)', 'Le Temple Enseveli De Qarn (brutal)', '遺跡救援 カルン埋没寺院 (Hard)'],
    theSwallowsCompass: ["The Swallow's Compass", "Kompass Der Schwalbe", "Le Compas De L'Hirondelle", "風水霊殿 ガンエン廟"],
    theTempleOfTheFist: ["The Temple Of The Fist", "Tempel Der Faust", "Le Temple Du Poing", "壊神修行 星導山寺院"],
    theVault: ["The Vault", "Erzbasilika", "La Voûte", "強硬突入 イシュガルド教皇庁"],
    theVoidArk: ["The Void Ark", "Die Nichts-Arche", "L'Arche Du Néant", "魔航船ヴォイドアーク"],
    theWanderersPalace: ['The Wanderer\'s Palace', 'Palast Des Wanderers', 'Le Palais Du Vagabond', '旅神聖域 ワンダラーパレス'],
    theWeepingCityOfMhach: ["The Weeping City Of Mhach", "Die Stadt Der Tränen", "La Cité Défendue De Mhach", "禁忌都市マハ"],
    theWorldOfDarkness: ['The World Of Darkness', 'Die Welt Der Dunkelheit', 'La Tour De Cristal - Monde Des Ténèbres', 'クリスタルタワー：闇の世界'],
    xelphatol: ["Xelphatol", "Xelphatol", "Xelphatol", "峻厳渓谷 ゼルファトル"]
  },
  fishing: {
    northIsleOfEndlessSummer: ["North Isle Of Endless Summer", "Insel Des Ewigen Sommers (Nord)", "Île De L'Éternel été (nord)", "常夏の島北"],
    southBanepool: ["South Banepool", "Südlicher Bannpfuhl", "Malétang (berge Sud)", "ベーンプール南"],
    theBurningWall: ['The Burning Wall', 'Der Feuerwall', 'Mur Incandescent', 'バーニングウォール'],
    theKobayashiMaru: ["The Kobayashi Maru", "Die Kobayashi-maru", "Le Kobayashi Maru", "小林丸"],
    theSaltStrand: ['The Salt Strand', 'Der Salzstrand', 'Atolls De Sel', 'ソルトストランド'],
    theTangle: ["The Tangle", "Der Schlingwald", "L'Enchevêtrement", "タングル湿林"]
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

const timewornMap = {
  unhidden: [
    50,
    false,
    ['Unhidden Leather Map', 'Unversteckte Lederkarte', 'Carte secrète en cuir', '隠された地図G1'],
    expansions.ARR
  ],
  toadskin: [
    50,
    false,
    ['Timeworn Toadskin Map', 'Vergilbte Krötenleder-Karte', 'Vieille carte en peau de crapaud', '古ぼけた地図G3'],
    expansions.ARR
  ],
  boarskin: [
    50,
    false,
    ['Timeworn Boarskin Map', 'Vergilbte Keilerleder-Karte', 'Vieille carte en peau de sanglier', '古ぼけた地図G4'],
    expansions.ARR
  ],
  peisteskin: [
    50,
    true,
    ['Timeworn Peisteskin Map', 'Vergilbte Basiliskenleder-Karte', 'Vieille carte en peau de peiste', '古ぼけた地図G5'],
    expansions.ARR
  ],
  dragonskin: [
    60,
    true,
    ['Timeworn Dragonskin Map', 'Vergilbte Drachenleder-Karte', 'Vieille carte en peau de dragon', '古ぼけた地図G8'],
    expansions.HW
  ],
  gazelleskin: [
    70,
    true,
    ["Timeworn Gazelleskin Map", "Vergilbte Gazellenleder-Karte", "Vieille carte en peau de gazelle", "古ぼけた地図G10"],
    expansions.SB
  ]
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
  aquapolis: () => {
    return o(
      'aquapolis',
      [
        dutyImage,
        location.duty.theAquapolis,
        location.chamber5
      ],
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
  companySeals: (cost, company) => {
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
        loc = location.limsaUpperDecks;
        x = 13.1;
        y = 12.7;
        break;
      case 'Order of the Twin Adder':
        npc = ['Serpent Quartermaster', ...quartermasters];
        loc = location.newGridania;
        x = 9.8;
        y = 11.0;
        break;
      case 'Immortal Flames':
        npc = ['Flame Quartermaster', ...quartermasters];
        loc = location.uldahStepsOfNald;
        x = 8.3;
        y = 9.0;
        break;
    }

    return o(
      'purchase',
      [cost, companySeals, companySealsImage, npc, companyName, locationImage, loc, x, y],
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
  diademFate: (level, fate, expansion) => {
    return o(
      'diademFate',
      [level, dutyImage, location.theDiadem, fateImage, fate],
      expansion,
      true,
      false
    )
  },
  eurekaAnemosFate: (level, fate) => {
    return o(
      'diademFate',
      [level, dutyImage, location.eurekaAnemos, eurekaAnemosFateImage, fate],
      expansions.SB,
      true,
      false
    )
  },
  dungeon: (name, level, x, y, expansion, available, promo) => {
    return o(
      x && y ? 'duty' : 'dutyFinalChest',
      x && y ? [level, dutyImage, name, x, y] : [level, dutyImage, name],
      expansion,
      available,
      promo
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
  eventQuestPurchase: (shop, event, expansion) => {
    return o(
      'eventQuestPurchase',
      [shop, event],
      expansion,
      false,
      false
    )
  },
  fanFestival: (year, location) => {
    return o(
      'fanFestival',
      [year, location],
      expansions.ARR,
      false,
      true
    )
  },
  fanFestivalStream: (year, location) => {
    return o(
      'fanFestivalStream',
      [year, location],
      expansions.ARR,
      false,
      true
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
  freeCompanySubaquaticVoyage: (voyage) => {
    return o(
      'freeCompanySubaquaticVoyage',
      [voyage],
      expansions.SB,
      true,
      false
    )
  },
  fishing: (waters, loc, x, y, bait, level, expansion) => {
    return o(
      'fishing',
      [locale('Fisher'), waters, locationImage, loc, x, y, bait, level],
      expansion,
      true,
      false
    )
  },
  fishingDesynthesis: (item, waters, loc, x, y, bait, level, expansion) => {
    return o(
      'fishingDesynth',
      [item, locale('Culinarian'), locale('Fisher'), waters, locationImage, loc, x, y, bait, level]
    )
  },
  fishingDoubleMooch: (waters, loc, x, y, bait, level, expansion, fish1, fish2) => {
    return o(
      'fishingDoubleMooch',
      [locale('Fisher'), waters, locationImage, loc, x, y, bait, level, fish1, fish2],
      expansion,
      true,
      false
    )
  },
  fishingSpearfishing: (gig1, waters, loc, x, y, level, expansion, fishQuantity, fish, gig2) => {
    return o(
      'fishingSpearfishing',
      [locale('swimming shadows'), locale('Fisher'), gig1, waters, locationImage, loc, x, y, fishQuantity, fish, level, gig2],
      expansion,
      true,
      false
    )
  },
  gardening: (seeds) => {
    return o(
      'gardening', [seedImage, seeds], expansions.ARR, true, false
    )
  },
  gather: (level, job, stars, loc, x, y, time, slot, expansion) => {
    return o(
      'gather',
      [
        level,
        locale(job),
        stars ? ' (' + (new Array(stars).fill()).map(s => '★').join('') + ')' : '',
        locationImage,
        loc,
        x, y,
        time,
        slot
      ],
      expansion,
      true,
      false
    )
  },
  gilAfterFate: (cost, npc, loc, x1, y1, fate, level, x2, y2, expansion) => {
    return o(
      'gilAfterFate',
      [cost, gil, gilImage, npc, locationImage, loc, x1, y1, level, fateImage, fate, x2, y2],
      expansion,
      true,
      false
    )
  },
  goldSaucerMinionsMGP: (cost) => {
    return o(
      'purchase',
      [
        cost, mgp, mgpImage,
        _npc.minionTrader,
        ['(Purchase Minions (MGP))', '(Begleiter (MGP))', '(Mascottes (PGS))', '（ミニオンの取引（MGP消費））'],
        locationImage,
        location.theGoldSaucer,
        7.8, 7
      ],
      expansions.ARR,
      true,
      false
    )
  },
  goldSaucerPrizeExchange: (cost) => {
    return o(
      'purchase',
      [
        cost, mgp, mgpImage,
        ['Gold Saucer Attendant', 'Sonderartikel-Händlerin', 'Préposée Aux Lots', '景品交換窓口'],
        ['(Prize Exchange I)', '(Gewinne I)', '(Lots (1))', '（景品の交換（その1））'],
        locationImage,
        location.theGoldSaucer,
        5.4, 6.7
      ],
      expansions.ARR,
      true,
      false
    )
  },
  itemAccursedHoard: (sack) => {
    return o(
      'itemAccursedHoard',
      [
        sack,
        item.pieceOfAccursedHoard,
        dutyImage,
        location.duty.thePalaceOfTheDead
      ],
      expansions.ARR,
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
  hiddenCanalsOfUznair: () => {
    return o(
      'hiddenCanalsOfUznair',
      [
        dutyImage,
        location.duty.theHiddenCanalsOfUznair
      ],
      expansions.SB,
      true,
      false
    )
  },
  mogStation: () => {
    return o(
      'mogStation',
      [locale('Mog Station')],
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
  pvp: (name, level, expansion, available, promo) => {
    return o(
      'pvp',
      [level, pvpImage, name],
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
  raid: (name, level, expansion, available, promo) => {
    return o(
      'raid',
      [level, raidImage, name],
      expansion,
      available,
      promo
    )
  },
  retainerVenture: (level, jobType, type, number) => {
    let expansion;

    if (level <= 50)
      expansion = expansions.ARR;
    else if (level <= 60)
      expansion = expansions.HW;
    else if (level <= 70)
      expansion = expansions.SB;

    if (jobType === 'quick')
      return o(
        'retainerVentureQuick',
        [ventureImage, locale('Quick Exploration')],
        expansion,
        true,
        false
      );

    return o(
      'retainerVenture',
      [level, locale(jobType), ventureImage, locale(type), locale(number)],
      expansion,
      true,
      false
    )
  },
  squareEnixStore: (item, expiration) => {
    return o(
      'squareEnixStore',
      [item, locale('Square Enix Store'), expiration],
      expansions.ARR,
      false,
      true
    )
  },
  squareEnixStoreNoExpiration: (item, expiration) => {
    return o(
      'squareEnixStore',
      [item, locale('Square Enix Store')],
      expansions.ARR,
      true,
      true
    )
  },
  timewornMap: (level, fullParty, map, expansion) => {
    let type = 'timewornMap';
    if (fullParty)
      type = 'timewornMapFullParty';

    return o(
      type,
      [level, timewornImage, map],
      expansion,
      true,
      false
    )
  },
  trial: (name, level, expansion, available, promo) => {
    return o(
      'trial',
      [level, trialImage, name],
      expansion,
      available,
      promo
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
  },
  wondrousTails: (lines) => {
    return o(
      'wondrousTails',
      [lines, wondrousTailsImage, locale('Wondrous Tails')],
      expansions.HW,
      true,
      false
    )
  }
}

let value;

/* Returns information about how minions are obtained.
 * Corresponds to ../../docs/obtainMethods.json.
 */
module.exports = (emote, achievementsIn) => {
  achievements = achievementsIn;
  switch (+emote.ID) {
    default:
      console.log("Unknown method for emote " + emote.ID);
      return null;
  }
}