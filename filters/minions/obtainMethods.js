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
const mgpImage = 'mgp';
const poeticsImage = 'poetics';
const achievementCertificate = 'ac';
const fateImage = 'fate';
const locationImage = 'loc';
const dutyImage = 'duty';
const timewornImage = 'map';
const elixirImage = '4559';
const hiElixirImage = '4560';

const rank = {
  sworn: ['Sworn', 'Solidarisch', 'Assermenté', '友好関係：誓約'],
  trusted: ['Trusted', 'Vertraut', 'Estimé', '信頼'],
}

const beastTribe = {
  amaljaa: ['Amalj\'aa', true, true, 'アマルジャ'],
  ixal: ['Ixal', true, true, 'イクサル'],
  kobold: ['Kobold', true, 'Kobolde', 'コボルド'],
  sahagin: ['Sahagin', true, 'Sahuagin', 'サハギン'],
  sylph: ['Sylph', 'Sylphen', 'Sylphe', 'シルフ']
}

const item = {
  bronzeTrimmedSack: ['Bronze-trimmed Sack', 'Gefundener Schatz I', 'Trésor mystérieux de grade I', '埋もれた財宝G1'],
  elixir: ['Elixir', 'Elixier', 'Élixir', 'エリクサー'],
  hiElixir: ['Hi-Elixir', 'Super-Elixier', 'Super élixir', 'ハイエリクサー'],
  pieceOfAccursedHoard: ['piece of the Accursed Hoard', 'verborgenen Schatz', 'trésor caché', '埋もれた財宝'],
  bait: {
    northernKrill: ['Northern Krill', 'Nordkrill', 'Krill polaire', 'ポーラークリル'],
    topwaterFrog: ['Topwater Frog', 'Schwimmfrosch', 'Grenouille sèche', 'トップウォーターフロッグ']
  }
}

