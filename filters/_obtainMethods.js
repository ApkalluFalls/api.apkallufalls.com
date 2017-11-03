const expansions = {
  'X': 'Unknown',
  '1': 'Legacy',
  '2': 'A Realm Reborn',
  '3': 'Heavensward',
  '4': 'Stormblood'
};

const locale = require('./_locale');

module.exports = (methodText, methodValues, expansion, available, promo, extra) => {
  const result = {
    method: {
      text: methodText,
      values: methodValues.map(v => {
        if (v instanceof Array)
          return {
            de: v[1] === true ? v[0] : v[1],
            en: v[0],
            fr: v[2] === true ? v[0] : v[2],
            jp: v[3] === true ? v[0] : v[3]
          }
        
        return v;
      })
    },
    available: available,
    promo: promo,
    expansion: expansions[expansion || 'X']
  }

  if (extra)
    result.extra = extra;

  return result;
}