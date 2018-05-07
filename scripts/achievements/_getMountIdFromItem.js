'use strict';

// This function returns the weight of a given achievement.
module.exports = function(mountsList, item) {
  const itemName = item.name_en.toLowerCase();
  const attempt1 = mountsList.filter(m => m.name_en.toLowerCase() === itemName);
  
  if (attempt1)
    return attempt1.id;
  
  const attempt2 = mountsList.filter(m => m.name_en.toLowerCase() === itemName.replace(/ \w+$/, ''));

  if (attempt2)
    return attempt2.id;

  // Identification Keys (for Magitek Armor)
  const attempt3 = mountsList.filter(m => m.name_en.toLowerCase() === itemName.replace('armor identification key', 'magitek armor'));

  if (attempt3)
    return attempt3.id;

  console.info(itemName);
}