'use strict';

// This function determines if an achievement is obtainable.
module.exports = function(achievement) {
  const category = achievement["achievement_category"];
  let reason;

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

    default:
      return;
  }
}