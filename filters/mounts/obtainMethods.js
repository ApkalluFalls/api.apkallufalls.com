const o = require('../_obtainMethods');
const getAchievement = require('../_getAchievement');
const locale = require('../_locale');

let achievements;
let mounts;

const expansions = {
  Unknown: 'X',
  Legacy: 1,
  ARR: 2,
  HW: 3,
  SB: 4
};

const _npc = {
  minionTrader: ['Minion Trader', 'Trabantenhändlerin', 'Marchande De Mascottes', 'ミニオントレーダー'],
  lunaVanu: ["Luna Vanu", true, true, "商人のルナバヌ"],
  vathStickpeddler: ["Vath Stickpeddler", "Krämer", "Camelot", "アキンド"],
  mogmulMogbelly: ["Mogmul Mogbelly", "Mogmul Mogbauch", "Mogmul", "大食いのモグムリ"],
  stormSegeant: ["Storm Sergeant", "Sturmmaat", "Sergent Des Tempêtes", "黒渦団甲軍曹"],
  spoilsCollector: ["Spoils Collector", "Andenkenhändlerin", "Négociante D'espoilles", "スポイル取引窓口"]
}

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
const goldChocoboFeatherImage = 'gcf';
const clanMarkLogsImage = 'cm';
const ironVoyageSpoilImage = 'iv';
const totemImage = 'totem';
const heavensWardHelmFragmentImage = 'hwhf';
const feastSeasonItemImage = 'feast3';
const blissTotemImage = 'bt';
const revelTotemImage = 'rt';
const shinryuTotemImage = 'st';

const item = {
  anemosLockbox: ["Anemos Lockbox", "Anemos-Schließkassette", "Coffre verrouillé d'Anemos", "アネモス帯のロックボックス"],
  goldTrimmedSack: ["Gold-trimmed Sack", "Gefundener Schatz IV", "Trésor mystérieux de grade IV", "埋もれた財宝G4"],
  pieceOfAccursedHoard: ['piece of the Accursed Hoard', 'verborgenen Schatz', 'trésor caché', '埋もれた財宝']
}

