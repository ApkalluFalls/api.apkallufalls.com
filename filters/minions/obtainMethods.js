const o = require('../_obtainMethods');
const getAchievement = require('../_getAchievement');
const locale = require('../_locale');

/* Returns information about how minions are obtained.
 * Corresponds to ../../docs/obtainMethods.json.
 */
module.exports = (minion, achievements) => {
  switch (+minion.id) {
    case 1:
    case 2:
    case 3:
      return o.ARealmReborn.purchase.gil.general(true, { cost: 2400 });
    
    case 4:
      return o.ARealmReborn.promotional.preOrder(false);
    
    case 5:
      return o.ARealmReborn.promotional.collectorsEdition(true, { mogstation: true });
    
    case 6:
      return o.ARealmReborn.achievement.pve(true, { achievement: getAchievement(achievements, 736) });
      
    case 7:
      return o.ARealmReborn.achievement.pve(true, { achievement: getAchievement(achievements, 737) });
      
    case 8:
      return o.ARealmReborn.achievement.pve(true, { achievement: getAchievement(achievements, 738) });
    
    case 9:
      return o.ARealmReborn.purchase.companySeals(true, { company: locale.get('Maelstrom'), cost: 20000 });
    
    case 10:
      return o.ARealmReborn.purchase.companySeals(true, { company: locale.get('Order of the Twin Adder'), cost: 20000 });
    
    case 11:
      return o.ARealmReborn.purchase.companySeals(true, { company: locale.get('Immortal Flames'), cost: 20000 });
    
    case 12:
      return o.ARealmReborn.duty(true, { duty: locale.get('The Aurum Vale'), pos: { x: 10, y: 8 }});
    
    case 13:
      return o.ARealmReborn.purchase.gil.fate(true, { cost: 2400, fate: locale.get('Attack on Highbridge: Act III') });
    
    case 14:
      return o.ARealmReborn.fate(true, { fate: locale.get('Lazy for You') });
    
    case 15:
      return o.ARealmReborn.quest.side(true, { quest: locale.get('Occupational Hazards'), region: 'Gridanian', level: 22 });

    default:
      //console.log("Unknown method for minion " + minion.id);
      return {};
  }
}