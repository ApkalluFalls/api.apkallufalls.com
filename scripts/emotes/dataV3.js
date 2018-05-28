const fs = require('fs');
const Helper = require('../_helper');
const recursiveFetch = require('../_recursiveV3');
const config = require('../_config');
const localisation = require('../../localisation');

const api = "Emote";
const base = 'v3/emote';
const name = "Emote";
const plural = "emotes";

module.exports = new Helper(name, plural, {
  api,
  base,
  columns: [
    "ID"
  ],
  useCallback: true,
  list: true,
  v3: true
}, (data, resolve) => {
  recursiveFetch(data, name, (entry, all) => {
    return {
      v3: true,
      api: api + '/' + entry.ID,
      base,
      format: (data) => {
        const untargeted = data.content.LogMessage_Untargeted;
        
        return {
          untargeted: untargeted ? parseUntargetedString(untargeted.Text_en, data.content.ID) : undefined
        }
      }
    }
  }), () => {
    console.info('?')
  }
});

function parseUntargetedString(string, id) {
  const end = string.match(/ ?(\w+ ?)*[.!]?$/)[0];
  let rest = string
    .replace(end, '')
    .replace('<SheetEn(ObjStr,2,PlayerParameter(7),1,1)/>', '')
    .replace(/PlayerParameter\(7\)/g, 'CHARACTER')
    .replace(/[<(,/)>]|Clickable|If|Equal|ObjectParameter\(\w\)|PlayerParameter\(\w\)/g, '');

  let middle = rest.replace(/Else/g, '$$').match(/ (\w+ )+/)
  
  if (middle) {
    middle = middle[0];
    rest = rest.replace(middle, 'Else');
  }

  const str = rest.split('Else ').map(part => part.split('Else'));

  if (str.length === 1) {
    if (str[0] instanceof Array && str[0].length === 4)
      return [
        str[0][0] + end,
        str[0][2] + str[0][3] + end
      ]

    if (str[0] instanceof Array && str[0].length === 5)
      return [
        str[0][0] + ' ' + str[0][3] + end,
        str[0][1] + ' ' + str[0][4] + end
      ]

    if (str[0] instanceof Array && str[0].length === 6 && str[0][4].split(' her').length === 2) {
      const middleAlt = str[0][4].split(' her')[0];
      return [
        str[0][0] + middle + str[0][3] + end,
        str[0][1] + ' ' + middleAlt + ' ' + 'her' + end,
        str[0][1] + ' ' + middleAlt + ' ' + str[0][5] + end
      ]
    }

    if (str[0] instanceof Array && str[0].length === 6 && str[0][4].split(' herself').length === 2) {
      const middleAlt = str[0][4].split(' herself')[0];
      return [
        str[0][0] + middle + str[0][3] + end,
        str[0][1] + ' ' + middleAlt + ' ' + 'herself' + end,
        str[0][1] + ' ' + middleAlt + ' ' + str[0][5] + end
      ]
    }

    if (str[0] instanceof Array && str[0].length === 6 && str[0][4].split(' her').length === 3) {
      const middleAlt = str[0][4].split(' her ');
      return [
        str[0][0] + middle + str[0][3] + end,
        str[0][1] + ' ' + middleAlt[0] + ' her' + middleAlt[1] + ' her' + end,
        str[0][1] + ' ' + middleAlt[0] + ' his' + middleAlt[1] + ' him' + end
      ]
    }

    if (str[0] instanceof Array && str[0].length === 6) {
      return [
        str[0][0] + middle + str[0][3] + end,
        str[0][1] + middle + str[0][4] + end,
        str[0][1] + middle + str[0][5] + end
      ]
    }
  }

  if (str.length === 2) {
    if (str[0] instanceof Array && str[1] instanceof Array && str[0].length === 2 && str[1].length === 2)
      return [
        str[0][0] + ' ' + str[1][0] + end,
        str[0][1] + ' ' + str[1][1] + end
      ];

    if (str[0] instanceof Array && str[1] instanceof Array && str[0].length === 2 && str[1].length === 3)
      return [
        str[0][0] + ' ' + str[1][0] + middle + str[1][2] + end,
        str[0][1] + ' ' + str[1][1] + middle + str[1][2] + end,
        str[0][1] + ' ' + str[1][1] + middle + str[1][2] + end
      ]

    if (str[0] instanceof Array && str[1] instanceof Array && str[0].length === 2 && str[1].length === 4 && str[1][1].split(' your').length === 2) {
      const middleAlt = str[1][1].split(' your')[0];
      return [
        str[0][0] + ' ' + str[1][0] + ' your' + end,
        str[0][1] + ' ' + middleAlt + ' ' + str[1][2] + end,
        str[0][1] + ' ' + middleAlt + ' ' + str[1][3] + end
      ]
    }

    if (str[0] instanceof Array && str[1] instanceof Array && str[0].length === 2 && str[1].length === 5)
      return [
        str[0][0] + ' ' + str[1][0] + middle + str[1][2] + end,
        str[0][1] + ' ' + str[1][1] + middle + str[1][3] + end,
        str[0][1] + ' ' + str[1][1] + middle + str[1][4] + end
      ]
  }

  console.info(id);
  throw new Error();
}