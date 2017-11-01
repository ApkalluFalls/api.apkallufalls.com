const content = {
  general: 1,
  fate: 2,
  pvp: 3,
  pve: 4,
  grandCompany: 5,
  instanced: 6,
  quest: 7,
  '$$$': 99
}

const expansion = {
  legacy: 1,
  arr: 2,
  hw: 3,
  sb: 4
}

module.exports = {
  ARealmReborn: {
    achievement: {
      pve: (available, extra) => o(200100, 'pve', 'arr', available, extra)
    },
    duty: (available, extra) => o(200300, 'instanced', 'arr', available, extra),
    fate: (available, extra) => o(200400, 'fate', 'arr', available, extra),
    promotional: {
      preOrder: (available, extra) => o(209000, '$$$', 'arr', available, extra),
      collectorsEdition: (available, extra) => o(209001, '$$$', 'arr', available, extra)
    },
    purchase: {
      gil: {
        general: (available, extra) => o(200000, 'general', 'arr', available, extra),
        fate: (available, extra) => o(200000, 'fate', 'arr', available, extra)
      },
      companySeals: (available, extra) => o(200200, 'grandCompany', 'arr', available, extra)
    },
    quest: {
      mainScenario: (available, extra) => o(200500, 'quest', 'arr', available, extra),
      side: (available, extra) => o(200501, 'quest', 'arr', available, extra)
    }
  }
}

function o(id, contentStr, expansionStr, available, extra) {
  const result = {
    method: id,
    content: content[contentStr],
    expansion: expansion[expansionStr],
    ...extra
  }

  if (available === false)
    result.unavailable = true;

  return result;
}