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

const location = {
  limsaUpperDecks: ['Limsa Lominsa Upper Decks', 'Obere Decks', 'Limsa Lominsa - Le Tillac', 'リムサ・ロミンサ：上甲板層'],
  newGridania: ['New Gridania', 'Neu-Gridania', 'Nouvelle Gridania', 'グリダニア：新市街'],
  uldahStepsOfNald: ['Ul\'dah - Steps of Nald', 'Nald-Kreuzgang', 'Ul\'dah - Faubourg de Nald', 'ウルダハ：ナル回廊']
}

const helper = {
  quest: (level, type, quest, npc, loc, x, y, expansion, available, promo) => {
    return o(
      'quest',
      [level, type, questImage, quest, npc, locationImage, loc, x, y],
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

    default:
      //console.log("Unknown method for minion " + minion.id);
      return null;
  }
}