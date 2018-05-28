const o = require('../_obtainMethods');
const getAchievement = require('../_getAchievement');
const locale = require('../_locale');

let achievements;
let emotes;

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

const location = {
  theGoldSaucer: ['The Gold Saucer', 'Gold Saucer', 'Gold Saucer', 'ゴールドソーサー']
}

const helper = {
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
  }
}

let value;

/* Returns information about how minions are obtained.
 * Corresponds to ../../docs/obtainMethods.json.
 */
module.exports = (emote, achievementsIn, emotesIn) => {
  achievements = achievementsIn;
  emotes = emotesIn;
  switch (+emote.id) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
    case 30:
    case 31:
    case 32:
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
    case 47:
    case 48:
    case 49:
    case 50:
    case 52:
    case 54:
    case 58:
    case 60:
    case 68:
    case 69:
    case 70:
    case 71:
    case 72:
    case 73:
    case 74:
    case 75:
    case 76:
    case 77:
    case 78:
    case 79:
    case 80:
    case 83:
    case 84:
    case 90:
    case 105:
    case 106:
    case 111:
    case 112:
    case 133:
    case 137:
    case 139:
    case 140:
    case 141:
    case 150:
    case 152:
    case 159:
    case 160:
    case 161:
    case 162:
    case 163:
    case 184:
      return helper.isDefault();

    case 55:
      return helper.grandCompany(
        locale('Maelstrom'),
        [55, 56, 57]
      );

    case 56:
      return helper.grandCompany(
        locale('Order of the Twin Adder'),
        [55, 56, 57]
      );
    
    case 57:
      return helper.grandCompany(
        locale('Immortal Flames'),
        [55, 56, 57]
      );
    
    case 59:
      return helper.msq(
        45,
        locale('Seventh Umbral Era'),
        ["Acting The Part", "Kenne Deinen Feind", "Garde à Vous Impérial", "偽りの敬礼"],
        ["Glaumunt", "Glaumunt", "Glaumunt", "グラウムント"],
        ["Mor Dhona", "Mor Dhona", "Mor Dhona", "モードゥナ"],
        22.6, 7.5,
        expansions.ARR,
        true,
        false
      );
    
    case 62:
      return helper.mogStation(emote.item);

    case 64:
      return o(
        'beastTribe',
        [
          rank.respected,
          beastTribe.ananta,
          5, anantaDreamstaff, anantaDreamstaffImage,
          ["Madhura", true, true, "マドゥラ"],
          ["(Ananta Dreamstaff Exchange)", "(Ananta-Traumstäbe)", "(Échange De Barrettes Béatifiques Anantas)", "(アナンタ魔金錫貨の取引)"],
          locationImage,
          ["The Fringes", "Abanisches Grenzland", "Les Marges", "ギラバニア辺境地帯"],
          20.9, 26.1,
          emote.item
        ],
        expansions.SB,
        true,
        false
      );

    case 81:
      return helper.goldSaucerPrizeExchange(20000, emote.item);

    case 118:
      return helper.goldSaucerPrizeExchange(80000, emote.item);

    default:
      console.log("Unknown method for emote " + emote.id);
      return null;
  }
}