const rank = {
  sworn: ['Sworn', 'Solidarisch', 'Assermenté', '誓約'],
  bloodsworn: ['Bloodsworn', 'Solidarisch', 'Assermenté', '?Bloodsworn?'],
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
const goldChocoboFeather = ["Gold Chocobo Feather", "Goldene Chocobo-Feder", "Penne de chocobo doré", "ゴールドチョコボの羽根"];
const clanMarkLogs = ["Clan Mark Log", "Clan-Jägertagebuch", "Journal de membre du clan", "クラン員の手記"];
const ironVoyageSpoil = ["Iron Voyage Spoil", "Eisen-Expeditionsandenken", "Espoille d'expédition en fonte", "ボイジャースポイル:鋳鉄"];
const goddessTotem = ["Goddess Totem", "Sophia-Totem", "Totem sophique", "女神のトーテム像"];
const expanseTotem = ["Expanse Totem", "Bismarck-Totem", "Totem des brumes", "雲神のトーテム像"];
const hiveTotem = ["Hive Totem", "Ravana-Totem", "Totem des lames", "武神のトーテム像"];
const heavensWardHelmFragment = ["Heavens' Ward Helm Fragment", "Azurgarden-Helmfragment", "Fragment de casque de l'Azur", "蒼天の甲冑片"];
const fiendTotem = ["Fiend Totem", "Sephirot-Totem", "Totem séphirotique", "魔神のトーテム像"];
const hordeTotem = ["Horde Totem", "Horden-Totem", "Totem de la haine millénaire", "邪竜のトーテム像"];
const demonTotem = ["Demon Totem", "Zurvan-Totem", "Totem zurvanique", "鬼神のトーテム像"];
const feastSeason3Lone = ["Season Three Lone Wolf Voucher C", "Preiscoupon C des einsamen Wolfes (3. Saison)", "Certificat de finaliste solitaire S3", "強者の証S3[ソロ]"];
const feastSeason3Pack = ["Season Three Pack Wolf Voucher C", "Preiscoupon C des Rudelwolfes (3. Saison)", "Certificat de finaliste de meute S3", "強者の証S3[パーティ]"];
const feastSeason4Lone = ["Season Four Lone Wolf Voucher C", "Preiscoupon C des einsamen Wolfes (4. Saison)", "Certificat de finaliste solitaire S4", "強者の証S4[ソロ]"];
const feastSeason4Pack = ["Season Four Pack Wolf Voucher C", "Preiscoupon C des Rudelwolfes (4. Saison)", "Certificat de finaliste de meute S4", "強者の証S4[パーティ]"];
const feastSeason7Pack = ["Season Seven Pack Wolf Voucher C", "Preiscoupon C des Rudelwolfes (7. Saison)", "Certificat de finaliste du festin S7", "強者の証S7"];
const blissTotem = ["Bliss Totem", "Lakshmi-Totem", "Totem de la beauté", "美神のトーテム像"];
const revelTotem = ["Revel Totem", "Susano-Totem", "Totem des tempêtes", "豪神のトーテム像"];
const shinryuTotem = ["Shinryu Totem", "Shinryu-Totem", "Totem draconique divin", "神龍のトーテム像"];



const craftItem = {
  cloudsbreath: {
    icon: 20791,
    name: ["Cloudsbreath", "Pustewolken", "Jasmin céleste", "ウキグモソウ"]
  },
  lightningCluster: {
    icon: 18,
    name: ["Lightning Cluster", "Blitzpolykristall", "Agrégat de foudre", "ライトニングクラスター"]
  },
  rivieraArmchair: {
    icon: 6529,
    name: ["Riviera Armchair", "Riviera-Polstersessel", "Fauteuil noscéen", "ラノシアン・ソファー"]
  },
  waterCluster: {
    icon: 19,
    name: ["Water Cluster", "Wasserpolykristall", "Agrégat d'eau", "ウォータークラスター"]
  }
}

const location = {
  apkalluFalls: ['Apkallu Falls', 'Apkallu-Fälle', 'Chutes De L\'Apkallu', 'アプカル滝'],
  azysLla: ["Azys Lla", true, true, "アジス・ラー"],
  dhoroIloh: ["Dhoro Iloh", true, true, "ドーロ・イロー"],
  easternLaNoscea: ['Eastern La Noscea', 'Östliches La Noscea', 'Noscea Orientale', '東ラノシア'],
  eastShroud: ['East Shroud', 'Ostwald', 'Forêt De L\'est', '黒衣森：東部森林'],
  eurekaAnemos: ["Eureka Anemos", "Eureka Anemos", "Eurêka Anemos", "エウレカ：アネモス帯"],
  fortempsManor: ["Fortemps Manor", "Anwesen Der Fortemps", "Manoir Des Fortemps", "フォルタン伯爵邸"],
  foundation: ["Foundation", "Fundamente", "Ishgard - L'Assise", "イシュガルド：下層"],
  idyllshire: ["Idyllshire", "Frohehalde", "Idyllée", "イディルシャイア"],
  limsaUpperDecks: ['Limsa Lominsa Upper Decks', 'Obere Decks', 'Limsa Lominsa - Le Tillac', 'リムサ・ロミンサ：上甲板層'],
  mist: ["Mist", "Dorf Des Nebels", "Brumée", "ミスト・ヴィレッジ"],
  morDhona: ["Mor Dhona", true, true, "モードゥナ"],
  newGridania: ['New Gridania', 'Neu-Gridania', 'Nouvelle Gridania', 'グリダニア：新市街'],
  northShroud: ['North Shroud', 'Nordwald', 'Forêt Du Nord', '黒衣森：北部森林'],
  northernThanalan: ['Northern Thanalan', 'Nördliches Thanalan', 'Thanalan Septentrional', '北ザナラーン'],
  oldGridania: ['Old Gridania', 'Alt-Gridania', 'Vieille Gridania', 'グリダニア：旧市街'],
  outerLaNoscea: ['Outer La Noscea', 'Äußeres La Noscea', 'Noscea Extérieure', '地ラノシア'],
  rhalgrsReach: ["Rhalgr's Reach", "Rhalgrs Wacht", "Temple Du Poing (entrée)", "ラールガーズリーチ"],
  shirogane: ["Shirogane", true, true, "シロガネ"],
  southernThanalan: ['Southern Thanalan', 'Südliches Thanalan', 'Thanalan Méridional', '南ザナラーン'],
  theAzimSteppe: ["The Azim Steppe", "Azim-Steppe", "Steppe D'Azim", "アジムステップ"],
  theFringes: ["The Fringes", "Abanisches Grenzland", "Les Marges", "ギラバニア辺境地帯"],
  theGoblet: ["The Goblet", "Kelchkuppe", "La Coupe", "ゴブレットビュート"],
  theGoldSaucer: ['The Gold Saucer', 'Gold Saucer', 'Gold Saucer', 'ゴールドソーサー'],
  theLavenderBeds: ["The Lavender Beds", "Lavendelbeete", "Lavandière", "ラベンダーベッド"],
  thePalaceOfTheDead: ['The Palace of the Dead', 'Palast Der Toten', 'Palais Des Morts', '死者の宮殿'],
  thePillars: ["The Pillars", "Strebewerk", "Ishgard - Les Contreforts", "イシュガルド：上層"],
  theRubySea: ["The Ruby Sea", "Rubinsee", "Mer De Rubis", "紅玉海"],
  theSeaOfClouds: ["The Sea Of Clouds", "Abalathisches Wolkenmeer", "L'Écume Des Cieux D'Abalathia", "アバラシア雲海"],
  uldahStepsOfNald: ['Ul\'dah - Steps of Nald', 'Nald-Kreuzgang', 'Ul\'dah - Faubourg de Nald', 'ウルダハ：ナル回廊'],
  uldahStepsOfThal: ['Ul\'dah - Steps of Thal', 'Thal-Kreuzgang', 'Ul\'dah - Faubourg De Thal', 'ウルダハ：ザル回廊'],
  westernLaNoscea: ['Western La Noscea', 'Westilches La Noscea', 'Noscea Occidentale', '西ラノシア'],
  wolvesDenPier: ["Wolves' Den Pier", "Wolfshöhlen-Pier", "Jetée De L'Antre Des Loups", "ウルヴズジェイル係船場"],
  duty: {
    akhAfahAmphitheatre: ["Akh Afah Amphitheatre (Extreme)", "Zenit Der Götter - Shiva", "L'Amphithéâtre D'Akh Afah (extrême)", "極シヴァ討滅戦"],
    alaMhigo: ["Ala Mhigo", "Ala Mhigo", "Ala Mhigo", "紅蓮決戦 アラミゴ"],
    alexanderTheBurdenOfTheFatherSavage: ["Alexander - The Burden Of The Father (Savage)", "Alexander - Last Des Vaters (episch)", "Alexander - Le Fardeau Du Père (sadique)", "機工城アレキサンダー零式：起動編4"],
    alexanderTheSoulOfTheCreatorSavage: ["Alexander - The Soul Of The Creator (Savage)", "Alexander - Seele Des Schöpfers (episch)", "Alexander - L'Âme Du Créateur (sadique)", "機工城アレキサンダー零式：天動編4"],
    containmentBayP1T6Extreme: ["Containment Bay P1T6 (Extreme)", "Zenit Der Götter - Sophia", "Unité De Contention P1P6 (extrême)", "極女神ソフィア討滅戦"],
    containmentBayS1T7Extreme: ["Containment Bay S1T7 (Extreme)", "Zenit Der Götter - Sephirot", "Unité De Contention S1P7 (extrême)", "極魔神セフィロト討滅戦"],
    containmentBayZ1T9Extreme: ["Containment Bay Z1T9 (Extreme)", "Zenit Der Götter - Zurvan", "Unité De Contention Z1P9 (extrême)", "極鬼神ズルワーン討滅戦"],
    deltascapev40Savage: ["Deltascape V4.0 (Savage)", "Deltametrie 4.0 (episch)", "Deltastice V4.0 (sadique)", "次元の狭間オメガ零式：デルタ編4"],
    emanationExtreme: ["Emanation (Extreme)", "Zenit Der Götter - Lakshmi", "Émanation (extrême)", "極ラクシュミ討滅戦"],
    sigmascapev40Savage: ["Sigmascape V4.0 (Savage)", "Sigmametrie 4.0 (episch)", "Sigmastice V4.0 (sadique)", "次元の狭間オメガ零式：シグマ編4"],
    theBowlOfEmbersExtreme: ["The Bowl Of Embers (Extreme)", "Zenit Der Götter - Ifrit", "Le Cratère Des Tisons (extrême)", "極イフリート討滅戦"],
    theHowlingEyeExtreme: ["The Howling Eye (Extreme)", "Zenit Der Götter - Garuda", "Hurlœil (extrême)", "極ガルーダ討滅戦"],
    theJadeStoa: ["The Jade Stoa (Extreme)", "Seelensturm - Byakko", "La Clairière De Jade (extrême)", "極白虎征魂戦"],
    theLimitlessBlueExtreme: ["The Limitless Blue (Extreme)", "Zenit Der Götter - Bismarck", "L'Immensité Bleue (extrême)", "極ビスマルク討滅戦"],
    theMinstrelsBalladNidhoggsRage: ["The Minstrel's Ballad: Nidhogg's Rage", "Das Lied Von Nidhoggs Letztem Ruf", "L'ire De Nidhogg", "極ニーズヘッグ征竜戦"],
    theMinstrelsBalladShinryusDomain: ["The Minstrel's Ballad: Shinryu's Domain", "Heldenlied Von Shinryu", "Le Domaine De Shinryu", "極神龍討滅戦"],
    theMinstrelsBalladTsukuyomisPain: ["The Minstrel's Ballad: Tsukuyomi's Pain", "Zenit Der Götter - Tsukuyomi", "Castrum Fluminis (extrême)", "極ツクヨミ討滅戦"],
    theMinstrelsBalladThordensReign: ["The Minstrel's Ballad: Thordan's Reign", "Heldenlied Von Thordans Fall", "Le Règne De Thordan", "蒼天幻想 ナイツ・オブ・ラウンド討滅戦"],
    theNavelExtreme: ["The Navel (Extreme)", "Zenit Der Götter - Titan", "Le Nombril (extrême)", "極タイタン討滅戦"],
    thePoolOfTributeExtreme: ["The Pool Of Tribute (Extreme)", "Zenit Der Götter - Susano", "La Crique Aux Tributs (extrême)", "極スサノオ討滅戦"],
    theStrikingTreeExtreme: ["The Striking Tree (Extreme)", "Zenit Der Götter - Ramuh", "L'Arbre Du Jugement (extrême)", "極ラムウ討滅戦"],
    theWhorleaterExtreme: ["The Whorleater (Extreme)", "Zenit Der Götter - Leviathan", "Le Briseur De Marées (extrême)", "極リヴァイアサン討滅戦"],
    thokAstThokExtreme: ["Thok Ast Thok (Extreme)", "Zenit Der Götter - Ravana", "Thok Ast Thok (extrême)", "極ラーヴァナ討滅戦"]
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
  goldChocoboFeatherExchange: (cost) => {
    return [
      o(
        'goldChocoboFeather',
        [
          cost, goldChocoboFeather, goldChocoboFeatherImage,
          ["Calamity Salvager", "Fundsachen-Verwalter", "Consigneur", "遺失物管理人"],
          ["(Chocobo Feather Exchange I)", "(Chocobo-Federn I)", "(Plumes De Chocobo (1))", "(特殊チョコボの羽根の取引（その1）)"],
          locationImage,
          location.oldGridania,
          10, 8.4,
          locale('Recruit a Friend Campaign')
        ],
        expansions.ARR,
        true,
        true
      ),
      o(
        'goldChocoboFeather',
        [
          cost, goldChocoboFeather, goldChocoboFeatherImage,
          ["Calamity Salvager", "Fundsachen-Verwalter", "Consigneur", "遺失物管理人"],
          ["(Chocobo Feather Exchange I)", "(Chocobo-Federn I)", "(Plumes De Chocobo (1))", "(特殊チョコボの羽根の取引（その1）)"],
          locationImage,
          location.limsaUpperDecks,
          11.4, 14.4,
          locale('Recruit a Friend Campaign')
        ],
        expansions.ARR,
        true,
        true
      ),
      o(
        'goldChocoboFeather',
        [
          cost, goldChocoboFeather, goldChocoboFeatherImage,
          ["Calamity Salvager", "Fundsachen-Verwalter", "Consigneur", "遺失物管理人"],
          ["(Chocobo Feather Exchange I)", "(Chocobo-Federn I)", "(Plumes De Chocobo (1))", "(特殊チョコボの羽根の取引（その1）)"],
          locationImage,
          location.uldahStepsOfThal,
          12.7, 13.2,
          locale('Recruit a Friend Campaign')
        ],
        expansions.ARR,
        true,
        true
      )
    ]
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
  legacyGift: (level, npc, loc, x, y, expansion) => {
    return o(
      'legacyGift',
      [level, npc, locationImage, loc, x, y],
      expansion,
      false,
      false
    )
  },
  legacyStatus: () => {
    return o(
      'legacyStatus',
      [],
      expansions.ARR,
      false,
      true
    )
  },
  recruitAFriend: () => {
    return o(
      'recruitAFriend',
      [locale('Recruit a Friend Campaign')],
      expansions.ARR,
      true,
      false
    )
  },
  promotional: (event, expansion) => {
    return o(
      'promotional',
      [event],
      expansion,
      false,
      true
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
  questAfterMount: (level, type, quest, npc, loc, x, y, mountArray, expansion, available, promo) => {
    return o(
      'questAfterMount',
      [level, type, questImage, quest, npc, locationImage, loc, x, y],
      expansion,
      available,
      promo,
      {
        mounts: mountArray.map(id => {
          const mount = mounts.filter(mount => mount.id === id)[0];
          return {
            id: id,
            name: {
              de: mount.name_de,
              en: mount.name_en,
              fr: mount.name_fr,
              jp: mount.name_ja
            }
          };
        })
      }
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
}

let value;

/* Returns information about how minions are obtained.
 * Corresponds to ../../docs/obtainMethods.json.
 */
module.exports = (mount, achievementsIn, mountsIn) => {
  achievements = achievementsIn;
  mounts = mountsIn;
  switch (+mount.id) {
    case 1:
      return [
        helper.quest(
          20,
          locale('Gridanian Sidequests'),
          ["My Little Chocobo (Twin Adder)", "Mein Eigener Chocobo (Bruderschaft Der Morgenviper)", "À Chacun Sa Monture (Gridania)", "念願のマイチョコボ（双蛇党）"],
          ["Vorsaile Heuloix", true, true, "ボルセル大牙佐"],
          location.newGridania,
          9.7, 11.1,
          expansions.ARR,
          true,
          false
        ),
        helper.quest(
          20,
          locale('Lominsan Sidequests'),
          ["My Little Chocobo (Maelstrom)", "Mein Eigener Chocobo (Mahlstrom)", "À Chacun Sa Monture (Limsa Lominsa)", "念願のマイチョコボ（黒渦団）"],
          ["R'ashaht Rhiki", true, true, "ル・アシャ大甲佐"],
          location.limsaUpperDecks,
          13, 13,
          expansions.ARR,
          true,
          false
        ),
        helper.quest(
          20,
          locale('Ul\'dahn Sidequests'),
          ["My Little Chocobo (Immortal Flames)", "Mein Eigener Chocobo (Legion Der Unsterblichen)", "À Chacun Sa Monture (Ul'dah)", "念願のマイチョコボ（不滅隊）"],
          ["Swift", true, "Swift Ryder", "スウィフト大闘佐"],
          location.uldahStepsOfNald,
          8.4, 9,
          expansions.ARR,
          true,
          false
        )
      ];
    
    case 4:
      return helper.legacyGift(
        30,
        ["Wandering Minstrel", "Fahrend[a] Sänger", "Ménestrel Errant", "異邦の詩人"],
        location.easternLaNoscea,
        36, 25,
        expansions.Legacy
      );
    
    case 5:
      return helper.legacyStatus();
    
    case 6:
      return helper.msq(
        50,
        locale('Seventh Umbral Era'),
        ["The Ultimate Weapon", "Die Ultimative Waffe", "L'ultime Passe D'armes", "究極幻想アルテマウェポン"],
        ["Raubahn", true, "Raubahn Aldynn", "ラウバーン"],
        location.northernThanalan,
        15.6, 17,
        expansions.ARR,
        true,
        false
      );
    
    case 8:
    case 25:
      return [
        helper.collectorsEdition(locale('Legacy (1.0)'), expansions.Legacy, false),
        helper.collectorsEdition(locale('A Realm Reborn'), expansions.ARR, true)
      ];

    case 9:
      return [
        helper.veteranReward(90),
        helper.achievementCertificate(6)
      ];
    
    case 15:
      return helper.quest(
        30,
        locale('Gridanian Sidequests'),
        ["Unicorn Power", "Ein Einzigartiges Pferd", "Ma Petite Licorne", "我が唯一つの望み"],
        ["Braya", true, true, "ブレイヤ"],
        location.oldGridania,
        6.4, 11.1,
        expansions.ARR,
        true,
        false
      );

    case 18:
      return [
        helper.veteranReward(270),
        helper.achievementCertificate(6)
      ];
    
    case 19:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.amaljaa,
          120000, gil, gilImage,
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
    
    case 20:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.sylph,
          120000, gil, gilImage,
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
    
    case 21:
      return helper.achievementReward(862, expansions.ARR, true, false);
    
    case 22:
      return [
        helper.trial(location.duty.theBowlOfEmbersExtreme, 50, expansions.ARR, true, false),
        helper.trial(location.duty.theHowlingEyeExtreme, 50, expansions.ARR, true, false),
        helper.trial(location.duty.theNavelExtreme, 50, expansions.ARR, true, false)
      ];
    
    case 26:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.sahagin,
          120000, gil, gilImage,
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
    
    case 27:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.kobold,
          120000, gil, gilImage,
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
    
    case 28:
      return helper.trial(location.duty.theBowlOfEmbersExtreme, 50, expansions.ARR, true, false);
    
    case 29:
      return helper.trial(location.duty.theHowlingEyeExtreme, 50, expansions.ARR, true, false);
    
    case 30:
      return helper.trial(location.duty.theNavelExtreme, 50, expansions.ARR, true, false);
    
    case 31:
      return helper.trial(location.duty.theWhorleaterExtreme, 50, expansions.ARR, true, false);
    
    case 32:
      return helper.achievementReward(921, expansions.ARR, true, false);
    
    case 33:
      return helper.achievementReward(924, expansions.ARR, true, false);
    
    case 34:
      return helper.recruitAFriend();
    
    case 35:
      return o(
        'beastTribe',
        [
          rank.sworn,
          beastTribe.ixal,
          120000, gil, gilImage,
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
    
    case 36:
      return helper.achievementReward(939, expansions.ARR, true, false);
    
    case 37:
      return helper.achievementReward(945, expansions.ARR, true, false);
    
    case 38:
      return helper.achievementReward(951, expansions.ARR, true, false);
    
    case 40:
      return helper.trial(location.duty.theStrikingTreeExtreme, 50, expansions.ARR, true, false);
    
    case 41:
      return helper.quest(
        1,
        locale('Special Quests'),
        ["The Ties That Bind", "Ein Bund Fürs Leben", "Jusqu'à Ce Que Le Destin Vous Sépare", "時がふたりを分かつまで"],
        ["Claribel", true, true, "介添人 クラリベル"],
        location.eastShroud,
        17.6, 18.3,
        expansions.ARR,
        true,
        true
      );
    
    case 42:
    case 68:
    case 69:
    case 74:
    case 84:
    case 97:
    case 135:
    case 138:
    case 139:
      return helper.mogStation();
    
    case 43:
      return helper.trial(location.duty.akhAfahAmphitheatre, 50, expansions.ARR, true, false);

    case 44:
      return helper.achievementReward(1036, expansions.ARR, true, false);
    
    case 45:
      return helper.msq(
        50,
        locale('Heavensward'),
        ["Divine Intervention", "Das Gottesurteil", "Les Chevaliers De L'Azur", "蒼天の騎士"],
        ["House Fortemps Steward", "Diener[p] Der Fortemps", "Majordome Des Fortemps", "フォルタン家の家令"],
        location.fortempsManor,
        6.2, 6.2,
        expansions.HW,
        true,
        false
      );

    case 46:
      return helper.goldSaucerPrizeExchange(200000);

    case 47:
      return helper.questAfterMount(
        1,
        locale('Mor Dhonan Sidequests'),
        ["A Legend For A Legend", "Eine Legende Für Eine Legende", "Qui Se Ressemble S'assemble", "麒麟、現世に降り立たん"],
        ["Wandering Minstrel", "Fahrend[a] Sänger", "Ménestrel Errant", "異邦の詩人"],
        location.morDhona,
        21.8, 8.8,
        [28, 43, 31, 30, 40, 29],
        expansions.ARR,
        true,
        false
      );

    case 48:
      return helper.achievementReward(1132, expansions.ARR, true, false);
    
    case 49:
      return helper.goldSaucerPrizeExchange(1000000);
    
    case 50:
      return helper.quest(
        1,
        locale('Heavensward'),
        ["Fetters Of Lament", "Fesseln Der Reue", "Un Dragon Aux Fers", "翼、広げて"],
        ["Guidance Node", "Wegleitsystem", "Sphère De Guidage", "誘導システム"],
        location.azysLla,
        18.6, 31.7,
        expansions.HW,
        true,
        false
      );

    case 52:
    case 93:
      return helper.goldChocoboFeatherExchange(8);

    case 53:
      return o(
        'beastTribe',
        [
          rank.sworn,
          beastTribe.vanuVanu,
          200000, gil, gilImage,
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

    case 54:
      return helper.collectorsEdition(locale('Heavensward'), expansions.HW, true);
    
    case 55:
      return helper.msq(
        55,
        locale('Heavensward'),
        ["Into The Aery", "Mit Den Augen Eines Drachen", "La Colère Du Dragon", "邪竜狩り"],
        ["Estinien", true, true, "エスティニアン"],
        location.foundation,
        13.4, 11.1,
        expansions.HW,
        true,
        false
      );

    case 56:
      return helper.achievementReward(1195, expansions.HW, true, false);
    
    case 58:
      return helper.raid(location.duty.alexanderTheBurdenOfTheFatherSavage, 60, expansions.HW, true, false);

    case 59:
      return helper.goldChocoboFeatherExchange(15);
    
    case 62:
      return [
        helper.eventQuest(
          20,
          ["Sweeping The Meadows", "Aufgeflogen!", "Aux Diables Les Coups De Balai!", "おかしなホウキと守護天節"],
          'eq1',
          expansions.ARR
        ),
        helper.mogStation()
      ];
    
    case 67:
      return o(
        'purchase',
        [
          99, brassSkyPirateSpoils, brassSkyPirateSpoilsImage,
          _npc.spoilsCollector,
          ["(Spoils Exchange (Other))", "(Messing-/Stahl-Piratenandenken (Anderes))", "(Espoilles En Acier/laiton (autres))", "(スポイル：真鍮・鋼鉄の取引（その他）)"],
          locationImage,
          location.thePillars,
          26.1, 22.3
        ],
        expansions.HW,
        true,
        false
      );
    
    case 70:
      return o(
        'purchase',
        [
          6, clanMarkLogs, clanMarkLogsImage,
          ["Bertana", true, true, "ベルタナ"],
          ["(Uncanny Knickknacks)", "(Gegenstände)", "(Objets (divers))", "(アイテムの取引（その他）)"],
          locationImage,
          location.idyllshire,
          5.8, 5.2
        ],
        expansions.HW,
        true,
        false
      );
    
    case 72:
      return o(
        'beastTribe',
        [
          rank.trusted,
          beastTribe.vath,
          200000, gil, gilImage,
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
    
    case 73:
      return [
        o(
          'purchase',
          [
            1, ironVoyageSpoil, ironVoyageSpoilImage,
            ["Resident Caretaker", "Unterkunftsbeamt[a]", "Officier Du Logement", "居住区担当官"],
            ["(Items Of Interest)", "(Gegenstände)", "(Objets)", "(アイテムの取引)"],
            locationImage,
            location.theLavenderBeds,
            11.9, 8.3
          ],
          expansions.HW,
          true,
          false
        ),
        o(
          'purchase',
          [
            1, ironVoyageSpoil, ironVoyageSpoilImage,
            ["Resident Caretaker", "Unterkunftsbeamt[a]", "Officier Du Logement", "居住区担当官"],
            ["(Items Of Interest)", "(Gegenstände)", "(Objets)", "(アイテムの取引)"],
            locationImage,
            location.mist,
            11.4, 11.3
          ],
          expansions.HW,
          true,
          false
        ),
        o(
          'purchase',
          [
            1, ironVoyageSpoil, ironVoyageSpoilImage,
            ["Resident Caretaker", "Unterkunftsbeamt[a]", "Officier Du Logement", "居住区担当官"],
            ["(Items Of Interest)", "(Gegenstände)", "(Objets)", "(アイテムの取引)"],
            locationImage,
            location.theGoblet,
            11.3, 9.4
          ],
          expansions.HW,
          true,
          false
        ),
        o(
          'purchase',
          [
            1, ironVoyageSpoil, ironVoyageSpoilImage,
            ["Resident Caretaker", "Unterkunftsbeamt[a]", "Officier Du Logement", "居住区担当官"],
            ["(Items Of Interest)", "(Gegenstände)", "(Objets)", "(アイテムの取引)"],
            locationImage,
            location.shirogane,
            0, 0
          ],
          expansions.HW,
          true,
          false
        ),
        o(
          'purchase',
          [
            1, ironVoyageSpoil, ironVoyageSpoilImage,
            _npc.spoilsCollector,
            ["(Spoils Exchange (Other))", "(Messing-/Stahl-Piratenandenken (Anderes))", "(Espoilles En Acier/laiton (autres))", "(スポイル：真鍮・鋼鉄の取引（その他）)"],
            locationImage,
            location.thePillars,
            26.1, 22.3
          ],
          expansions.HW,
          true,
          false
        )
      ];
    
    case 75:
      return [
        helper.trial(location.duty.theLimitlessBlueExtreme, 60, expansions.HW, true, false),
        o(
          'purchase',
          [
            99, expanseTotem, totemImage,
            ["Bertana", true, true, "ベルタナ"],
            ["(Uncanny Knickknacks)", "(Gegenstände)", "(Objets (divers))", "(アイテムの取引（その他）)"],
            locationImage,
            location.idyllshire,
            5.8, 5.2
          ],
          expansions.HW,
          true,
          false
        )
      ];
    
    case 76:
      return [
        helper.trial(location.duty.thokAstThokExtreme, 60, expansions.HW, true, false),
        o(
          'purchase',
          [
            99, hiveTotem, totemImage,
            ["Bertana", true, true, "ベルタナ"],
            ["(Uncanny Knickknacks)", "(Gegenstände)", "(Objets (divers))", "(アイテムの取引（その他）)"],
            locationImage,
            location.idyllshire,
            5.8, 5.2
          ],
          expansions.HW,
          true,
          false
        )
      ];
    
    case 77:
      return [
        helper.trial(location.duty.theMinstrelsBalladThordensReign, 60, expansions.HW, true, false),
        o(
          'purchase',
          [
            99, heavensWardHelmFragment, heavensWardHelmFragmentImage,
            ["Bertana", true, true, "ベルタナ"],
            ["(Uncanny Knickknacks)", "(Gegenstände)", "(Objets (divers))", "(アイテムの取引（その他）)"],
            locationImage,
            location.idyllshire,
            5.8, 5.2
          ],
          expansions.HW,
          true,
          false
        )
      ];
    
    case 78:
      return [
        helper.trial(location.duty.containmentBayS1T7Extreme, 60, expansions.HW, true, false),
        o(
          'purchase',
          [
            99, fiendTotem, totemImage,
            ["Bertana", true, true, "ベルタナ"],
            ["(Uncanny Knickknacks)", "(Gegenstände)", "(Objets (divers))", "(アイテムの取引（その他）)"],
            locationImage,
            location.idyllshire,
            5.8, 5.2
          ],
          expansions.HW,
          true,
          false
        )
      ];
    
    case 80:
      return helper.achievementReward(1444, expansions.HW, true, false);

    case 81:
      return [
        helper.promotional('いろはす討滅戦2017', expansions.ARR),
        helper.promotional('FFXIV and Amazon.com® Free DLC Giveaway', expansions.ARR),
        helper.promotional('Dr Pepper-Kampagne!', expansions.ARR),
        helper.promotional('Final Fantasy XIV Events with O2', expansions.ARR)
      ];

    case 82:
      return [
        helper.promotional('FF14×セブンイレブンコラボ ', expansions.ARR),
        helper.promotional('FFXIV and Amazon.com® Summer DLC Campaign', expansions.ARR),
        helper.promotional('In-Game Item Campaign with GamesMaster Magazine', expansions.ARR),
        helper.promotional('ShopTo In-Game Item Campaign', expansions.ARR)
      ];
    
    case 83:
      return helper.achievementReward(1604, expansions.HW, true, false);
    
    case 86:
      return o(
        'beastTribe',
        [
          rank.sworn,
          beastTribe.moogle,
          200000, gil, gilImage,
          _npc.mogmulMogbelly,
          ['(Purchase Items (Sworn))', '(Waren (Solidarisch))', '(Objets (rang Assermenté))', '(アイテムの取引(友好関係：誓約))'],
          locationImage,
          location.theChurningMists,
          16, 28.5
        ],
        expansions.HW,
        true,
        false
      );
    
    case 87:
      return helper.achievementReward(1573, expansions.ARR, false, true);
    
    case 90:
      return [
        helper.trial(location.duty.theMinstrelsBalladNidhoggsRage, 60, expansions.HW, true, false),
        o(
          'purchase',
          [
            99, hordeTotem, totemImage,
            ["Bertana", true, true, "ベルタナ"],
            ["(Uncanny Knickknacks)", "(Gegenstände)", "(Objets (divers))", "(アイテムの取引（その他）)"],
            locationImage,
            location.idyllshire,
            5.8, 5.2
          ],
          expansions.HW,
          true,
          false
        )
      ];
    
    case 91:
      return helper.achievementReward(1563, expansions.HW, true, false);
    
    case 92:
      return o(
        'purchase',
        [
          10, gelmorranPotsherd, gelmorranPotsherdImage,
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
    
    case 94:
      return helper.achievementReward(1539, expansions.ARR, false, true);
    
    case 95:
      return helper.achievementReward(1771, expansions.HW, false, true);
    
    case 96:
      return helper.achievementReward(1772, expansions.HW, false, true);
    
    case 98:
      return [
        helper.trial(location.duty.containmentBayP1T6Extreme, 60, expansions.HW, true, false),
        o(
          'purchase',
          [
            99, goddessTotem, totemImage,
            ["Bertana", true, true, "ベルタナ"],
            ["(Uncanny Knickknacks)", "(Gegenstände)", "(Objets (divers))", "(アイテムの取引（その他）)"],
            locationImage,
            location.idyllshire,
            5.8, 5.2
          ],
          expansions.HW,
          true,
          false
        )
      ];

    case 99:
      return helper.eventQuest(
        15,
        ["Starlight Stakeout", "Bären Und Diebe Im Sternenlicht", "Les Brigands Enguirlandés", "盗人と熊の星芒祭"],
        'eq8',
        expansions.ARR
      );
    
    case 100:
      return helper.itemAccursedHoard(item.goldTrimmedSack);
    
    case 101:
      return helper.raid(location.duty.alexanderTheSoulOfTheCreatorSavage, 60, expansions.HW, true, false);
    
    case 102:
      return helper.achievementReward(1773, expansions.HW, false, true);
    
    case 104:
      return [
        helper.trial(location.duty.containmentBayZ1T9Extreme, 60, expansions.HW, true, false),
        o(
          'purchase',
          [
            99, demonTotem, totemImage,
            ["Bertana", true, true, "ベルタナ"],
            ["(Uncanny Knickknacks)", "(Gegenstände)", "(Objets (divers))", "(アイテムの取引（その他）)"],
            locationImage,
            location.idyllshire,
            5.8, 5.2
          ],
          expansions.HW,
          true,
          false
        )
      ];

    case 105:
      return helper.questAfterMount(
        1,
        locale('Dravanian Sidequests'),
        ["Fiery Wings, Fiery Hearts", "Der König Der Lüfte", "Une Brûlante Amitié", "鳳凰、現世に飛来せり"],
        ["Wandering Minstrel", "Fahrend[a] Sänger", "Ménestrel Errant", "異邦の詩人"],
        location.idyllshire,
        12.7, 11.3,
        [75, 76, 77, 78, 90, 98, 104],
        expansions.HW,
        true,
        false
      );

    case 106:
      return helper.eventQuest(
        15,
        ["Eggsistential Crisis", "Ein Unbezahlbares Juwel", "Riggy, Il S'appelle Riggy", "エッグハントが生む宝石"],
        'eq7',
        expansions.ARR
      );

    case 108:
      return o(
        'purchase',
        [
          1, feastSeason3Lone, feastSeasonItemImage,
          ["Feast Quartermaster", "Versorgungsoffizier[p] Des Mahlstroms", "Officier Magasinier Du Maelstrom", "シーズン報酬支給官"],
          ["(Prize Exchange I)", "(Gewinne I", "Lots (1))", "(景品の交換（その1）)"],
          locationImage,
          location.wolvesDenPier,
          4.8, 5.8
        ],
        expansions.HW,
        false,
        false
      );

    case 109:
      return o(
        'purchase',
        [
          1, feastSeason3Pack, feastSeasonItemImage,
          ["Feast Quartermaster", "Versorgungsoffizier[p] Des Mahlstroms", "Officier Magasinier Du Maelstrom", "シーズン報酬支給官"],
          ["(Prize Exchange I)", "(Gewinne I", "Lots (1))", "(景品の交換（その1）)"],
          locationImage,
          location.wolvesDenPier,
          4.8, 5.8
        ],
        expansions.HW,
        false,
        false
      );

    case 110:
    case 142:
      return helper.goldSaucerPrizeExchange(750000);
    
    case 111:
      return helper.collectorsEdition(locale('Stormblood'), expansions.SB, true);

    case 112:
      return helper.promotional(
        ['Fly the Falcon Mount Campaign', 'Reittier-Kampagne: "Der Falke"', 'Campagne monture mini aéronef Faucon', 'マウント「ファルコン号」GET!キャンペーン'],
        expansions.ARR
      );

    case 113:
      return o(
        'purchase',
        [
          1, feastSeason4Lone, feastSeasonItemImage,
          ["Feast Quartermaster", "Versorgungsoffizier[p] Des Mahlstroms", "Officier Magasinier Du Maelstrom", "シーズン報酬支給官"],
          ["(Prize Exchange I)", "(Gewinne I", "Lots (1))", "(景品の交換（その1）)"],
          locationImage,
          location.wolvesDenPier,
          4.8, 5.8
        ],
        expansions.HW,
        false,
        false
      );

    case 114:
      return o(
        'purchase',
        [
          1, feastSeason4Pack, feastSeasonItemImage,
          ["Feast Quartermaster", "Versorgungsoffizier[p] Des Mahlstroms", "Officier Magasinier Du Maelstrom", "シーズン報酬支給官"],
          ["(Prize Exchange I)", "(Gewinne I", "Lots (1))", "(景品の交換（その1）)"],
          locationImage,
          location.wolvesDenPier,
          4.8, 5.8
        ],
        expansions.HW,
        false,
        false
      );

    case 115:
      return [
        helper.trial(location.duty.emanationExtreme, 70, expansions.SB, true, false),
        o(
          'purchase',
          [
            99, blissTotem, blissTotemImage,
            ["Eschina", true, true, "エシナ"],
            ["(Wondrous Sundries)", "(Gegenstände)", "(Objets)", "（アイテムの取引）"],
            locationImage,
            location.rhalgrsReach,
            13.9, 11.8
          ],
          expansions.SB,
          true,
          false
        )
      ];

    case 116:
      return [
        helper.trial(location.duty.thePoolOfTributeExtreme, 70, expansions.SB, true, false),
        o(
          'purchase',
          [
            99, revelTotem, revelTotemImage,
            ["Eschina", true, true, "エシナ"],
            ["(Wondrous Sundries)", "(Gegenstände)", "(Objets)", "（アイテムの取引）"],
            locationImage,
            location.rhalgrsReach,
            13.9, 11.8
          ],
          expansions.SB,
          true,
          false
        )
      ];

    case 121:
      return helper.dungeon(location.duty.alaMhigo, 70, null, null, expansions.SB, true, false);
    
    case 122:
      return helper.achievementReward(1955, expansions.SB, true, false);
    
    case 123:
      return helper.achievementReward(1958, expansions.SB, true, false);
    
    case 124:
      return helper.achievementReward(1961, expansions.SB, true, false);
    
    case 125:
      return helper.msq(
        65,
        locale('Stormblood'),
        ["In The Footsteps Of Bardam The Brave", "Der Weg Zum Naadam", "La Force De Bardam", "試練のバルダム覇道"],
        ["Hien", true, true, "ヒエン"],
        location.theAzimSteppe,
        11.3, 11.2,
        expansions.SB,
        true,
        false
      );
    
    case 126:
      return helper.raid(location.duty.deltascapev40Savage, 70, expansions.SB, true, false);
    
    case 127:
      return helper.achievementReward(1922, expansions.SB, true, false);

    case 130:
      return o(
        'purchase',
        [
          12, ixionHorn, ixionHornImage,
          ["Eschina", true, true, "エシナ"],
          ["(Wondrous Sundries)", "(Gegenstände)", "(Objets)", "（アイテムの取引）"],
          locationImage,
          location.rhalgrsReach,
          13.9, 11.8
        ],
        expansions.SB,
        true,
        false
      );

    case 133:
      return [
        helper.trial(location.duty.theMinstrelsBalladShinryusDomain, 70, expansions.SB, true, false),
        o(
          'purchase',
          [
            99, shinryuTotem, shinryuTotemImage,
            ["Eschina", true, true, "エシナ"],
            ["(Wondrous Sundries)", "(Gegenstände)", "(Objets)", "（アイテムの取引）"],
            locationImage,
            location.rhalgrsReach,
            13.9, 11.8
          ],
          expansions.SB,
          true,
          false
        )
      ];
    
    case 136:
      return o(
        'beastTribe',
        [
          rank.bloodsworn,
          beastTribe.kojin,
          12, kojinSango, kojinSangoImage,
          ["Shikitahe", "Shikitahe", "Shikitahe", "シキタヘ"],
          ["(Kojin Sango Exchange)", "(Kojin-Korallen)", "(Échange De Sango Kojin)", "(コウジン珊瑚貨の取引)"],
          locationImage,
          location.theRubySea,
          29.4, 16.9
        ],
        expansions.SB,
        true,
        false
      );

    case 140:
      return helper.craft(
        70,
        locale('Alchemist'),
        2,
        [
          { quantity: 30, ...craftItem.lightningCluster },
          { quantity: 30, ...craftItem.waterCluster },
          { quantity: 1, ...craftItem.rivieraArmchair },
          { quantity: 8, ...craftItem.cloudsbreath }
        ]
      );
    
    case 141:
      return helper.achievementReward(1939, expansions.SB, true, false);

    case 144:
      return helper.trial(location.duty.theJadeStoa, 70, expansions.SB, true, false);

    case 145:
      return helper.achievementCertificate(6);
    
    case 146:
      return o(
        'beastTribe',
        [
          rank.sworn,
          beastTribe.ananta,
          18, anantaDreamstaff, anantaDreamstaffImage,
          ["Madhura", true, true, "マドゥラ"],
          ["(Ananta Dreamstaff Exchange)", "(Ananta-Traumstäbe)", "(Échange De Barrettes Béatifiques Anantas)", "(アナンタ魔金錫貨の取引)"],
          locationImage,
          location.theFringes,
          20.9, 26.1
        ],
        expansions.SB,
        true,
        false
      );

    case 148:
      return o(
        'beastTribe',
        [
          rank.bloodsworn,
          beastTribe.ananta,
          18, anantaDreamstaff, anantaDreamstaffImage,
          ["Madhura", true, true, "マドゥラ"],
          ["(Ananta Dreamstaff Exchange)", "(Ananta-Traumstäbe)", "(Échange De Barrettes Béatifiques Anantas)", "(アナンタ魔金錫貨の取引)"],
          locationImage,
          location.theFringes,
          20.9, 26.1
        ],
        expansions.SB,
        true,
        false
      );

    case 150:
      return helper.itemAnemosLockbox();
    
    case 152:
    case 153:
      return [
        helper.eventQuest(
          15,
          ["Lessons In Love", "Lektionen Der Liebe", "L'apprentie Messagère De L'amour", "ヴァレンティオンデーと見習い伝道師"],
          'eq9',
          expansions.ARR
        ),
        helper.eventQuestPurchase(
          ["House Valentione Maid", "Dienstmädchen[p] Des Hauses Valention", "Soubrette Des Valention", "ヴァレンティオン家のメイド"],
          ['Valentione\'s Day 2018', 'Valentiontag 2018', 'La Valention 2018', 'ヴァレンティオンデー 2018'],
          expansions.ARR
        )
      ];
    
    case 156:
      return helper.raid(location.duty.sigmascapev40Savage, 70, expansions.SB, true, false);

    case 158:
      return helper.trial(location.duty.theMinstrelsBalladTsukuyomisPain, 70, expansions.SB, true, false);

    case 162:
      return o(
        'purchase',
        [
          1, feastSeason7Pack, feastSeasonItemImage,
          ["Feast Quartermaster", "Versorgungsoffizier[p] Des Mahlstroms", "Officier Magasinier Du Maelstrom", "シーズン報酬支給官"],
          ["(Prize Exchange I)", "(Gewinne I", "Lots (1))", "(景品の交換（その1）)"],
          locationImage,
          location.wolvesDenPier,
          4.8, 5.8
        ],
        expansions.HW,
        false,
        false
      );

    case 164:
      return o(
        'beastTribe',
        [
          rank.sworn,
          beastTribe.namazu,
          20, namazuKoban, namazuKobanImage,
          ["Gyosho", true, true, "ギョショウ"],
          ["(Namazu Koban Exchange)", "(Namazuo-Koban)", "(Échange de koban namazu)", "(ナマズオ小判の取引)"],
          locationImage,
          location.dhoroIloh,
          5.8, 23.5
        ],
        expansions.SB,
        true,
        false
      );
    
    case 168:
      return helper.achievementReward(2065, expansions.SB, true, false);

    default:
      console.log("Unknown method for mount " + mount.id);
      return null;
  }
}