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

function getExpansion(patchId) {
  if (patchId === 1)
    return expansions.Legacy;

  if (patchId >= 2 && patchId <= 18)
    return expansions.ARR;

  if (patchId >= 19 && patchId <= 35)
    return expansions.HW;

  if (patchId >= 36)
    return expansions.SB;

  return expansions.Unknown;
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
  }
}

/* Returns information about how minions are obtained.
 * Corresponds to ../../docs/obtainMethods.json.
 */
module.exports = (title, achievementsIn, achievement) => {
  achievements = achievementsIn;
  switch (+title.ID) {
    default:
      return helper.achievementReward(
        achievement.id,
        getExpansion(title.Patch),
        !achievement.unavailable,
        false
      );
  }
}