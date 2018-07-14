const o = require('../_obtainMethods');
const getAchievement = require('../_getAchievement');
const locale = require('../_locale');

let achievements;
let emotes;
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
const empyreanPotsherdImage = 'ep';
const wondrousTailsImage = 'wt';
const sasshoSekiFragmentImage = 'ssf';
const ventureImage = 'v';
const kojinSangoImage = 'ks';
const ixionHornImage = 'ih';
const anantaDreamstaffImage = 'ad';
const namazuKobanImage = 'nk';
const mythicClanLogMarkImage = 'mc';

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
const empyreanPotsherd = ["Empyrean Potsherd", "Empyreum-Scherbe", "Tesson de poterie empyréenne", "天之土器片"];
const sasshoSekiFragment = ["Sassho-seki Fragment", "Sassho-seki-Fragment", "Fragment de la Roche meurtrière", "殺生石の欠片"];
const kojinSango = ["Kojin Sango", "Kojin-Koralle", "Sango kojin", "コウジン珊瑚貨"];
const ixionHorn = ["Ixion Horn", "Ixion-Hornfragment", "Corne d'Ixion", "イクシオンの角片"];
const anantaDreamstaff = ["Ananta Dreamstaff", "Ananta-Traumstab", "Barrette béatifique ananta", "アナンタ魔金錫貨"];
const namazuKoban = ["Namazu Koban", "Namazuo-Koban", "Koban namazu", "ナマズオ小判"];
const mythicClanMarkLog = ["Mythic Clan Mark Log", "Clan-Mythenjäger-Tagebuch", "Journal de membre émérite du clan", "傑物クラン員の手記"];

const location = {
  theGoldSaucer: ['The Gold Saucer', 'Gold Saucer', 'Gold Saucer', 'ゴールドソーサー'],
  theRubySea: ["The Ruby Sea", "Rubinsee", "Mer De Rubis", "紅玉海"]
}