const craftItem = {
  astralRock: {
    icon: 5158,
    name: ['Astral Rock', 'Astralgestein', 'Roche astrale', '星性岩']
  },
  chocoboFeather: {
    icon: 5359,
    name: ['Chocobo Feather', 'Chocobo-Feder', 'Plume de chocobo', 'チョコボの羽根']
  },
  cottonBoll: {
    icon: 5343,
    name: ['Cotton Boll', 'Baumwoll-Samenkapsel', 'Fleur de coton', '草綿']
  },
  darksteelNugget: {
    icon: 5061,
    name: ['Darksteel Nugget', 'Dunkelstahl-Nugget', 'Pépite de sombracier', 'ダークスチールナゲット']
  },
  garleanSteelJoint: {
    icon: 5104,
    name: ['Garlean Steel Joint', 'Garleisches Leichtmetall-Verbindungsstück', 'Morceau d\'acier léger impérial', '帝国製軽金属片']
  },
  garleanSteelPlate: {
    icon: 5105,
    name: ['Garlean Steel Plate', 'Garleische Leichtmetall-Platte', 'Plaque d\'acier léger impérial', '帝国製軽金属板']
  },
  glazenut: {
    icon: 7775,
    name: ['Glazenut', 'Glanznuss', 'Noix luisante', 'グレイズナッツ']
  },
  iceShard: {
    icon: 3,
    name: ['Ice Shard', 'Eisscherbe', 'Éclat de glace', 'アイスシャード']
  },
  juteYarn: {
    icon: 7777,
    name: ['Jute Yarn', 'Jutegarn', 'Toile de jute', 'ジュート繊維']
  },
  lightningShard: {
    icon: 6,
    name: ['Lightning Shard', 'Blitzscherbe', 'Éclat de foudre', 'ライトニングシャード']
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
  windShard: {
    icon: 4,
    name: ['Wind Shard', 'Windscherbe', 'Éclat de vent', 'ウィンドシャード']
  }
}

const location = {
  apkalluFalls: ['Apkallu Falls', 'Apkallu-Fälle', 'Chutes De L\'Apkallu', 'アプカル滝'],
  chamber5: ['5th Chamber', 'Fünfte Kammer', 'Cinquième Salle', '第五区画'],
  coerthasCentralHighlands: ['Coerthas Central Highlands', 'Zentrales Hochland Von Coerthas', 'Hautes Terres Du Coerthas Central', 'クルザス中央高地'],
  commandRoom: ['Command Room', 'Admiralsbrücke', 'Salon De L\'Amiral', 'アドミラルブリッジ：提督室'],
  easternLaNoscea: ['Eastern La Noscea', 'Östliches La Noscea', 'Noscea Orientale', '東ラノシア'],
  easternThanalan: ['Eastern Thanalan', 'Östliches Thanalan', 'Thanalan Oriental', '東ザナラーン'],
  eastShroud: ['East Shroud', 'Ostwald', 'Forêt De L\'est', '黒衣森：東部森林'],
  limsaLowerDecks: ['Limsa Lominsa Lower Decks', 'Untere Decks', 'Limsa Lominsa - L\'Entrepont', 'リムサ・ロミンサ：下甲板層'],
  limsaUpperDecks: ['Limsa Lominsa Upper Decks', 'Obere Decks', 'Limsa Lominsa - Le Tillac', 'リムサ・ロミンサ：上甲板層'],
  lotusStand: ['Lotus Stand', 'Wasserrosentisch', 'Chaire Du Lotus', '不語仙の座卓'],
  lowerLaNoscea: ['Lower La Noscea', 'Unteres La Noscea', 'Basse-Noscea', '低地ラノシア'],
  morDhona: ['Mor Dhona', true, true, 'モードゥナ'],
  newGridania: ['New Gridania', 'Neu-Gridania', 'Nouvelle Gridania', 'グリダニア：新市街'],
  northShroud: ['North Shroud', 'Nordwald', 'Forêt Du Nord', '黒衣森：北部森林'],
  northernThanalan: ['Northern Thanalan', 'Nördliches Thanalan', 'Thanalan Septentrional', '北ザナラーン'],
  oldGridania: ['Old Gridania', 'Alt-Gridania', 'Vieille Gridania', 'グリダニア：旧市街'],
  outerLaNoscea: ['Outer La Noscea', 'Äußeres La Noscea', 'Noscea Extérieure', '地ラノシア'],
  southShroud: ['South Shroud', 'Südwald', 'Forêt Du Sud', '黒衣森：南部森林'],
  southernThanalan: ['Southern Thanalan', 'Südliches Thanalan', 'Thanalan Méridional', '南ザナラーン'],
  theDiadem: ['The Diadem', 'Das Diadem', 'Le Diadème', 'ディアデム諸島'],
  theGoldSaucer: ['The Gold Saucer', 'Gold Saucer', 'Gold Saucer', 'ゴールドソーサー'],
  uldahStepsOfNald: ['Ul\'dah - Steps of Nald', 'Nald-Kreuzgang', 'Ul\'dah - Faubourg de Nald', 'ウルダハ：ナル回廊'],
  uldahStepsOfThal: ['Ul\'dah - Steps of Thal', 'Thal-Kreuzgang', 'Ul\'dah - Faubourg De Thal', 'ウルダハ：ザル回廊'],
  upperLaNoscea: ['Upper La Noscea', 'Oberes La Noscea', 'Haute-Noscea', '高地ラノシア'],
  westernLaNoscea: ['Western La Noscea', 'Westilches La Noscea', 'Noscea Occidentale', '西ラノシア'],
  duty: {
    amdaporKeep: ['Amdapor Keep', 'Die Ruinen Von Amdapor', 'Le Château D\'Amdapor', '邪教排撃 古城アムダプール'],
    brayfloxsLongstopHard: ['Brayflox\'s Longstop (Hard)', 'Brüllvolx\' Langrast (schwer)', 'Le Bivouac De Brayflox (brutal)', '盟友支援 ブレイフロクスの野営地 (Hard)'],
    copperbellMinesHard: ['Copperbell Mines (Hard)', 'Kupferglocken-Mine (schwer)', 'Les Mines De Clochecuivre (brutal)', '騒乱坑道 カッパーベル銅山 (Hard)'],
    sastashaHard: ['Sastasha (Hard)', 'Sastasha (schwer)', 'Sastasha (brutal)', '逆襲要害 サスタシャ浸食洞 (Hard)'],
    theAurumVale: ['The Aurum Vale', 'Goldklamm', 'Le Val D\'Aurum', '霧中行軍 オーラムヴェイル'],
    theAquapolis: ['The Aquapolis', 'Aquapolis', 'L\'Aquapole', '宝物庫 アクアポリス'],
    thePalaceOfTheDead: ['The Palace of the Dead', 'Palast Der Toten', 'Palais Des Morts', '死者の宮殿'],
    theWanderersPalace: ['The Wanderer\'s Palace', 'Palast Des Wanderers', 'Le Palais Du Vagabond', '旅神聖域 ワンダラーパレス']
  },
  fishing: {
    theBurningWall: ['The Burning Wall', 'Der Feuerwall', 'Mur Incandescent', 'バーニングウォール'],
    theSaltStrand: ['The Salt Strand', 'Der Salzstrand', 'Atolls De Sel', 'ソルトストランド']
  }
}

const _npc = {
  minionTrader: ['Minion Trader', 'Trabantenhändlerin', 'Marchande De Mascottes', 'ミニオントレーダー']
}

const timewornMap = {
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
  dungeon: (name, level, x, y, expansion, available, promo) => {
    return o(
      x && y ? 'duty' : 'dutyFinalChest',
      x && y ? [level, dutyImage, name, x, y] : [level, dutyImage, name],
      expansion,
      available,
      promo
    )
  },
  eventQuest: (level, quest, expansion) => {
    return o(
      'eventQuest',
      [level, locale('Seasonal Events'), quest],
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
      false,
      true
    )
  },
  quest: (level, type, quest, npc, loc, x, y, expansion, available, promo) => {
    return o(
      'quest',
      [level, type, quest, npc, locationImage, loc, x, y],
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
      return helper.quest(
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
        helper.fate(
          60,
          ['Where\'s The Beef', 'Aufgebrachte Herde', 'Défi: Le Bovin Mythique', '古の巨獣「フォゴットン・ウィセント」'],
          location.theDiadem,
          null, null,
          expansions.HW
        )
      ];
    
    case 40:
      return helper.achievementReward(929, expansions.ARealmReborn, true, false);

    case 41:
      return helper.quest(
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
        helper.quest(
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
        helper.quest(
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
        helper.quest(
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
        ['Wednesday, December 31, 2014', 'Mittwoch, 31. Dezember 2014', 'Mercredi 31 décembre 2014', '2014年12月31日（水）']
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
        expansions.ARR
      );
    
    case 63:
      return helper.eventQuest(
        10,
        ['Burgeoning Dread', 'Der Schwarze Dämon', 'Abomination Aberrante', '黒い悪魔'],
        expansions.ARR
      );
    
    case 64:
      return [
        helper.eventQuest(
          15,
          ['A Real Peach', 'Marionette Mit Herz', 'Une Issue Inattendue', 'プリンセスデーは時を越えて'],
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
        ['Wednesday, December 31, 2014', 'Mittwoch, 31. Dezember 2014', 'Mercredi 31 décembre 2014', '2014年12月31日（水）']        
      );
    
    case 79:
      return helper.collectorsEdition(locale('A Realm Reborn'), expansions.ARR, true);

    case 80:
      return [
        helper.dungeon(location.duty.brayfloxsLongstopHard, 50, null, null, expansions.ARR, true, false),
        helper.aquapolis(),
        helper.itemAccursedHoard(item.bronzeTrimmedSack)
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

    case 167: 
      return [
        helper.veteranReward(960),
        helper.achievementCertificate(2)
      ]
    
    case 174:
    case 187:
      return [
        helper.goldSaucerPrizeExchange(30000),
        helper.goldSaucerMinionsMGP(30000)
      ];
    
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