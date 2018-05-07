'use strict';

// This function returns the weight of a given achievement.
module.exports = function(mountsList, item) {
  let itemName = item.name_en.toLowerCase();

  if (/barding/.test(itemName))
    return undefined;

  // Filtering out obscure matches.
  switch (itemName) {
    case 'gloria ignition key':
      itemName = 'gloria-class airship';
      break;
    
    case 'panther bell':
      itemName = 'war panther';
      break;
  }

  const attempt1 = mountsList.filter(m => m.name_en.toLowerCase() === itemName)[0];
  
  if (attempt1)
    return attempt1.id;
  
  const attempt2 = mountsList.filter(m => m.name_en.toLowerCase() === itemName.replace(/ \w+$/, ''))[0];

  if (attempt2)
    return attempt2.id;

  // Identification Keys (for Magitek Armor)
  const attempt3 = mountsList.filter(m => m.name_en.toLowerCase() === itemName.replace('armor identification key', 'magitek armor'))[0];

  if (attempt3)
    return attempt3.id;

  // Identification Keys (for mounts like Logistic System)
  const attempt4 = mountsList.filter(m => m.name_en.toLowerCase() === itemName.replace(' identification key', ''))[0];

  if (attempt4)
    return attempt4.id;

  throw new Error('Possible mount item? "' + item.name_en + '"');
}