const helper = {
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
  goldSaucerPrizeExchange: (cost, item, isPrizeExchange2) => {
    return o(
      'purchase',
      [
        cost, mgp, mgpImage,
        ['Gold Saucer Attendant', 'Sonderartikel-Händlerin', 'Préposée Aux Lots', '景品交換窓口'],
        [
          '(Prize Exchange I' + (isPrizeExchange2 ? 'I' : '') + ')',
          '(Gewinne ' + (isPrizeExchange2 ? 'I' : '') + ')',
          '(Lots (' + (isPrizeExchange2 ? '2' : '1') + '))',
          '（景品の交換（その' + (isPrizeExchange2 ? '2' : '1') + '））'
        ],
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
  }
}

let value;

/* Returns information about how minions are obtained.
 * Corresponds to ../../docs/obtainMethods.json.
 */
module.exports = (emote, achievementsIn, emotesIn, itemsIn) => {
  achievements = achievementsIn;
  emotes = emotesIn;
  item = itemsIn;
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
    case 151:
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
    case 123:
    case 124:
    case 128:
    case 129:
    case 142:
    case 143:
    case 153:
      return helper.mogStation(item);

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
          item.name
        ],
        expansions.SB,
        true,
        false
      );
    
    case 65:
    case 66:
    case 67:
      return helper.eventQuest(
        15,
        ["A Colorful Affair", "Farbe Bekennen", "Concert Participatif", "プリンセスデーの大声援"],
        'eq5',
        expansions.ARR
      )

    case 81:
      return helper.goldSaucerPrizeExchange(20000, item, true);
    
    case 82:
      return [
        helper.companySeals(10000, 'Maelstrom', item),
        helper.companySeals(10000, 'Order of the Twin Adder', item),
        helper.companySeals(10000, 'Immortal Flames', item)
      ];
    
    case 85:
      return helper.quest(
        36,
        locale('Coerthan Sidequests'),
        ["Toss Fit Workout", "Der Weg Des Schneeballwerfers", "Le Cantinier A Les Boules", "雪原の投擲者"],
        ["Maucolyn", "Maucolyn", "Maucolyn", "マーコリン"],
        ["Coerthas Central Highlands", "Zentrales Hochland Von Coerthas", "Hautes Terres Du Coerthas Central", "クルザス中央高地"],
        25, 27.8,
        expansions.ARR,
        true,
        false
      );
    
    case 101:
      return helper.quest(
        14,
        locale('Lominsan Sidequests'),
        ["Good For What Ales You", "Halb Getanzt Ist Ganz Verheimlicht", "Danse Avec Les Fous", "こっそりバッチリ愉快な踊り"],
        ["Dodozan", "Dodozan", "Dodozan", "ドゥドゥザン"],
        ["Limsa Lominsa Lower Decks", "Untere Decks", "Limsa Lominsa - L'Entrepont", "リムサ・ロミンサ：下甲板層"],
        7.5, 12.4,
        expansions.ARR,
        true,
        false
      );
    
    case 102:
      return helper.quest(
        14,
        locale('Gridanian Sidequests'),
        ["Saw That One Coming", "Steif Wie Ein Brett", "Mais Si On Danse?", "誰がために人は踊る"],
        ["Eral", "Eral", "Eral", "エラル"],
        ["New Gridania", "Neu-Gridania", "Nouvelle Gridania", "グリダニア：新市街"],
        12.1, 13.2,
        expansions.ARR,
        true,
        false
      );
    
    case 103:
      return helper.quest(
        14,
        locale('Ul\'dahn Sidequests'),
        ["Help Me, Lord Of The Dance", "Die Supertänzer-Abenteurerin", "Juste Une Dernière Danse", "踊り子は次の舞台へ"],
        ["P'molminn", "Pmolminn", "P'molminn", "ペ・モルミン"],
        ["Ul'dah - Steps Of Nald", "Nald-Kreuzgang", "Ul'dah - Faubourg De Nald", "ウルダハ：ナル回廊"],
        10.8, 9.8,
        expansions.ARR,
        true,
        false
      );
    
    case 104:
      return helper.quest(
        50,
        locale('Hildibrand Quests'),
        ["The Hammer", "Der Teufel Mit Dem Weißen Haar", "Le Démon à La Toison Blanche", "白髪の鬼"],
        ["Hildibrand", "Hildibrand", "Hildibrand", "ヒルディブランド"],
        ["Western Thanalan", "Westliches Thanalan", "Thanalan Occidental", "西ザナラーン"],
        20.1, 24.7,
        expansions.ARR,
        true,
        false
      );
    
    case 109:
      return [
        helper.eventQuest(
          15,
          ["Remember Me This Moonfire Faire", "Der Mit Dem Feuer Tanzt", "La Flamme D'un Espoir Renaissant", "紅蓮祭とお祭り男"],
          'eq10',
          expansions.ARR
        ),
        helper.mogStation(item)
      ];
    
    case 110:
      return [
        helper.eventQuest(
          15,
          ["What Blooms In The Night", "Blüten Der Nacht", "Réminiscence", "エオルゼア新生祭"],
          'eq6',
          expansions.ARR
        ),
        helper.mogStation(item)
      ];
    
    case 113:
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
    
    case 114:
      return helper.quest(
        50,
        locale('Hildibrand Quests'),
        ["Her Last Vow", "Ruinöse Revanche", "Boucler La Boucle", "事件は砂塵に消ゆ"],
        ["Julyan", "Julyan", "Julyan", "ジュリアン"],
        ["Ul'dah - Steps Of Thal", "Thal-Kreuzgang", "Ul'dah - Faubourg De Thal", "ウルダハ：ザル回廊"],
        12.1, 11.8,
        expansions.ARR,
        true,
        false
      );
    
    case 115:
      return helper.recruitAFriend();

    case 118:
    case 119:
      return helper.goldSaucerPrizeExchange(80000, item);
    
    case 120:
      return helper.quest(
        50,
        locale('Vanu Vanu Quests'),
        ["Sundrop The Beat", "Aufgeflogen", "L'admirable Courage", "畏敬されし者"],
        ["Linu Vali", "Linu Vali", "Linu Vali", "リヌバリ"],
        ["The Sea Of Clouds", "Abalathisches Wolkenmeer", "L'Écume Des Cieux D'Abalathia", "アバラシア雲海"],
        6.6, 14.4,
        expansions.HW,
        true,
        false
      );
    
    case 121:
      return helper.msq(
        60,
        locale('Dragonsong War'),
        ["Causes And Costs", "Der Preis Der Veränderung", "Le Destin En Marche", "運命の歯車"],
        ["Alphinaud", "Alphinaud", "Alphinaud", "アルフィノ"],
        ["Coerthas Western Highlands", "Westliches Hochland Von Coerthas", "Hautes Terres Du Coerthas Occidental", "クルザス西部高地"],
        32.6, 37.8,
        expansions.HW,
        true,
        false
      );
    
    case 122:
      return helper.msq(
        60,
        locale('Dragonsong War'),
        ["A Spectacle For The Ages", "Truppenübung Der Eorzäischen Allianz", "La Grande Manœuvre éorzéenne", "四国合同演習"],
        ["Lucia", "Lucia", "Lucia", "ルキア"],
        ["Foundation", "Fundamente", "Ishgard - L'Assise", "イシュガルド：下層"],
        13.5, 11.2,
        expansions.HW,
        true,
        false
      );
    
    case 125:
      return helper.eventQuest(
        15,
        ["An Inspector's Gadget", "Zeichen Des Dankes", "La Marque Du Détective", "ゴールドソーサーの感謝の証"],
        'eq11',
        expansions.ARR
      )
    
    case 126:
      return helper.quest(
        50,
        locale('Moogle Quests'),
        ["Piecing Together The Past", "In Gedenken An Wahre Freundschaft", "Tout Le Monde Aura Sa Plaque", "岩を砕く修復団！"],
        ["Master Mogzin", "Vorarbeiter Mogzin", "Mogzin", "団長のモグジン"],
        ["The Churning Mists", "Wallende Nebel", "L'Écume Des Cieux De Dravania", "ドラヴァニア雲海"],
        15.7, 28.9,
        expansions.HW,
        true,
        false
      );
    
    case 127:
      return helper.quest(
        60,
        locale('Side Story Quests'),
        ["The Burdens We Bear", "Im Gedenken An Einen Freund", "Le Sourire De L'amitié", "友の微笑み"],
        ["Slowfix", "Schlafix", "Slowfix", "スローフィクス"],
        ["Idyllshire", "Frohehalde", "Idyllée", "イディルシャイア"],
        7.7, 6.6,
        expansions.HW,
        true,
        false
      );
    
    case 130:
    case 131:
    case 132:
    case 133:
    case 134:
    case 135:
    case 136:
      return [
        helper.eventQuestPurchase(
          ["P'obyano", "P'obyano", "P'obyano", "紅蓮祭実行委員ペ・オビヤノ"],
          ["Moonfire Faire 2016", "Der Feuermond-Reigen 2016", "Les Feux de la Mort 2016", "紅蓮祭 2016"],
          expansions.ARR,
          item
        ),
        helper.mogStation(item)
      ];

    case 138:
      return helper.squareEnixStoreNoExpiration(
        ['FINAL FANTASY XIV MEISTER QUALITY FIGURE – ODIN', true, true, true]
      );

    case 144:
      return helper.squareEnixStoreNoExpiration(
        ['FINAL FANTASY XIV MEISTER QUALITY FIGURE – SHIVA', true, true, true]
      );
    
    case 145:
      return helper.quest(
        60,
        locale('Side Story Quests'),
        ["Eternity, Loyalty, Honesty", "Sieg Der Freundschaft", "Une Amitié Germée Du Chaos Semé", "導かれし盟友たち"],
        ["Vath Deftarm", "Macher", "Futé", "ウデキキ"],
        ["The Sea Of Clouds", "Abalathisches Wolkenmeer", "L'Écume Des Cieux D'Abalathia", "アバラシア雲海"],
        6.7, 14.3,
        expansions.HW,
        true,
        false
      );
      
    case 146:
      return [
        helper.eventQuest(
          15,
          ["Once More With Feeling", "Eine Liebe Geste", "Épanchement Sentimental", "ヴァレンティオンデーと愛の表現"],
          'eq9',
          expansions.ARR
        ),
        helper.mogStation(item)
      ];
    
    case 148:
      return helper.quest(
        60,
        locale('Side Story Quests'),
        ["Letters From No One", "Schmähung Mit Schönheitsfehlern", "Campagne De Diffamation", "怪文書の影に"],
        ["Theomocent", "Theomocent", "Theomocent", "テオモサン"],
        ["The Pillars", "Strebewerk", "Ishgard - Les Contreforts", "イシュガルド：上層"],
        10.5, 9.8,
        expansions.HW,
        true,
        false
      );

    case 149:
      return [
        helper.eventQuest(
          15,
          ["Idols Give Back", "Was Lange Währt Wird Spitze", "Le Concert événement Des Églantines", "可憐な公演とプリンセスデー"],
          'eq5',
          expansions.ARR
        ),
        helper.mogStation(item)
      ];
    
    case 154:
      return helper.msq(
        62,
        locale('Stormblood'),
        ["Confederate Consternation", "Verhandlung Mit Rasho", "Le Hameau Des Parias", "砦に集いし無頼漢"],
        ["Alisaie", "Alisaie", "Alisaie", "アリゼー"],
        ["The Ruby Sea", "Rubinsee", "Mer De Rubis", "紅玉海"],
        20.3, 9.5,
        expansions.SB,
        true,
        false
      );

    case 155:
    case 156:
    case 157:
    case 158:
      return helper.achievementReward(1966, expansions.ARR, true, false);
    
    case 164:
    case 165:
      return [
        helper.companySeals(40000, 'Maelstrom', item),
        helper.companySeals(40000, 'Order of the Twin Adder', item),
        helper.companySeals(40000, 'Immortal Flames', item)
      ];
    
    case 166:
      return helper.msq(
        70,
        locale('Stormblood'),
        ["Arenvald's Adventure", "Ein Neues Abenteuer", "Une Soif D'aventure", "新たなる冒険"],
        ["Lyse", "Lyse", "Lyse", "リセ"],
        ["Rhalgr's Reach", "Rhalgrs Wacht", "L'Étendue De Rhalgr", "ラールガーズリーチ"],
        14.7, 9.4,
        expansions.SB,
        true,
        false
      );

    case 167:
      return o(
        'beastTribe',
        [
          rank.respected,
          beastTribe.kojin,
          3, kojinSango, kojinSangoImage,
          ["Shikitahe", "Shikitahe", "Shikitahe", "シキタヘ"],
          ["(Kojin Sango Exchange)", "(Kojin-Korallen)", "(Échange De Sango Kojin)", "(コウジン珊瑚貨の取引)"],
          locationImage,
          ["The Ruby Sea", "Rubinsee", "Mer De Rubis", "紅玉海"],
          29.4, 16.9,
          item.name
        ],
        expansions.SB,
        true,
        false
      );
    
    case 169:
    case 170:
      return o(
        'purchase',
        [
          6, mythicClanMarkLog, mythicClanLogMarkImage,
          ["Eschina", true, true, "エシナ"],
          ["(Wondrous Sundries)", "(Gegenstände)", "(Objets)", "（アイテムの取引）"],
          locationImage,
          ["Rhalgr's Reach", "Rhalgrs Wacht", "L'Étendue De Rhalgr", "ラールガーズリーチ"],
          13.9, 11.8,
          item.name
        ],
        expansions.SB,
        true,
        false
      );

    case 171:
      return o(
        'purchase',
        [
          5000, gil, gilImage,
          ["Kasumi", "Kasumi", "Kasumi", "カスミ"],
          ['(Prize Exchange I)', '(Gewinne I)', '(Lots (1))', '（景品の交換（その1））'],
          locationImage,
          location.theGoldSaucer,
          7.2, 7.3,
          item.name
        ],
        expansions.SB,
        true,
        false
      );
    
    case 172:
      return helper.msq(
        70,
        locale('Stormblood'),
        ["Tidings From The East", "Eilmeldung Aus Kugane", "À L'Est, Du Nouveau", "風雲急を告げる報せ"],
        ["Lyse", "Lyse", "Lyse", "リセ"],
        ["Rhalgr's Reach", "Rhalgrs Wacht", "L'Étendue De Rhalgr", "ラールガーズリーチ"],
        14.7, 9.4,
        expansions.SB,
        true,
        false
      );
    
    case 176:
      return o(
        'beastTribe',
        [
          rank.honored,
          beastTribe.namazu,
          8, namazuKoban, namazuKobanImage,
          ["Gyosho", true, true, "ギョショウ"],
          ["(Namazu Koban Exchange)", "(Namazuo-Koban)", "(Échange de koban namazu)", "(ナマズオ小判の取引)"],
          locationImage,
          ["Dhoro Iloh", true, true, "ドーロ・イロー"],
          5.8, 23.5,
          item.name
        ],
        expansions.SB,
        true,
        false
      );
    
    case 178:
      return helper.eventQuest(
        15,
        ["Jump To The Beach", "Sommer, Sonne, Abenteuer", "Voilà L'été", "紅蓮祭と常夏の挑戦"],
        'eq10',
        expansions.ARR
      )
      

    case 180:
      return o(
        'purchase',
        [
          10, empyreanPotsherd, empyreanPotsherdImage,
          ["Confederate Custodian", "Materialhüterin", "Fournisseuse De La Confédération", "海賊衆の資材係"],
          ['(Prize Exchange I)', '(Gewinne I)', '(Lots (1))', '（景品の交換（その1））'],
          locationImage,
          location.theRubySea,
          21.2, 9.2,
          item.name
        ],
        expansions.SB,
        true,
        false
      );

    case 182:
      return o(
        'purchase',
        [
          15000, wolfMarks, wolfMarksImage,
          ["Storm Sergeant", "Sturmmaat", "Sergent Des Tempêtes", "黒渦団甲軍曹"],
          wolfMarks.map(w => '(' + w + ')'),
          locationImage,
          ['The Wolves\' Den', 'Wolfshöhle', 'L\'Antre des loups', 'ウルヴズジェイル'],
          4.4, 6.1,
          item.name
        ],
        expansions.ARR,
        true,
        false
      );
    
    case 183:
      return helper.msq(
        70,
        locale('Stormblood'),
        ["Emissary Of The Dawn", "Der Knabe Der Morgenröte", "Voyage En Terre Hostile", "「暁」の少年"],
        ["Alisaie", "Alisaie", "Alisaie", "アリゼー"],
        ["The Rising Stones", "Sonnenstein", "Refuge Des Roches", "石の家"],
        0, 0,
        expansions.SB,
        true,
        false
      );

    default:
      console.log("Unknown method for emote " + emote.id);
      return null;
  }
}