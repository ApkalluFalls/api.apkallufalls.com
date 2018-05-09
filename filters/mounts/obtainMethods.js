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
  ananta: ["Ananta", true, true, "アナンタ"]
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

const location = {
  apkalluFalls: ['Apkallu Falls', 'Apkallu-Fälle', 'Chutes De L\'Apkallu', 'アプカル滝'],
  easternLaNoscea: ['Eastern La Noscea', 'Östliches La Noscea', 'Noscea Orientale', '東ラノシア'],
  limsaUpperDecks: ['Limsa Lominsa Upper Decks', 'Obere Decks', 'Limsa Lominsa - Le Tillac', 'リムサ・ロミンサ：上甲板層'],
  newGridania: ['New Gridania', 'Neu-Gridania', 'Nouvelle Gridania', 'グリダニア：新市街'],
  northernThanalan: ['Northern Thanalan', 'Nördliches Thanalan', 'Thanalan Septentrional', '北ザナラーン'],
  oldGridania: ['Old Gridania', 'Alt-Gridania', 'Vieille Gridania', 'グリダニア：旧市街'],
  uldahStepsOfNald: ['Ul\'dah - Steps of Nald', 'Nald-Kreuzgang', 'Ul\'dah - Faubourg de Nald', 'ウルダハ：ナル回廊'],
  duty: {
    theBowlOfEmbersExtreme: ["The Bowl Of Embers (Extreme)", "Zenit Der Götter - Ifrit", "Le Cratère Des Tisons (extrême)", "極イフリート討滅戦"],
    theHowlingEyeExtreme: ["The Howling Eye (Extreme)", "Zenit Der Götter - Garuda", "Hurlœil (extrême)", "極ガルーダ討滅戦"],
    theNavelExtreme: ["The Navel (Extreme)", "Zenit Der Götter - Titan", "Le Nombril (extrême)", "極タイタン討滅戦"],
    theWhorleaterExtreme: ["The Whorleater (Extreme)", "Zenit Der Götter - Leviathan", "Le Briseur De Marées (extrême)", "極リヴァイアサン討滅戦"]
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
      [],
      expansions.ARR,
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
module.exports = (mount, achievementsIn) => {
  achievements = achievementsIn;
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

    default:
      //console.log("Unknown method for minion " + minion.id);
      return null;
  }
}