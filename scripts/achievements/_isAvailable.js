'use strict';

// This function determines if an achievement is obtainable.
module.exports = function(achievement) {
  const category = achievement["achievement_category"];

  switch (category) {
    case 0:
      return 'unknown';

    case 38:
      return 'seasonal';

    case 54:
    case 55:
    case 56:
    case 57:
    case 58:
    case 59:
    case 60:
    case 61:
      return "legacy";
  }

  switch (achievement.id) {
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