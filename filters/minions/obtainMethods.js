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
const locationImage = 'loc';
const dutyImage = 'duty';
const pvpImage = 'pvp';
const trialImage = 'trial';
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

const rank = {
  sworn: ['Sworn', 'Solidarisch', 'Assermenté', '友好関係：誓約'],
  trusted: ['Trusted', 'Vertraut', 'Estimé', '信頼'],
}

const beastTribe = {
  amaljaa: ['Amalj\'aa', true, true, 'アマルジャ'],
  ixal: ['Ixal', true, true, 'イクサル'],
  kobold: ['Kobold', true, 'Kobolde', 'コボルド'],
  sahagin: ['Sahagin', true, 'Sahuagin', 'サハギン'],
  sylph: ['Sylph', 'Sylphen', 'Sylphe', 'シルフ'],
  vanuVanu: ['Vanu Vanu', true, true, 'バヌバヌ'],
  vath: ['Vath', true, 'Vathe', 'ヴァス'],
  moogle: ["Moogle", "Mogry", "Mog", "モーグリ"]
}

const item = {
  bronzeTrimmedSack: ['Bronze-trimmed Sack', 'Gefundener Schatz I', 'Trésor mystérieux de grade I', '埋もれた財宝G1'],
  elixir: ['Elixir', 'Elixier', 'Élixir', 'エリクサー'],
  hiElixir: ['Hi-Elixir', 'Super-Elixier', 'Super élixir', 'ハイエリクサー'],
  pieceOfAccursedHoard: ['piece of the Accursed Hoard', 'verborgenen Schatz', 'trésor caché', '埋もれた財宝'],
  bait: {
    bruteLeech: ["Brute Leech", "Grobegel", "Sangsue bestiale", "ブルートリーチ"],
    northernKrill: ['Northern Krill', 'Nordkrill', 'Krill polaire', 'ポーラークリル'],
    topwaterFrog: ['Topwater Frog', 'Schwimmfrosch', 'Grenouille sèche', 'トップウォーターフロッグ']
  },
  fish: {
    assassinBetta: ["Assassin Betta", "Kampffisch", "Betta assassin", "アサシンベタ"],
    ninjaBetta: ["Ninja Betta", "Ninja-Kampffisch", "Betta ninja", "ニンジャベタ"]
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
  bloodPepper: {
    icon: 13754,
    name: ["Blood Pepper", "Blutpfeffer", "Piment sanglant", "ブラッドペッパー"]
  },
  broombush: {
    icon: 7776,
    name: ['Broombush', 'Ginsterstrauch', 'Genêt', 'ホウキグサ']
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
  dragonBlood: {
    icon: 12630,
    name: ["Dragon Blood", "Drachenblut", "Sang de dragon", "竜族の血"]
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
  leviathansBarb: {
    icon: 7159,
    name: ["Leviathan's Barb", "Bartel Leviathans", "Barbillon de Léviathan", "リヴァイアサンの棘"]
  },
  levinOrb: {
    icon: 8019,
    name: ["Levin Orb", "Ramuh-Kugel", "Orbe de Ramuh", "ラムウのオーブ"]
  },
  lightningShard: {
    icon: 6,
    name: ['Lightning Shard', 'Blitzscherbe', 'Éclat de foudre', 'ライトニングシャード']
  },
  rosewoodBranch: {
    icon: 5414,
    name: ['Rosewood Branch', 'Palisanderast', 'Branche de palissandre', 'ローズウッドの枝']
  },
  steelMainspring: {
    icon: 12648,
    name: ["Steel Mainspring", "Stahl-Triebfeder", "Ressort moteur en acier", "ゼンマイバネ"]
  },
  steelWheelBearing: {
    icon: 12649,
    name: ["Steel Wheel Bearing", "Stahl-Radlager", "Roulement de roue en acier", "ホイールベアリング"]
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
  windShard: {
    icon: 4,
    name: ['Wind Shard', 'Windscherbe', 'Éclat de vent', 'ウィンドシャード']
  },
  wootzIngot: {
    icon: 9358,
    name: ['Wootz Ingot', 'Wootz-Barren', 'Lingot de wootz', 'ウーツインゴット']
  }
}

const location = {
  apkalluFalls: ['Apkallu Falls', 'Apkallu-Fälle', 'Chutes De L\'Apkallu', 'アプカル滝'],
  chamber5: ['5th Chamber', 'Fünfte Kammer', 'Cinquième Salle', '第五区画'],
  coerthasCentralHighlands: ['Coerthas Central Highlands', 'Zentrales Hochland Von Coerthas', 'Hautes Terres Du Coerthas Central', 'クルザス中央高地'],
  coerthasWesternHighlands: ["Coerthas Western Highlands", "Westliches Hochland Von Coerthas", "Hautes Terres Du Coerthas Occidental", "クルザス西部高地"],
  commandRoom: ['Command Room', 'Admiralsbrücke', 'Salon De L\'Amiral', 'アドミラルブリッジ：提督室'],
  easternLaNoscea: ['Eastern La Noscea', 'Östliches La Noscea', 'Noscea Orientale', '東ラノシア'],
  easternThanalan: ['Eastern Thanalan', 'Östliches Thanalan', 'Thanalan Oriental', '東ザナラーン'],
  eastShroud: ['East Shroud', 'Ostwald', 'Forêt De L\'est', '黒衣森：東部森林'],
  fogfens: ["Fogfens", "Nebelmoor", "Fangebrume", "迷霧湿原"],
  foundation: ["Foundation", "Fundamente", "Ishgard - L'Assise", "イシュガルド：下層"],
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
  southShroud: ['South Shroud', 'Südwald', 'Forêt Du Sud', '黒衣森：南部森林'],
  southernThanalan: ['Southern Thanalan', 'Südliches Thanalan', 'Thanalan Méridional', '南ザナラーン'],
  theChurningMists: ["The Churning Mists", "Wallende Nebel", "L'Écume Des Cieux De Dravania", "ドラヴァニア雲海"],
  theDiadem: ['The Diadem', 'Das Diadem', 'Le Diadème', 'ディアデム諸島'],
  theDravanianForelands: ["The Dravanian Forelands", "Dravanisches Vorland", "Avant-pays Dravanien", "高地ドラヴァニア"],
  theForgottenKnight: ["The Forgotten Knight", "Der Vergessene Ritter", "Le Chevalier Oublié", "忘れられた騎士亭"],
  theGoldSaucer: ['The Gold Saucer', 'Gold Saucer', 'Gold Saucer', 'ゴールドソーサー'],
  thePillars: ["The Pillars", "Strebewerk", "Ishgard - Les Contreforts", "イシュガルド：上層"],
  theRisingStones: ["The Rising Stones", "Sonnenstein", "Refuge Des Roches", "石の家"],
  theSeaOfClouds: ["The Sea Of Clouds", "Abalathisches Wolkenmeer", "L'Écume Des Cieux D'Abalathia", "アバラシア雲海"],
  theWolvesDen: ['The Wolves\' Den', 'Wolfshöhle', 'L\'Antre des loups', 'ウルヴズジェイル'],
  uldahStepsOfNald: ['Ul\'dah - Steps of Nald', 'Nald-Kreuzgang', 'Ul\'dah - Faubourg de Nald', 'ウルダハ：ナル回廊'],
  uldahStepsOfThal: ['Ul\'dah - Steps of Thal', 'Thal-Kreuzgang', 'Ul\'dah - Faubourg De Thal', 'ウルダハ：ザル回廊'],
  upperLaNoscea: ['Upper La Noscea', 'Oberes La Noscea', 'Haute-Noscea', '高地ラノシア'],
  westernLaNoscea: ['Western La Noscea', 'Westilches La Noscea', 'Noscea Occidentale', '西ラノシア'],
  duty: {
    alexanderBurdenOfTheSonSavage: ["Alexander - The Burden Of The Son (Savage)", "Alexander - Last Des Sohnes (episch)", "Alexander - Le Fardeau Du Fils (sadique)", "機工城アレキサンダー零式：律動編4"],
    amdaporKeep: ['Amdapor Keep', 'Die Ruinen Von Amdapor', 'Le Château D\'Amdapor', '邪教排撃 古城アムダプール'],
    battleInTheBigKeep: ["Battle In The Big Keep", "Revanche In Den Ruinen", "Revanche Au Vieux Château", "真ギルガメッシュ討滅戦"],
    brayfloxsLongstopHard: ['Brayflox\'s Longstop (Hard)', 'Brüllvolx\' Langrast (schwer)', 'Le Bivouac De Brayflox (brutal)', '盟友支援 ブレイフロクスの野営地 (Hard)'],
    copperbellMinesHard: ['Copperbell Mines (Hard)', 'Kupferglocken-Mine (schwer)', 'Les Mines De Clochecuivre (brutal)', '騒乱坑道 カッパーベル銅山 (Hard)'],
    hullbreakerIsle: ['Hullbreaker Isle', 'Schiffbrecher-Insel', 'L\'Île De Crèvecarène', '財宝伝説 ハルブレーカー・アイル'],
    hullbreakerIsleHard: ["Hullbreaker Isle (Hard)", "Schiffbrecher-Insel (schwer)", "L'Île De Crèvecarène (brutal)", "黒渦伝説 ハルブレーカー・アイル (Hard)"],
    neverreap: ["Neverreap", "Nimmerreich", "Nalloncques", "神域浮島 ネバーリープ"],
    sastashaHard: ['Sastasha (Hard)', 'Sastasha (schwer)', 'Sastasha (brutal)', '逆襲要害 サスタシャ浸食洞 (Hard)'],
    sohmAl: ["Sohm Al", "Sohm Al", "Sohm Al", "霊峰踏破 ソーム・アル"],
    saintMociannesArboretum: ["Saint Mocianne's Arboretum", "Sankt Mocianne-Arboretum", "L'Arboretum Sainte-Mocianne", "草木庭園 聖モシャーヌ植物園"],
    syrcusTower: ['Syrcus Tower', 'Kristallturm - Der Syrcus-Turm', 'La Tour De Cristal - Tour De Syrcus', 'クリスタルタワー：シルクスの塔'],
    theAery: ["The Aery", "Nest Des Drachen", "L'Aire", "邪竜血戦 ドラゴンズエアリー"],
    theAurumVale: ['The Aurum Vale', 'Goldklamm', 'Le Val D\'Aurum', '霧中行軍 オーラムヴェイル'],
    theAquapolis: ['The Aquapolis', 'Aquapolis', 'L\'Aquapole', '宝物庫 アクアポリス'],
    theAntitower: ["The Antitower", "Antiturm", "L'Antitour", "星海観測 逆さの塔"],
    theDragonsNeck: ["The Dragon's Neck", "Das Drachenhals-Kolosseum", "Le Col Du Dragon", "アマジナ杯闘技会決勝戦"],
    theFeast: ["The Feast", true, true, "ザ・フィースト"],
    theFractalContinuum: ["The Fractal Continuum", "Die Fraktal-Kontinuum", "Le Continuum Fractal", "博物戦艦 フラクタル・コンティニアム"],
    theGreatGubalLibrary: ["The Great Gubal Library", "Große Gubal-Bibliothek", "La Grande Bibliothèque De Gubal", "禁書回収 グブラ幻想図書館"],
    theLostCityOfAmdaporHard: ["The Lost City Of Amdapor (Hard)", "Historisches Amdapor (schwer)", "Les Vestiges De La Cité D'Amdapor (brutal)", "神聖遺跡 古アムダプール市街 (Hard)"],
    thePalaceOfTheDead: ['The Palace of the Dead', 'Palast Der Toten', 'Palais Des Morts', '死者の宮殿'],
    theSunkenTempleOfQarnHard: ['The Sunken Temple of Qarn (Hard)', 'Versunkener Tempel Von Qarn (schwer)', 'Le Temple Enseveli De Qarn (brutal)', '遺跡救援 カルン埋没寺院 (Hard)'],
    theVault: ["The Vault", "Erzbasilika", "La Voûte", "強硬突入 イシュガルド教皇庁"],
    theVoidArk: ["The Void Ark", "Die Nichts-Arche", "L'Arche Du Néant", "魔航船ヴォイドアーク"],
    theWanderersPalace: ['The Wanderer\'s Palace', 'Palast Des Wanderers', 'Le Palais Du Vagabond', '旅神聖域 ワンダラーパレス'],
    theWeepingCityOfMhach: ["The Weeping City Of Mhach", "Die Stadt Der Tränen", "La Cité Défendue De Mhach", "禁忌都市マハ"],
    theWorldOfDarkness: ['The World Of Darkness', 'Die Welt Der Dunkelheit', 'La Tour De Cristal - Monde Des Ténèbres', 'クリスタルタワー：闇の世界']
  },
  fishing: {
    southBanepool: ["South Banepool", "Südlicher Bannpfuhl", "Malétang (berge Sud)", "ベーンプール南"],
    theBurningWall: ['The Burning Wall', 'Der Feuerwall', 'Mur Incandescent', 'バーニングウォール'],
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
  fate: (level, fate, loc, x, y, expansion) => {
    return o(
      x && y ? 'fate' : 'fateUnknown',
      [level, fateImage, fate, locationImage, loc, x, y],
      expansion,
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
      [level, dutyImage, name],
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

    return o(
      'retainerVenture',
      [level, locale(jobType), locale(type), locale(number)],
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
  }
}

let value;

/* Returns information about how minions are obtained.
 * Corresponds to ../../docs/obtainMethods.json.
 */
module.exports = (minion, achievementsIn) => {
  achievements = achievementsIn;
  switch (+minion.id) {
    case 1:
    case 2:
    case 3: {
      const cost = 2400;
      const purchaseTools = ['(Purchase Tools)', '(Werkzeuge)', '(Outils)', '(道具の取引)'];
      return [
        o(
          'purchase',
          [
            cost, gil, gilImage,
            ['Maisenta', true, true, '黒兎堂 マイセンタ'],
            purchaseTools,
            locationImage,
            location.newGridania,
            11.5, 11.3
          ],
          expansions.ARR,
          true,
          false
        ),
        o(
          'purchase',
          [
            cost, gil, gilImage,
            ['Bango Zango', true, true, 'ブルゲール商会 バンゴ・ザンゴ'],
            purchaseTools,
            locationImage,
            location.limsaLowerDecks,
            10, 11.4
          ],
          expansions.ARR,
          true,
          false
        ),
        o(
          'purchase',
          [
            cost, gil, gilImage,
            ['Roarich', true, true, 'アシュガナ貿易 ロリッヒ'],
            purchaseTools,
            locationImage,
            location.uldahStepsOfNald,
            10.6, 9.6
          ],
          expansions.ARR,
          true,
          false
        ),
        o(
          'purchase',
          [
            cost, gil, gilImage,
            _npc.minionTrader,
            ['(Purchase Minions (Gil))', '(Begleiter (Gil))', '(Mascottes (gils))', '（ミニオンの取引（ギル消費））'],
            locationImage,
            location.theGoldSaucer,
            7.8, 7
          ],
          expansions.ARR,
          true,
          false
        )
      ];
    }
    
    case 4:
      return [
        o(
          'preOrder',
          [
            locale('Pre-order'),
            locale('A Realm Reborn'),
            ['Tuesday, December 31, 2013', 'Dienstag, den 31.12.2013', 'le mardi 31 décembre 2013', '2013年12月31日（火）']
          ],
          expansions.ARR,
          false,
          true
        )
      ];
    
    case 5:
      return [
        helper.collectorsEdition(locale('Legacy (1.0)'), expansions.Legacy, false),
        helper.collectorsEdition(locale('A Realm Reborn'), expansions.ARR, true)
      ];
    
    case 6:
      return helper.achievementReward(736, expansions.ARealmReborn, true, false);
      
    case 7:
      return helper.achievementReward(737, expansions.ARealmReborn, true, false);
      
    case 8:
      return helper.achievementReward(738, expansions.ARealmReborn, true, false);
    
    case 9:
      return helper.companySeals(20000, 'Maelstrom');
    
    case 10:
      return helper.companySeals(20000, 'Order of the Twin Adder');
    
    case 11:
      return helper.companySeals(20000, 'Immortal Flames');
    
    case 12:
      return helper.dungeon(
        location.duty.theAurumVale,
        47, 10, 8, expansions.ARR, true, false
      );
    
    case 13:
      return helper.gilAfterFate(
        2400,
        ['Chachamun', true, true, '武具屋 チャチャムン'],
        location.easternThanalan,
        22, 21,
        ['Attack on Highbridge: Act III', 'Schlacht Um Hohenbrück: Duell Mit Nayokk Roh','Assaut Sur Le Viaduc: Acte III', 'ハイブリッジの死闘：ナヨク・ロー排撃'],
        26, 23, 23,
        expansions.ARR
      );

    case 14:
      return helper.fate(
        20,
        ['Lazy for You', 'Undank Des Faulen', 'Défi: Laurence Pas Ravie', '非情な収穫者「レジー・ローレンス」'],
        location.eastShroud,
        23, 29,
        expansions.ARR
      );
    
    case 15:
      return helper.quest(
        22,
        locale('Gridanian Sidequests'),
        ['Occupational Hazards', 'Ruinöse Plagegeister', 'Rassurer Yoenne', '遺跡調査の落とし穴'],
        ['Yoenne', true, true, 'ヨエヌ'],
        location.southShroud,
        18, 20,
        expansions.ARR,
        true,
        false
      );

    case 16:
      return [
        helper.timewornMap(...timewornMap.peisteskin),
        helper.timewornMap(...timewornMap.dragonskin),
        helper.aquapolis(),
        helper.itemAccursedHoard(item.bronzeTrimmedSack)
      ];
    
    case 17:
    case 28:
    case 37:
      return o(
        'purchase',
        [
          7, poetics, poeticsImage,
          ['Auriana', true, true, 'オーリアナ'],
          ['(Allagan Tomestones Of Poetics (Other))', '(Allagische Steine Der Poesie (Anderes))', '(Mémoquartz Allagois Poétiques (divers))', '（アラガントームストーン:詩学の取引（その他））'],
          locationImage,
          location.morDhona,
          22.8, 6.7
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 18:
      return helper.fate(
        49,
        ['Go, Go, Gorgimera', 'Etwas Von Allem', 'Défi: Gorgimère Indigne', '荒れ狂う巨獣「ゴーキマイラ」'],
        location.northernThanalan,
        17, 14,
        expansions.ARR
      );
    
    case 19:
      return helper.quest(
        22,
        locale('Lominsan Sidequests'),
        ['Curiosity Killed The Coeurl', 'Die Unschuld Der Jugend', 'Le Félin Orphelin', '魔獣が守ったもの'],
        ['Skribyld', true, true, 'スクリビルド'],
        location.westernLaNoscea,
        26.4, 26.4,
        expansions.ARR,
        true,
        false
      );
    
    case 20:
    case 106:
      return [
        helper.goldSaucerPrizeExchange(20000),
        helper.goldSaucerMinionsMGP(20000)
      ];

    case 21:
      return helper.quest(
        50,
        locale('Hildibrand Quests'),
        ['Her Last Vow', 'Ruinöse Revanche', 'Boucler La Boucle', '事件は砂塵に消ゆ'],
        ['Julyan', true, true, 'ジュリアン'],
        location.uldahStepsOfThal,
        12.1, 11.8,
        expansions.ARR,
        true,
        false
      );
    
    case 22:
      return helper.craft(
        50,
        locale('Goldsmith'),
        0,
        [
          { quantity: 99, ...craftItem.windShard },
          { quantity: 3, ...craftItem.astralRock }
        ]
      );
    
    case 23:
      return [
        helper.timewornMap(...timewornMap.boarskin),
        helper.aquapolis(),
        helper.itemAccursedHoard(item.bronzeTrimmedSack)
      ];
    
    case 24:
      return helper.fishing(
        location.fishing.theSaltStrand,
        location.lowerLaNoscea,
        17, 35,
        item.bait.northernKrill,
        50,
        expansions.ARR
      );

    case 25:
      return helper.gilAfterFate(
        2400,
        ['Boughbury Trader', 'Astlfinger Händler', 'Marchand De Ramebourg', 'バウバリー村の商人'],
        location.southShroud,
        21, 16,
        ['Clearing the Hive', 'Das Nest Säubern', 'Nid De Guêpes: Colonisation', 'レッドベリー砦の戦い：占領戦'],
        32, 22, 17,
        expansions.ARR
      );
    
    case 26:
      return helper.gilAfterFate(
        2400,
        ['Junkmonger Nonoroon', 'Nonoroon', 'Nonoroon Renifle-nid', 'メメルン交易商会 ノノルン'],
        location.upperLaNoscea,
        11, 24,
        ['Poor Maid\'s Misfortune', 'Vorsicht Bissig', 'Pauvre Hameau: Des Coeurls Qui Battent', 'プアメイドミル復興：クァール討伐'],
        20, 12, 24,
        expansions.ARR
      );

    case 27:
      return [
        helper.timewornMap(...timewornMap.toadskin),
        helper.aquapolis(),
        helper.itemAccursedHoard(item.bronzeTrimmedSack)
      ];
    
    case 29:
      return helper.craft(
        50,
        locale('Armorer'),
        0,
        [
          { quantity: 99, ...craftItem.iceShard },
          { quantity: 3, ...craftItem.darksteelNugget }
        ]
      );
    
    case 30:
      return helper.fishing(
        location.fishing.theBurningWall,
        location.easternThanalan,
        29, 24,
        item.bait.topwaterFrog,
        44,
        expansions.ARR
      );
    
    case 31:
      return helper.fate(
        39,
        ['The Eyes Have It', 'Mehr Augen, Mehr Ärger', 'Défi: L\'œil De La Tête', '帰ってきた男「ステロペス」'],
        location.coerthasCentralHighlands,
        15, 19,
        expansions.ARR
      );
    
    case 32:
      return helper.msq(
        50,
        locale('Seventh Astral Era'),
        ['You\'re Gonna Carry That', 'Tatarus sieben Sachen', 'Un petit coup de main', '砂の家でのお片付け'],
        ['Stafborn', true, true, 'スラフボーン'],
        location.morDhona,
        21.9, 7.8,
        expansions.ARR,
        true,
        false
      );

    case 33:
      return helper.quest(
        47,
        locale('Ul\'dahn Sidequests'),
        ['Zombies Are People Too', 'Love me Sabotender', 'De piquants compagnons', '悲しみのゾンビー'],
        ['Hab', true, true, 'ハブ'],
        location.uldahStepsOfThal,
        24.8, 40.9,
        expansions.ARR,
        true,
        false
      );
      
    case 34:
      return helper.fate(
        32,
        ['It\'s Not Lupus', 'Krabbe XXL', 'Défi: Cancer, Le Casque De Mort', '死顔の簒奪者「キャンサー」'],
        location.easternLaNoscea,
        31, 34,
        expansions.ARR
      );

    case 35:
      return helper.quest(
        15,
        locale('Lominsan Sidequests'),
        ['Man\'s Best Fiend', 'Wolfshundbändiger', 'Le chacal amical', '幼い狼犬を救え'],
        ['Skribyld', true, true, 'スクリビルド'],
        location.westernLaNoscea,
        26.4, 26.4,
        expansions.ARR,
        true,
        false
      );

    case 36:
      return [
        helper.veteranReward(90),
        helper.achievementCertificate(2)
      ];
    
    case 38:
      return helper.gather(
        50, 'Miner', 1,
        location.easternThanalan,
        28, 22,
        7,
        '9:00AM'
      );
    
    case 39:
      return [
        helper.craft(
          50,
          locale('Weaver'),
          0,
          [
            { quantity: 99, ...craftItem.lightningShard },
            { quantity: 1, ...craftItem.vanyaSilk },
            { quantity: 1, ...craftItem.twinthread },
            { quantity: 1, ...craftItem.chocoboFeather }
          ]
        ),
        helper.diademFate(
          60,
          ['Where\'s The Beef', 'Aufgebrachte Herde', 'Défi: Le Bovin Mythique', '古の巨獣「フォゴットン・ウィセント」'],
          expansions.HW
        )
      ];
    
    case 40:
      return helper.achievementReward(929, expansions.ARealmReborn, true, false);

    case 41:
      return helper.msq(
        22,
        locale('Seventh Umbral Era'),
        ['It Was A Very Good Year', 'Wandelndes Biotop', 'Un pied de vigne ambulant', '人の命運、ワインの運命'],
        ['Shamani Lohmani', true, true, 'シャマニ・ローマニ'],
        location.easternLaNoscea,
        21.7, 21.2,
        expansions.ARR,
        true,
        false
      );
    
    case 42:
      return helper.dungeon(
        location.duty.theWanderersPalace,
        50, 12, 5, expansions.ARR, true, false
      );
    
    case 43:
      return helper.craft(
        50,
        locale('Goldsmith'),
        0,
        [
          { quantity: 99, ...craftItem.windShard },
          { quantity: 1, ...craftItem.garleanSteelPlate },
          { quantity: 1, ...craftItem.garleanSteelJoint }
        ]
      );
    
    case 44:
      return helper.dungeon(
        location.duty.amdaporKeep,
        50, 9, 10, expansions.ARR, true, false
      );
    
    case 45:
      return helper.quest(
        50,
        locale('Delivery Moogle Quests'),
        ['Thwack-a-Mole', 'Hau Den Mull!', 'Taupologie', 'モールのひみつ'],
        ['Deputy Postmoogle', 'Mogry-Postdirektor', 'Maître Mog postier', '先輩レターモーグリ'],
        location.limsaLowerDecks,
        10.5, 11.4,
        expansions.ARR,
        true,
        false
      );
    
    case 46:
      return [
        helper.eventQuest(
          15,
          ['All\'s Wool That Ends Wool', 'Des Schäfchens Generäle', 'L\'année Du Mouton', '羊と私の降神祭'],
          'eq2',
          expansions.ARR
        ),
        helper.mogStation()
      ];
    
    case 47:
      return helper.dungeon(
        location.duty.copperbellMinesHard,
        50, 11, 12, expansions.ARR, true, false
      );
    
    case 48:
      return helper.gather(
        50, 'Botanist', 1,
        location.eastShroud,
        13, 23,
        '9:00PM',
        7
      );

    case 49:
      return [
        helper.veteranReward(450),
        helper.achievementCertificate(2)
      ];
    
    case 50:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.sylph,
          25000, gil, gilImage,
          ['Sylphic Vendor', 'Sylphen-Händlerin', 'Vendeur Sylphe', 'シルフ族のよろず屋'],
          ['(Purchase Items (Trusted))', '(Waren (Vertraut))', '(Objets (rang Estimé))', '(アイテムの取引(友好関係：信頼))'],
          locationImage,
          location.eastShroud,
          22.4, 26.4
        ],
        expansions.ARR,
        true,
        false
      );

    case 51:
      return [
        helper.veteranReward(30),
        helper.achievementCertificate(2)
      ];
    
    case 52:
      return [
        helper.msq(
          14,
          locale('Seventh Umbral Era'),
          ['The Gridanian Envoy', 'Die Stimme Des Waldes', 'L\'émissaire De Gridania', '海都と砂都と'],
          ['Kan-E-Senna', true, true, 'カヌ・エ・センナ'],
          location.lotusStand,
          0, 0,
          expansions.ARR,
          true,
          false
        ),
        helper.msq(
          14,
          locale('Seventh Umbral Era'),
          ['The Lominsan Envoy', 'Die Stimme Des Meeres', 'L\'émissaire De Limsa Lominsa', '森都と砂都と'],
          ['Merlwyb', true, true, 'メルウィブ'],
          location.commandRoom,
          0, 0,
          expansions.ARR,
          true,
          false
        ),
        helper.msq(
          14,
          locale('Seventh Umbral Era'),
          ['The Ul\'dahn Envoy', 'Die Stimme Der Wüste', 'L\'émissaire D\'Ul\'dah', '海都と森都と'],
          ['Raubahn', true, true, 'ラウバーン'],
          location.uldahStepsOfNald,
          8.5, 9,
          expansions.ARR,
          true,
          false
        )
      ];
    
    case 53:
      return helper.craft(
        50,
        locale('Weaver'),
        0,
        [
          { quantity: 99, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.vanyaSilk },
          { quantity: 1, ...craftItem.twinthread },
          { quantity: 1, ...craftItem.chocoboFeather }
        ]
      );

    case 54:
      return [
        helper.veteranReward(60),
        helper.achievementCertificate(2)
      ];
    
    case 55:
      return helper.squareEnixStore(
        ['Before Meteor：FINAL FANTASY XIV Original Soundtrack[映像付サントラ／Blu-ray Disc Music]', true, true, true],
        ['Wednesday, December 31, 2014', 'Mittwoch, 31. Dezember 2014', 'Mercredi 31 décembre 2014', '2014年12月31日']
      );
    
    case 56:
      return [
        helper.retainerVenture(50, 'Disciples of War and Magic', 'Field Exploration', 'XIII'),
        helper.retainerVenture(50, 'Miner', 'Highland Exploration', 'XIII'),
        helper.aquapolis(),
        helper.itemAccursedHoard(item.bronzeTrimmedSack)
      ];

    case 57:
      return [
        helper.dungeon(location.duty.sastashaHard, 50, null, null, expansions.ARR, true, false),
        helper.aquapolis()
      ];
    
    case 58:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.amaljaa,
          25000, gil, gilImage,
          ['Amalj\'aa Vendor', 'Amalj\'aa-Händler', 'Vendeur Amalj\'aa', 'アマルジャ族のよろず屋'],
          ['(Purchase Items (Trusted))', '(Waren (Vertraut))', '(Objets (rang Estimé))', '(アイテムの取引(友好関係：信頼))'],
          locationImage,
          location.southernThanalan,
          23.3, 14.2
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 59:
      return o(
        'beastTribe',
        [
          rank.sworn,
          beastTribe.ixal,
          25000, gil, gilImage,
          ['Ixali Vendor', 'Ixal-Händler', 'Vendeur Ixal', 'イクサル族のよろず屋'],
          ['(Purchase Items (Sworn))', '(Waren (Solidarisch))', '(Objets (rang Assermenté))', '(アイテムの取引(友好関係：誓約))'],
          locationImage,
          location.northShroud,
          25, 22.8
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 60:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.kobold,
          25000, gil, gilImage,
          ['Kobold Vendor', 'Kobold-Händler', 'Vendeur Kobold', 'コボルド族のよろず屋'],
          ['(Purchase Items (Trusted))', '(Waren (Vertraut))', '(Objets (rang Estimé))', '(アイテムの取引(友好関係：信頼))'],
          locationImage,
          location.outerLaNoscea,
          21.6, 17.8
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 61:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.sahagin,
          25000, gil, gilImage,
          ['Sahagin Vendor', 'Sahagin-Händler', 'Vendeur Sahuagin', 'サハギン族のよろず屋'],
          ['(Purchase Items (Trusted))', '(Waren (Vertraut))', '(Objets (rang Estimé))', '(アイテムの取引(友好関係：信頼))'],
          locationImage,
          location.westernLaNoscea,
          17, 22.4
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 62:
      return helper.eventQuest(
        7,
        ['Breaking Brick Mountains', 'Harte Steine Und Weiche Birnen', 'Les Créatures De Granit', 'あらくれ男と未知なるゴーレム'],
        'eq3',
        expansions.ARR
      );
    
    case 63:
      return helper.eventQuest(
        10,
        ['Burgeoning Dread', 'Der Schwarze Dämon', 'Abomination Aberrante', '黒い悪魔'],
        'eq4',
        expansions.ARR
      );
    
    case 64:
      return [
        helper.eventQuest(
          15,
          ['A Real Peach', 'Marionette Mit Herz', 'Une Issue Inattendue', 'プリンセスデーは時を越えて'],
          'eq5',
          expansions.ARR
        ),
        helper.mogStation()
      ];
    
    case 65:
      return o(
        'purchase',
        [
          1, item.elixir, elixirImage,
          ['Magic Pot', 'Zauberpott', 'Pot Magique', 'マジックポット'],
          ['(Gimme An Elixir)', '(Gib Mir Ein Elixier!)', '(Je Veux Un élixir !)', '(エリクサーちょうだい)'],
          locationImage,
          location.westernLaNoscea,
          12.1, 36.8
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 66:
      return helper.craft(
        50,
        locale('Weaver'),
        3,
        [
          { quantity: 99, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.glazenut },
          { quantity: 1, ...craftItem.juteYarn },
          { quantity: 1, ...craftItem.undyedCottonCloth },
          { quantity: 1, ...craftItem.cottonBoll }
        ]
      );

    case 67:
      return [
        helper.veteranReward(180),
        helper.achievementCertificate(2)
      ];

    case 71:
      return [
        helper.veteranReward(270),
        helper.achievementCertificate(2)
      ];
    
    case 75:
      return helper.achievementReward(859, expansions.ARealmReborn, true, false);

    case 76:
      return [
        helper.veteranReward(360),
        helper.achievementCertificate(2)
      ];

    case 77:
      return [
        helper.veteranReward(360),
        helper.achievementCertificate(2)
      ];
    
    case 78:
      return helper.squareEnixStore(
        ['A REALM REBORN: FINAL FANTASY XIV Original Soundtrack【映像付サントラ／Blu-ray Disc Music】', true, true, true],
        ['Wednesday, December 31, 2014', 'Mittwoch, 31. Dezember 2014', 'Mercredi 31 décembre 2014', '2014年12月31日']        
      );
    
    case 79:
      return helper.collectorsEdition(locale('A Realm Reborn'), expansions.ARR, true);

    case 80:
      return [
        helper.dungeon(location.duty.brayfloxsLongstopHard, 50, null, null, expansions.ARR, true, false),
        helper.aquapolis(),
        helper.itemAccursedHoard(item.bronzeTrimmedSack)
      ];
    
    case 81:
      return helper.craft(
        50,
        locale('Carpenter'),
        3,
        [
          { quantity: 99, ...craftItem.windShard },
          { quantity: 1, ...craftItem.glazenut },
          { quantity: 1, ...craftItem.broombush },
          { quantity: 1, ...craftItem.rosewoodBranch },
          { quantity: 1, ...craftItem.ancientLumber }
        ]
      );
    
    case 82:
    case 93:
      return [
        o(
          'purchase',
          [
            500, alliedSeals, alliedSealsImage,
            ['Hunt Billmaster', 'Jagdmeister', 'Responsable De La Chasse', 'モブハント担当官'],
            ['(Allied Seals (Other))', '(Jagdabzeichen (Anderes))', '(Insignes Alliés (divers))', '（同盟記章の取引（その他））'],
            locationImage,
            location.limsaUpperDecks,
            13.2, 12.5
          ],
          expansions.ARR,
          true,
          false
        ),
        o(
          'purchase',
          [
            500, alliedSeals, alliedSealsImage,
            ['Hunt Billmaster', 'Jagdmeister', 'Responsable De La Chasse', 'モブハント担当官'],
            ['(Allied Seals (Other))', '(Jagdabzeichen (Anderes))', '(Insignes Alliés (divers))', '（同盟記章の取引（その他））'],
            locationImage,
            location.newGridania,
            9.8, 11.3
          ],
          expansions.ARR,
          true,
          false
        ),
        o(
          'purchase',
          [
            500, alliedSeals, alliedSealsImage,
            ['Hunt Billmaster', 'Jagdmeister', 'Responsable De La Chasse', 'モブハント担当官'],
            ['(Allied Seals (Other))', '(Jagdabzeichen (Anderes))', '(Insignes Alliés (divers))', '（同盟記章の取引（その他））'],
            locationImage,
            location.uldahStepsOfNald,
            8.1, 9.3
          ],
          expansions.ARR,
          true,
          false
        )
      ];

    case 83:
    case 117:
      return [
        helper.goldSaucerPrizeExchange(10000),
        helper.goldSaucerMinionsMGP(10000)
      ];

    case 84:
      return [
        helper.veteranReward(630),
        helper.achievementCertificate(2)
      ];

    case 85:
      return [
        helper.veteranReward(540),
        helper.achievementCertificate(2)
      ];

    case 86:
      return helper.gardening(item.seeds.onionPrince);

    case 87:
      return helper.gardening(item.seeds.eggplantKnight);

    case 88:
      return helper.gardening(item.seeds.garlicJester);

    case 89:
      return helper.gardening(item.seeds.tomatoKing);

    case 90:
      return helper.gardening(item.seeds.mandragoraQueen);
    
    case 91:
    case 98:
    case 99:
    case 103:
    case 107:
    case 108:
    case 109:
    case 121:
    case 131:
    case 132:
      return helper.mogStation();
    
    case 92:
      return helper.raid(location.duty.syrcusTower, 50, expansions.ARR, true, false);

    case 94:
      return [
        helper.retainerVenture(50, 'Disciples of War and Magic', 'Field Exploration', 'XIV'),
        helper.retainerVenture(50, 'Disciples of War and Magic', 'Field Exploration', 'XV'),
        helper.retainerVenture(50, 'Disciples of War and Magic', 'Field Exploration', 'XIX')
      ];
    
    case 95:
      return helper.craft(
        50,
        locale('Weaver'),
        4,
        [
          { quantity: 99, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.arachneWeb },
          { quantity: 1, ...craftItem.cashmereCloth },
          { quantity: 1, ...craftItem.apkalluDown },
          { quantity: 1, ...craftItem.twinthread }
        ]
      );

    case 96:
      return helper.retainerVenture(50, 'Disciples of War and Magic', 'Highland Exploration', 'XIV');

    case 97:
      return [
        helper.timewornMap(...timewornMap.unhidden),
        helper.aquapolis(),
        helper.itemAccursedHoard(item.bronzeTrimmedSack)
      ];

    case 100:
      return helper.craft(
        50,
        locale('Blacksmith'),
        4,
        [
          { quantity: 99, ...craftItem.fireShard },
          { quantity: 1, ...craftItem.glazenut },
          { quantity: 1, ...craftItem.wootzIngot },
          { quantity: 1, ...craftItem.garleanSteelJoint },
          { quantity: 1, ...craftItem.garleanSteelPlate },
          { quantity: 1, ...craftItem.garleanFiber },
          { quantity: 1, ...craftItem.garleanRubber }
        ]
      );

    case 101:
      return helper.raid(location.duty.theWorldOfDarkness, 50, expansions.ARR, true, false);
    
    case 102:
      return helper.dungeon(
        location.duty.hullbreakerIsle,
        50, 5, 10, expansions.ARR, true, false
      );
    
    case 104:
      return helper.trial(location.duty.theDragonsNeck, 50, expansions.ARR, true, false);
    
    case 105:
      return [
        helper.eventQuestPurchase(
          ['Fallen Star Exchange', 'Sternschnuppen', 'Objets Festifs', 'スターライトストーンの取引'],
          ['Starlight Celebration 2014', true, true, '星芒祭'],
          expansions.ARR
        ),
        helper.mogStation()
      ];

    case 110:
      return [
        helper.retainerVenture(50, 'Fisher', 'Waterside Exploration', 'XIV'),
        helper.retainerVenture(50, 'Fisher', 'Waterside Exploration', 'XV'),
        helper.retainerVenture(50, 'Fisher', 'Waterside Exploration', 'XVI'),
        helper.retainerVenture(50, 'Fisher', 'Waterside Exploration', 'XVII'),
        helper.retainerVenture(50, 'Fisher', 'Waterside Exploration', 'XVIII')
      ];

    case 111:
      return [
        helper.retainerVenture(50, 'Fisher', 'Woodland Exploration', 'XIV'),
        helper.retainerVenture(50, 'Fisher', 'Woodland Exploration', 'XV'),
        helper.retainerVenture(50, 'Fisher', 'Woodland Exploration', 'XVI'),
        helper.retainerVenture(50, 'Fisher', 'Woodland Exploration', 'XVII'),
        helper.retainerVenture(50, 'Fisher', 'Woodland Exploration', 'XVIII')
      ];

    case 112: 
      return [
        helper.dungeon(location.duty.theSunkenTempleOfQarnHard, 50, null, null, expansions.ARR, true, false),
        helper.aquapolis(),
        helper.itemAccursedHoard(item.bronzeTrimmedSack)
      ];
    
    case 113:
      return helper.squareEnixStore(
        ['FINAL FANTASY XIV: A Realm Reborn The Art of Eorzea - ​​Another Dawn', true, true, true],
        ['Saturday, December 31, 2016', 'Samstag, 31. Dezember 2016', 'Samedi 31 décembre 2016', '2016年12月31日']
      );
    
    case 114:
      return helper.squareEnixStore(
        ['FINAL FANTASY® XIV: A REALM REBORN™ DELIVERY MOOGLE PLUSH', true, true, true],
        ['Sunday, December 31, 2017', 'Sonntag, 31. Dezember 2017', 'Dimanche 31 décembre 2017', '2017年12月31日']
      );

    case 115:
      return helper.fishingDesynthesis(
        item.fish.ninjaBetta,
        location.fishing.theTangle,
        location.fogfens,
        14, 13,
        item.fish.assassinBetta,
        50,
        expansions.ARR
      );

    case 116:
      return helper.quest(
        1,
        locale('Special Quests'),
        ["The Ties That Bind", "Ein Bund Fürs Leben", "Jusqu'à Ce Que Le Destin Vous Sépare", "時がふたりを分かつまで"],
        ["Claribel", true, true, "介添人 クラリベル"],
        location.eastShroud,
        17.6, 18.3,
        expansions.ARR,
        true,
        false
      );

    case 118:
      return helper.achievementReward(1040, expansions.ARealmReborn, true, false);

    case 119:
      return helper.msq(
        50,
        locale('Seventh Astral Era'),
        ["The Rising Chorus", "Der Hüter Erwacht", "Le Gardien Du Lac", "黙約の塔へ"],
        ["Tataru", true, true, "タタル"],
        location.theRisingStones,
        6, 5,
        expansions.ARR,
        true,
        false
      );
    
    case 122:
      return helper.dungeon(location.duty.battleInTheBigKeep, 50, null, null, expansions.ARR, true, false);

    case 123:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.sylph,
          25000, gil, gilImage,
          ['Sylphic Vendor', 'Sylphen-Händlerin', 'Vendeur Sylphe', 'シルフ族のよろず屋'],
          ["(Purchase Items (Allied))", "(Waren (Verbündet))", "(Objets (rang Allié))", "(アイテムの取引(友好関係：盟友))"],
          locationImage,
          location.eastShroud,
          22.4, 26.4
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 124:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.amaljaa,
          25000, gil, gilImage,
          ['Amalj\'aa Vendor', 'Amalj\'aa-Händler', 'Vendeur Amalj\'aa', 'アマルジャ族のよろず屋'],
          ["(Purchase Items (Allied))", "(Waren (Verbündet))", "(Objets (rang Allié))", "(アイテムの取引(友好関係：盟友))"],
          locationImage,
          location.southernThanalan,
          23.3, 14.2
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 125:
      return o(
        'beastTribe',
        [
          rank.sworn,
          beastTribe.ixal,
          25000, gil, gilImage,
          ['Ixali Vendor', 'Ixal-Händler', 'Vendeur Ixal', 'イクサル族のよろず屋'],
          ["(Purchase Items (Allied))", "(Waren (Verbündet))", "(Objets (rang Allié))", "(アイテムの取引(友好関係：盟友))"],
          locationImage,
          location.northShroud,
          25, 22.8
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 126:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.kobold,
          25000, gil, gilImage,
          ['Kobold Vendor', 'Kobold-Händler', 'Vendeur Kobold', 'コボルド族のよろず屋'],
          ["(Purchase Items (Allied))", "(Waren (Verbündet))", "(Objets (rang Allié))", "(アイテムの取引(友好関係：盟友))"],
          locationImage,
          location.outerLaNoscea,
          21.6, 17.8
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 127:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.sahagin,
          25000, gil, gilImage,
          ['Sahagin Vendor', 'Sahagin-Händler', 'Vendeur Sahuagin', 'サハギン族のよろず屋'],
          ["(Purchase Items (Allied))", "(Waren (Verbündet))", "(Objets (rang Allié))", "(アイテムの取引(友好関係：盟友))"],
          locationImage,
          location.westernLaNoscea,
          17, 22.4
        ],
        expansions.ARR,
        true,
        false
      );

    case 128:
      return [
        o(
          'preOrder',
          [
            locale('Pre-order'),
            locale('Heavensward'),
            ['Saturday, December 31, 2016', 'Samstag, 31. Dezember 2016', 'Samedi 31 décembre 2016', '2016年12月31日']
          ],
          expansions.HW,
          false,
          true
        )
      ];

    case 129:
      return helper.collectorsEdition(locale('Heavensward'), expansions.HW, true);
    
    case 130:
      return helper.msq(
        51,
        locale('Heavensward'),
        ["In Search Of Iceheart", "Die Suche Beginnt", "À La Recherche De Cœur-de-glace", "イゼルを探して"],
        ["Alphinaud", true, true, "アルフィノ"],
        location.foundation,
        13.4, 11.1,
        expansions.HW,
        true,
        false
      );
    
    case 133:
      return helper.msq(
        57,
        locale('Heavensward'),
        ["A Difference Of Opinion", "Mit Eigenen Waffen", "Une Impérieuse Présence", "北方より来たりし者"],
        ["Alphinaud", true, true, "アルフィノ"],
        location.theSeaOfClouds,
        19.4, 11.7,
        expansions.HW,
        true,
        false
      );
    
    case 134:
      return [
        helper.dungeon(location.duty.theVault, 57, null, null, expansions.HW, true, false),
        helper.aquapolis()
      ];
    
    case 135:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.vanuVanu,
          35000, gil, gilImage,
          _npc.lunaVanu,
          ["(Purchase Items (Trusted-Honored))", "(Waren (Vertraut))", "(Objets (rangs Estimé à émérite))", "(アイテムの取引(友好関係：信頼～名誉))"],
          locationImage,
          location.theSeaOfClouds,
          7, 14.3
        ],
        expansions.HW,
        true,
        false
      );
    
    case 136:
      return helper.craft(
        60,
        locale('Alchemist'),
        1,
        [
          { quantity: 99, ...craftItem.waterShard },
          { quantity: 1, ...craftItem.glazenut },
          { quantity: 3, ...craftItem.birchLumber },
          { quantity: 1, ...craftItem.steelMainspring },
          { quantity: 1, ...craftItem.steelWheelBearing },
          { quantity: 1, ...craftItem.dawnborneAethersand }
        ]
      );
    
    case 137:
      return [
        helper.dungeon(location.duty.theFractalContinuum, 60, null, null, expansions.HW, true, false),
        helper.aquapolis()
      ];
    
    case 138:
      return [
        helper.dungeon(location.duty.neverreap, 60, null, null, expansions.HW, true, false),
        helper.aquapolis()
      ];
    
    case 139:
      return [
        helper.dungeon(location.duty.sohmAl, 60, null, null, expansions.HW, true, false),
        helper.aquapolis()
      ];
    
    case 140:
      return helper.craft(
        60,
        locale('Carpenter'),
        1,
        [
          { quantity: 99, ...craftItem.windShard },
          { quantity: 1, ...craftItem.glazenut },
          { quantity: 2, ...craftItem.birchLumber },
          { quantity: 3, ...craftItem.dragonBlood },
          { quantity: 3, ...craftItem.gelatoFlesh },
          { quantity: 3, ...craftItem.atomosCorpulence },
          { quantity: 1, ...craftItem.dawnborneAethersand }
        ]
      );
    
    case 141:
      return [
        helper.dungeon(location.duty.theAery, 55, null, null, expansions.HW, true, false),
        helper.aquapolis()
      ];
    
    case 142:
      return [
        helper.dungeon(location.duty.theGreatGubalLibrary, 59, null, null, expansions.HW, true, false),
        helper.aquapolis()
      ];
    
    case 143:
      return helper.craft(
        60,
        locale('Armorer'),
        1,
        [
          { quantity: 99, ...craftItem.iceShard },
          { quantity: 1, ...craftItem.glazenut },
          { quantity: 2, ...craftItem.garleanSteelJoint },
          { quantity: 5, ...craftItem.ironGiantScrap },
          { quantity: 3, ...craftItem.ironGiantCore },
          { quantity: 1, ...craftItem.dawnborneAethersand }
        ]
      );
    
    case 144:
      return o(
        'purchase',
        [
          400, centurioSeals, centurioSealsImage,
          ["Ardolain", true, true, "アルドラン"],
          ['(Centurio Seals I)', '(Centurio-Abzeichen I)', '(Insigne Centurio I)', '（セントリオ記章（その他））'],
          locationImage,
          location.theForgottenKnight,
          13, 11
        ],
        expansions.HW,
        true,
        false
      );
    
    case 145:
    case 150:
      return [
        helper.eventQuest(
          15,
          ["A World Away", "Welten Entfernt", "Si Loin, Si Proche", "新生祭と鎮魂の夜空"],
          'eq6',
          expansions.ARR
        ),
        helper.mogStation()
      ];
    
    case 146:
      return [
        helper.retainerVenture(55, 'Fisher', 'Waterside Exploration', 'XVIII'),
        helper.retainerVenture(60, 'Fisher', 'Waterside Exploration', 'XIX')
      ];
    
    case 147:
      return helper.craft(
        60,
        locale('Armorer'),
        1,
        [
          { quantity: 99, ...craftItem.iceShard },
          { quantity: 1, ...craftItem.glazenut },
          { quantity: 2, ...craftItem.garleanSteelPlate },
          { quantity: 1, ...craftItem.stuffedGoblin },
          { quantity: 3, ...craftItem.gobwalkerShielding },
          { quantity: 1, ...craftItem.dawnborneAethersand }
        ]
      );
    
    case 148:
      return o(
        'purchase',
        [
          400, centurioSeals, centurioSealsImage,
          ["Ardolain", true, true, "アルドラン"],
          ['(Centurio Seals I)', '(Centurio-Abzeichen I)', '(Insigne Centurio I)', '（セントリオ記章（その他））'],
          locationImage,
          location.theForgottenKnight,
          13, 11
        ],
        expansions.HW,
        true,
        false
      );
    
    case 149:
      return helper.msq(
        60,
        locale('Heavensward'),
        ["Do It For Gilly", "Zurück Auf Den Rechten Weg", "Le Musée Des Machines", "博物戦艦 フラクタル・コンティニアム"],
        ["Notrelchamps", true, true, "ノトレルシャン"],
        location.thePillars,
        26, 23.6,
        expansions.HW,
        true,
        false
      );
    
    case 151:
      return helper.squareEnixStore(
        ['Emerald Carbuncle Plush', true, true, true],
        ['Sunday, December 31, 2017', 'Sonntag, 31. Dezember 2017', 'Dimanche 31 décembre 2017', '2017年12月31日']
      );
    
    case 152:
      return helper.squareEnixStore(
        ['Topaz Carbuncle Plush', true, true, true],
        ['Sunday, December 31, 2017', 'Sonntag, 31. Dezember 2017', 'Dimanche 31 décembre 2017', '2017年12月31日']
      );
    
    case 154:
      return helper.fate(
        57,
        ["On Dangerous Ground", "Wider Die Eigene Natur", "Défi: Mangeur De Terre Gardée", "暴食の岩人形「グランズイーター」"],
        location.theSeaOfClouds,
        21, 12,
        expansions.HW
      );
    
    case 155:
      return helper.squareEnixStore(
        ['Before The Fall：FINAL FANTASY XIV Original Soundtrack[映像付サントラ／Blu-ray Disc Music]', true, true, true],
        ['Saturday, December 31, 2016', 'Samstag, 31. Dezember 2016', 'Samedi 31 décembre 2016', '2016年12月31日']
      );
    
    case 156:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.vath,
          35000, gil, gilImage,
          _npc.vathStickpeddler,
          ['(Purchase Items (Trusted))', '(Waren (Vertraut))', '(Objets (rang Estimé))', '(アイテムの取引(友好関係：信頼))'],
          locationImage,
          location.theDravanianForelands,
          23.7, 19.1
        ],
        expansions.HW,
        true,
        false
      );
    
    case 157:
      return [
        helper.timewornMap(...timewornMap.dragonskin),
        helper.aquapolis(),
        helper.itemAccursedHoard(item.bronzeTrimmedSack)
      ];
    
    case 158:
      return helper.craft(
        60,
        locale('Weaver'),
        1,
        [
          { quantity: 99, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.titaniumIngot },
          { quantity: 1, ...craftItem.chimericalFelt },
          { quantity: 1, ...craftItem.crawlerSilk },
          { quantity: 1, ...craftItem.bloodPepper }
        ]
      );

    case 159:
      return [
        helper.eventQuest(
          20,
          ["Joining The Circus", "Großer Verwandlungszirkus", "Des Biscuits Porte-bonheur", "おかしなオカシと守護天節"],
          'eq1',
          expansions.ARR
        ),
        helper.mogStation()
      ];
    
    case 160:
      return helper.trial(location.duty.theVoidArk, 60, expansions.HW, true, false);
    
    case 161:
      return helper.squareEnixStore(
        ['Heavensward Art Book (The Art of Ishgard - Stone and Steel)', true, true, true],
        ['Sunday, December 31, 2017', 'Sonntag, 31. Dezember 2017', 'Dimanche 31 décembre 2017', '2017年12月31日']
      );
    
    case 162:
      return helper.fate(
        60,
        ["On The Inside", "Die Schlitzer Vom Diadem", "Défi: L'éventreur De L'azur", "美食の凶鳥「ガルピュデス」"],
        location.theDiadem,
        null, null,
        expansions.HW
      );

    case 163:
      return helper.achievementReward(1382, expansions.ARealmReborn, true, false);

    case 164:
      return helper.achievementReward(1385, expansions.ARealmReborn, true, false);

    case 165:
      return helper.achievementReward(1380, expansions.ARealmReborn, true, false);
    
    case 166:
      return helper.dungeon(location.duty.saintMociannesArboretum, 60, null, null, expansions.HW, true, false);

    case 167: 
      return [
        helper.veteranReward(960),
        helper.achievementCertificate(2)
      ];
    
    case 168:
      return helper.craft(
        60,
        locale('Weaver'),
        1,
        [
          { quantity: 99, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.ifritsHorn },
          { quantity: 1, ...craftItem.chimericalFelt },
          { quantity: 1, ...craftItem.crawlerSilk },
          { quantity: 1, ...craftItem.bloodPepper }
        ]
      );
    
    case 169:
      return helper.craft(
        60,
        locale('Weaver'),
        1,
        [
          { quantity: 99, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.garudasFeather },
          { quantity: 1, ...craftItem.chimericalFelt },
          { quantity: 1, ...craftItem.crawlerSilk },
          { quantity: 1, ...craftItem.bloodPepper }
        ]
      );
    
    case 170:
      return helper.craft(
        60,
        locale('Weaver'),
        1,
        [
          { quantity: 99, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.titansHeart },
          { quantity: 1, ...craftItem.chimericalFelt },
          { quantity: 1, ...craftItem.crawlerSilk },
          { quantity: 1, ...craftItem.bloodPepper }
        ]
      );
    
    case 171:
      return helper.craft(
        60,
        locale('Weaver'),
        1,
        [
          { quantity: 99, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.leviathansBarb },
          { quantity: 1, ...craftItem.chimericalFelt },
          { quantity: 1, ...craftItem.crawlerSilk },
          { quantity: 1, ...craftItem.bloodPepper }
        ]
      );
    
    case 172:
      return o(
        'beastTribe',
        [
          rank.sworn,
          beastTribe.vanuVanu,
          30000, gil, gilImage,
          _npc.lunaVanu,
          ["(Purchase Items (Sworn-Bloodsworn))", "(Waren (Solidarisch/Solidarisch★))", "(Objets (rangs Assermenté à Assermenté★))", "(アイテムの取引(友好関係：誓約～誓約★))"],
          locationImage,
          location.theSeaOfClouds,
          7, 14.3
        ],
        expansions.HW,
        true,
        false
      );
    
    case 173:
      return helper.msq(
        60,
        locale('Heavensward'),
        ["As Goes Light, So Goes Darkness", "Licht Und Dunkel", "Entre Lumière Et Ténèbres", "光と闇の境界"],
        ["Lucia", true, true, "ルキア"],
        location.foundation,
        13.8, 11.1,
        expansions.HW,
        true,
        false
      );
    
    case 174:
    case 187:
      return [
        helper.goldSaucerPrizeExchange(30000),
        helper.goldSaucerMinionsMGP(30000)
      ];

    case 175:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.vath,
          30000, gil, gilImage,
          _npc.vathStickpeddler,
          ['(Purchase Items (Trusted))', '(Waren (Vertraut))', '(Objets (rang Estimé))', '(アイテムの取引(友好関係：信頼))'],
          locationImage,
          location.theDravanianForelands,
          23.7, 19.1
        ],
        expansions.HW,
        true,
        false
      );
    
    case 176:
      return helper.trial(location.duty.alexanderBurdenOfTheSonSavage, 60, expansions.HW, true, false);

    case 177:
      return [
        helper.eventQuest(
          15,
          ["After The Curtain Falls", "Ein Wahrer Held", "À La Gloire De La Lumière", "新生祭の英雄賛歌"],
          'eq6',
          expansions.ARR
        ),
        helper.mogStation()
      ];
    
    case 178:
    case 179:
      return helper.dungeon(location.duty.theAntitower, 60, null, null, expansions.HW, true, false);

    case 180:
      return helper.dungeon(location.duty.theLostCityOfAmdaporHard, 60, null, null, expansions.HW, true, false);
    
    case 181:
      return helper.msq(
        60,
        locale('Heavensward'),
        ["The Word Of The Mother", "Zwiesprache Mit Dem Planeten", "La Voix De La Planète", "星の呼び声"],
        ["Alphinaud", true, true, "アルフィノ"],
        location.matoyasCave,
        6.5, 6.3,
        expansions.HW,
        true,
        false
      );
    
    case 182:
      return helper.squareEnixStore(
        ['Heavensward：FINAL FANTASY XIV Original Soundtrack[映像付サントラ／Blu-ray Disc Music]', true, true, true],
        ['Sunday, December 31, 2017', 'Sonntag, 31. Dezember 2017', 'Dimanche 31 décembre 2017', '2017年12月31日']
      );
    
    case 183:
      return [
        helper.pvp(location.duty.theFeast, 60, expansions.HW, false, false),
        helper.pvp(location.duty.theFeast, 30, expansions.ARR, true, false)
      ];
    
    case 184:
      return o(
        'beastTribe',
        [
          rank.sworn,
          beastTribe.moogle,
          30000, gil, gilImage,
          _npc.vathStickpeddler,
          ['(Purchase Items (Sworn))', '(Waren (Solidarisch))', '(Objets (rang Assermenté))', '(アイテムの取引(友好関係：誓約))'],
          locationImage,
          location.theChurningMists,
          16, 28.5
        ],
        expansions.HW,
        true,
        false
      );
    
    case 185:
      return helper.craft(
        60,
        locale('Weaver'),
        1,
        [
          { quantity: 99, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.levinOrb },
          { quantity: 1, ...craftItem.chimericalFelt },
          { quantity: 1, ...craftItem.crawlerSilk },
          { quantity: 1, ...craftItem.bloodPepper }
        ]
      );
    
    case 186:
      return helper.craft(
        60,
        locale('Weaver'),
        1,
        [
          { quantity: 99, ...craftItem.lightningShard },
          { quantity: 1, ...craftItem.iceTear },
          { quantity: 1, ...craftItem.chimericalFelt },
          { quantity: 1, ...craftItem.crawlerSilk },
          { quantity: 1, ...craftItem.bloodPepper }
        ]
      );
    
    case 188:
      return helper.fishing(
        location.fishing.southBanepool,
        location.coerthasWesternHighlands,
        21, 11,
        item.bait.bruteLeech,
        53,
        expansions.HW
      );

    case 189:
      return helper.dungeon(location.duty.hullbreakerIsleHard, 60, null, null, expansions.HW, true, false);

    case 190:
      return helper.diademFate(
        60,
        ["Secret Of The Lost Legend", "Geheimnis Der Verschollenen Legende", "Défi: Brachiosaures En Famille", "星呼の古代獣「ブラキオレイドス」"],
        expansions.HW
      );

    case 191:
      return o(
        'purchase',
        [
          15000, wolfMarks, wolfMarksImage,
          _npc.stormSegeant,
          wolfMarks.map(w => '(' + w + ')'),
          locationImage,
          location.theWolvesDen,
          4.4, 6.1
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 192:
      return [
        helper.eventQuest(
          15,
          ["After The Curtain Falls", "Ein Wahrer Held", "À La Gloire De La Lumière", "新生祭の英雄賛歌"],
          'eq6',
          expansions.ARR
        ),
        helper.mogStation()
      ];
    
    case 193:
      return helper.msq(
        60,
        locale('Dragonsong War'),
        ["Litany Of Peace", "Das Ende Eines Langen Weges", "Un Chant Pour L'avenir", "最期の咆哮"],
        ["Aymeric", true, true, "アイメリク"],
        location.foundation,
        13.7, 11.3,
        expansions.HW,
        true,
        false
      );

    case 194:
      return [
        o(
          'purchase',
          [
            50, brassSkyPirateSpoils, brassSkyPirateSpoilsImage,
            _npc.spoilsCollector,
            ["(Spoils Exchange (Other))", "(Messing-/Stahl-Piratenandenken (Anderes))", "(Espoilles En Acier/laiton (autres))", "(スポイル：真鍮・鋼鉄の取引（その他）)"],
            locationImage,
            location.thePillars,
            26.1, 22.3
          ],
          expansions.HW,
          true,
          false
        ),
        helper.diademFate(
          60,
          ["Blood Wings", "Sanfte Gewalt", "À Tire D'aile", "翼をさずける"],
          expansions.HW
        )
      ];
    
    case 195:
      return helper.raid(location.duty.theWeepingCityOfMhach, 60, expansions.HW, true, false);
    
    case 196:
    case 198:
      return o(
        'purchase',
        [
          3, gelmorranPotsherd, gelmorranPotsherdImage,
          ["E-Una-Kotor", "E-Una-Kotor", "E-Una-Kotor", "エ・ウナ・コトロ"],
          ["(Gelmorran Potsherd Exchange)", "(Gelmorra-Scherben)", "(Tessons De Poterie Gelmorraine)", "(ゲルモラ土器片の取引)"],
          locationImage,
          location.southShroud,
          21.5, 21.5
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 197:
      return helper.aquapolis();
    
    case 200:
    case 201:
    case 202:
    case 203:
    case 204:
    case 205:
    case 206:
    case 207:
    case 208:
    case 209:
    case 210:
    case 211:
    case 212:
      return helper.eventQuestPurchase(
        ["Wandering Executive", "Fahrend[a] Geschäftsmann", "Patron Errant", "異邦の社長"],
        ["Yo-kai Watch", true, true, "妖怪ウォッチ"],
        expansions.ARR
      );
    
    case 236:
      return o(
        'purchase',
        [
          1, item.hiElixir, hiElixirImage,
          ['Magic Pot', 'Zauberpott', 'Pot Magique', 'マジックポット'],
          ['(Gimme An Elixir)', '(Gib Mir Ein Elixier!)', '(Je Veux Un élixir !)', '(エリクサーちょうだい)'],
          locationImage,
          location.westernLaNoscea,
          12.1, 36.8
        ],
        expansions.ARR,
        true,
        false
      );

    default:
      //console.log("Unknown method for minion " + minion.id);
      return null;
  }
}