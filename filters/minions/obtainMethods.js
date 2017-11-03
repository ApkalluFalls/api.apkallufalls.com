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

const location = {
  limsaLowerDecks: ['Limsa Lominsa Lower Decks', 'Untere Decks', 'Limsa Lominsa - L\'Entrepont', 'リムサ・ロミンサ：下甲板層'],
  limsaUpperDecks: ['Limsa Lominsa Upper Decks', 'Obere Decks', 'Limsa Lominsa - Le Tillac', 'リムサ・ロミンサ：上甲板層'],
  newGridania: ['New Gridania', 'Neu-Gridania', 'Nouvelle Gridania', 'グリダニア：新市街'],
  oldGridania: ['Old Gridania', 'Alt-Gridania', 'Vieille Gridania', 'グリダニア：旧市街'],
  theGoldSaucer: ['The Gold Saucer', 'Gold Saucer', 'Gold Saucer', 'ゴールドソーサー'],
  uldahStepsOfNald: ['Ul\'dah - Steps of Nald', 'Nald-Kreuzgang', 'Ul\'dah - Faubourg de Nald', 'ウルダハ：ナル回廊'],
  duty: {
    theAurumVale: ['The Aurum Vale', 'Goldklamm', 'Le Val D\'Aurum', '霧中行軍 オーラムヴェイル']
  }
}

const helper = {
  achievementReward: (achievementId, expansion, available, promo) => {
    const achievement = getAchievement(achievements, achievementId);
    return o(
      'achievement',
      [
        ['Jonathas', true, true, 'ジョナサス'],
        ['Apkallu Falls', 'Apkallu-Fälle', 'Chutes De L\'Apkallu', 'アプカル滝'],
        location.oldGridania,
        10.6, 6.3
      ],
      expansion,
      !available,
      promo,
      {
        achievement: achievement
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
  companySeals: (cost, company) => {
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
      [cost, companySeals, npc, companyName, loc, x, y],
      expansions.ARR
    )
  },
  dungeon: (name, level, x, y, expansions, available, promo) => {
    return o(
      x && y ? 'duty' : 'dutyFinalChest',
      x && y ? [level, name,, x, y] : [level, name],
      expansions,
      available,
      promo
    )
  }
}

const gil = ['Gil', true, true, 'ギル'];
const companySeals = ['Company Seals', 'Staatstaler', 'Sceaux de compagnie', '軍票'];

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
            cost, gil,
            ['Maisenta', true, true, '黒兎堂 マイセンタ'],
            purchaseTools,
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
            cost, gil,
            ['Bango Zango', true, true, 'ブルゲール商会 バンゴ・ザンゴ'],
            purchaseTools,
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
            cost, gil,
            ['Roarich', true, true, 'アシュガナ貿易 ロリッヒ'],
            purchaseTools,
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
            cost, gil,
            ['Minion Trader', 'Trabantenhändlerin', 'Marchande De Mascottes', 'ミニオントレーダー'],
            ['Purchase Minions (Gil)', 'Begleiter (Gil)', 'Mascottes (gils)', 'ミニオンの取引（ギル消費）'],
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
    
    // case 13:
    //   return o.ARealmReborn.purchase.gil.fate(true, { cost: 2400, fate: locale('Attack on Highbridge: Act III') });
    
    // case 14:
    //   return o.ARealmReborn.fate(true, { fate: locale('Lazy for You') });
    
    // case 15:
    //   return o.ARealmReborn.quest.side(true, {
    //     quest: locale('Occupational Hazards'),
    //     level: 22,
    //     npc: locale('Yoenne'),
    //     location: locale('South Shroud'),
    //     pos: {
    //       x: 18,
    //       y: 20
    //     }
    //   });
    
    // case 16:
    //   return [
    //     o.ARealmReborn.treasureMap(true, {
    //       map: locale('Timeworn Peisteskin Map')
    //     }),
    //     o.ARealmReborn.purchase.trimmedSack(true, {
    //       item: locale('Bronze-trimmed Sack')
    //     }),
    //     o.Heavensward.treasureMap(true, {
    //       map: locale('Timeworn Dragonskin Map')
    //     }),
    //     o.Heavensward.duty(true, {
    //       duty: locale('The Aquapolis'),
    //       aquapolis: true
    //     })
    //   ]

    default:
      //console.log("Unknown method for minion " + minion.id);
      return null;
  }
}