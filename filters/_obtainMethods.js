const expansions = {
  'X': 'Unknown',
  '1': 'Legacy',
  '2': 'A Realm Reborn',
  '3': 'Heavensward',
  '4': 'Stormblood'
};

module.exports = (methodText, methodValues, expansion, available, promo, extra) => {
  const result = {
    method: {
      text: methodText,
      values: methodValues.map(v => {
        if (v instanceof Array)
          return {
            de: v[1] === true ? v[0] : v[1],
            en: v[0],
            fr: v[2] === true ? v[2] : v[1],
            jp: v[3] === true ? v[3] : v[1]
          }
        
        return v;
      })
    },
    expansion: expansions[expansion || 'X']
  }

  if (available === false)
    result.unavailable = true;

  if (promo === true)
    result.promo = true;

  if (extra)
    result.extra = extra;

  return result;
}