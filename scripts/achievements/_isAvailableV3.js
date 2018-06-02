'use strict';

// This function determines if an achievement is obtainable.
module.exports = function(achievement) {
  const kind = achievement['AchievementCategory.AchievementKind.Name'];
  const category = achievement['AchievementCategory.Name'];

  if (!kind || !category)
    return 'unknown';

  if (kind === 'Legacy')
    return 'legacy';

  switch (category) {
    case 'Ranking':
      return 'ranked-pvp';

    case 'Seasonal Events':
      return 'seasonal';
    
    default:
      break;
  }

  switch (achievement.ID) {
    case 310:
    case 311:
    case 312:
      /* These achievements are special in that once you unlock one, you are no
       * longer able to unlock the others. Legacy characters who started in
       * a different city to where they started when A Realm Reborn was
       * launched can have two of these. For those reasons, this achievement is
       * essentially ignored by Apkallu Falls.
       */
      return "start-city";
  }

  return undefined;
}