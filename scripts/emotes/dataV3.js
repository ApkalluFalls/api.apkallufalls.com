const fs = require('fs');
const Helper = require('../_helper');
const createHTML = require('../_HTML');
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
        const targeted = data.LogMessageTargeted;
        const textCommand = data.TextCommand;
        const untargeted = data.LogMessageUntargeted;
        
        const result = {
          id: data.ID,
          img: (() => {
            if (!data.Icon)
              return false;
            return data.Icon;
          })(),
          targeted: targeted && (!untargeted || targeted.Text_en !== untargeted.Text_en) ? parseTargetedString(targeted.Text_en, data.ID) : undefined,
          untargeted: untargeted ? parseUntargetedString(untargeted.Text_en, data.ID) : undefined,
          xivdb: data.Url && ('/' + data.Url.charAt(1).toLowerCase() + data.Url.slice(2))
        }

        if (textCommand) {
          result.info = {
            de: textCommand.Description_de.match(/→ ?(.*)/)[0].replace(/[\n→]/g, '').trim(),
            en: textCommand.Description_en.match(/→ ?(.*)/)[0].replace(/[\n→]/g, '').trim()
          }
        }

        if (result.targeted && result.targeted.self)
          result.targeted.self = result.targeted.self.charAt(0).toUpperCase() + result.targeted.self.slice(1);

        // Because of the "you confuse ALTCHARACTER".
        if (result.targeted && result.targeted.unisex)
          result.targeted.unisex = result.targeted.unisex.charAt(0).toUpperCase() + result.targeted.unisex.slice(1);

        if (result.untargeted && result.untargeted.self)
          result.untargeted.self = result.untargeted.self.charAt(0).toUpperCase() + result.untargeted.self.slice(1);

        createHTML(result.id, {
          data: result,
          emoji: "😊",
          title: `${data.Name_en} | Apkallu Falls`,
          description: `The ${data.Name_en} emote on Final Fantasy XIV.${result.untargeted && result.untargeted.unisex ? ` *${result.untargeted.unisex.replace('CHARACTER', 'Apkallu Falls')}*` : ''}`,
          image: result.img,
          section: "Emotes"
        }, "emote", () => {});

        return result;
      }
    }
  }, resolve)
});

function parseTargetedString(string, id) {
  const minion = ['Black Chocobo Chick', 'Schwarzes Chocobo-Küken', 'Bébé chocobo noir','黒チョコチョコボ'];
  const hasObject = string.match(/ObjectParameter\(3\)/);
  const end = string.match(/ ?(\w ?)*[.!]?$/)[0];

  let rest = string
    .replace(end, '')
    .replace('<SheetEn(ObjStr,2,PlayerParameter(7),1,1)/>', '')
    .replace('<SheetEn(ObjStr,2,PlayerParameter(7),2,1)/>', '')
    .replace(/\<SheetEn\(ObjStr,2,PlayerParameter\(8\),1,1\)\/\>/g, '')
    .replace(/PlayerParameter\(7\)/g, 'CHARACTER')
    .replace(/PlayerParameter\(8\)/g, 'ALTCHARACTER')
    .replace(/[<(,/)>]|Clickable|If|Equal|ObjectParameter\(\w\)|PlayerParameter\(\w\)/g, '');

  let middle = rest.replace(/Else/g, '$$').match(/ (\w+ )+/)
  
  if (middle) {
    middle = middle[0];

    const split = middle.split['you '];
    if (split && split.length === 1 && split[0] !== middle)
      middle = split[0];

    rest = rest.replace(middle, 'Else');
  }

  const str = rest.split('Else ').map(parts => parts.split(' ').map(inner => inner.split('Else')))

  if (str.length === 1 && str[0] instanceof Array) {
    if (str[0].length === 1 && str[0][0] instanceof Array) {
      if (str[0][0].length === 8)
        return {
          self: str[0][0][0] + middle + str[0][0][4] + end,
          unisex: str[0][0][4] + str[0][0][3] + middle + str[0][0][1] + end
        }
    }

    if (str[0].length === 2 && str[0][0] instanceof Array && str[0][1] instanceof Array) {
      if (str[0][0].length === 5 && str[0][1].length === 4)
        return {
          self: str[0][0][0] + middle + str[0][0][3] + ' ' + str[0][1][0] + end,
          unisex: str[0][1][0] + middle + str[0][0][4] + ' ' + str[0][0][0] + end
        }
    }

    if (str[0].length === 4) {
      if (str[0][0].length === 5 && str[0][1].length === 1 && str[0][2].length === 1 && str[0][3].length === 4)
        return {
          self: str[0][0][0] + middle + str[0][0][3] + ' ' + str[0][1][0] + ' ' + str[0][2][0] + ' ' + str[0][3][0] + end,
          unisex: str[0][3][0] + middle + str[0][0][4]+ ' ' + str[0][1][0] + ' ' + str[0][2][0] + ' ' + str[0][0][0] + end
        }
    }

    if (str[0].length === 5) {
      if (str[0][0].length === 5 && str[0][1].length === 1 && str[0][2].length === 1 && str[0][3].length === 1 && str[0][4].length === 4)
        return {
          self: str[0][0][0] + middle + str[0][0][3] + ' ' + str[0][2][0] + ' ' + str[0][3][0] + ' ' + str[0][4][0] + end,
          unisex: str[0][4][0] + ' ' + str[0][0][4] + ' ' + str[0][0][3] + ' ' + str[0][2][0] + ' ' + str[0][3][0] + ' ' + str[0][0][0] + end
        }

      if (str[0][0].length === 5 && str[0][1].length === 2 && str[0][2].length === 1 && str[0][3].length === 1 && str[0][4].length === 4)
        return {
          self: str[0][0][0] + middle + str[0][0][3] + ' ' + str[0][2][0] + ' ' + str[0][3][0] + ' ' + str[0][4][0] + end,
          female: str[0][4][0] + ' ' + str[0][0][4] + ' ' + str[0][1][0] + ' ' + str[0][2][0] + ' ' + str[0][3][0] + ' ' + str[0][0][0] + end,
          male: str[0][4][0] + ' ' + str[0][0][4] + ' ' + str[0][1][1] + ' ' + str[0][2][0] + ' ' + str[0][3][0] + ' ' + str[0][0][0] + end
        }
    }

    if (str[0].length === 6) {
      if (str[0][0].length === 5 && str[0][1].length === 2 && str[0][2].length === 1 && str[0][3].length === 1 && str[0][4].length === 1 && str[0][5].length === 4)
        return {
          self: str[0][0][0] + middle + str[0][0][3] + ' ' + str[0][2][0] + ' ' + str[0][3][0] + ' ' + str[0][4][0] + ' ' + str[0][5][0] + end,
          female: str[0][5][0] + ' ' + str[0][0][4] + ' ' + str[0][1][0] + ' ' + str[0][2][0] + ' ' + str[0][3][0] + ' ' + str[0][4][0] + ' ' + str[0][0][0] + end,
          male: str[0][5][0] + ' ' + str[0][0][4] + ' ' + str[0][1][1] + ' ' + str[0][2][0] + ' ' + str[0][3][0] + ' ' + str[0][4][0] + ' ' + str[0][0][0] + end
        }
    }
  }

  if (str.length === 2 && str[0] instanceof Array && str[1] instanceof Array) {
    if (str[0].length === 1 && str[1].length === 1) {
      if (str[0][0] instanceof Array && str[0][0].length === 2 && str[1][0] instanceof Array && str[1][0].length === 6)
        return {
          self: str[0][0][0] + ' ' + str[1][0][0] + middle + str[1][0][2] + end,
          unisex: str[1][0][2] + ' ' + str[1][0][1] + middle + str[1][0][3] + end
        }

      if (str[0][0] instanceof Array && str[0][0].length === 2 && str[1][0] instanceof Array && str[1][0].length === 7)
        return {
          self: str[0][0][0] + ' ' + str[1][0][0] + middle + str[1][0][3] + str[1][0][6] + end,
          unisex: str[1][0][3] + ' ' + str[1][0][1] + middle + str[1][0][2] + end
        }
    }

    if (str[0].length === 1 && str[1].length === 2) {
      if (str[0][0] instanceof Array && str[0][0].length === 3 && str[1][0] instanceof Array && str[1][0].length === 2 && str[1][1].length === 3)
        return {
          self: str[0][0][0] + ' ' + str[1][0][1] + ' ' + str[1][1][0] + end,
          unisex: str[0][0][1] + ' ' + str[1][0][0] + ' ' + str[0][0][0] + end
        }

      if (str[0][0] instanceof Array && str[0][0].length === 2 && str[1][0] instanceof Array && str[1][0].length === 2 && str[1][1].length === 4)
        return {
          self: str[0][0][0] + ' ' + str[1][0][0] + ' ' + str[1][1][0] + end,
          unisex: str[1][1][0] + ' ' + str[1][0][1] + ' ' + str[0][0][0] + end
        }

      if (str[0][0] instanceof Array && str[0][0].length === 2 && str[1][0] instanceof Array && str[1][0].length === 2 && str[1][1].length === 5) {
        if (str[1][1][4] !== "")
          return {
            self: str[0][0][0] + ' ' + str[1][0][0] + ' ' + str[1][1][0] + middle + str[1][1][4] + end,
            unisex: str[1][1][0] + ' ' + str[1][0][1] + ' ' + str[0][0][0] + middle + str[1][1][4] + end
          }
        
        return {
          self: str[0][0][0] + ' ' + str[1][0][0] + ' ' + str[1][1][0] + middle + str[1][1][3] + end,
          unisex: str[1][1][3] + ' ' + str[1][0][1] + ' ' + str[1][1][0] + middle + str[0][0][0] + end
        }
      }

      if (str[0][0] instanceof Array && str[0][0].length === 2 && str[1][0] instanceof Array && str[1][0].length === 2 && str[1][1].length === 6)
        return {
          self: str[0][0][0] + ' ' + str[1][0][0] + ' ' + str[1][1][0] + middle + str[1][1][4] + end,
          unisex: str[1][1][0] + ' ' + str[1][0][1] + ' ' + str[0][0][0] + middle + str[1][1][5] + end
        }

      if (str[0][0] instanceof Array && str[0][0].length === 2 && str[1][0] instanceof Array && str[1][0].length === 2 && str[1][1].length === 7)
        return {
          self: str[0][0][0] + ' ' + str[1][0][0] + ' ' + str[1][1][0] + middle + str[1][1][5] + end,
          female: str[1][1][3] + ' ' + str[1][0][1] + ' ' + str[1][1][1] + middle + str[0][0][0] + end,
          male: str[1][1][3] + ' ' + str[1][0][1] + ' ' + str[1][1][2] + middle + str[0][0][0] + end
        }
    }

    if (str[0].length === 1 && str[1].length === 3) {
      if (str[0][0] instanceof Array && str[0][0].length === 2)
        return {
          self: str[0][0][0] + ' ' + str[1][0][0] + middle + str[1][0][2] + ' ' + str[1][1][0] + ' ' + str[1][2][0] + end,
          unisex: str[1][2][0] + ' ' + str[1][0][1] + middle + str[1][0][2] + ' ' + str[1][1][0] + ' ' + str[0][0][0] + end
        }
    }

    if (str[0].length === 1 && str[1].length === 4) {
      if (str[0][0] instanceof Array && str[0][0].length === 2 && str[1][0] instanceof Array && str[1][0].length === 5 && str[1][1].length === 1 && str[1][2].length === 1 && str[1][3].length === 4)
        return {
          self: str[0][0][0] + ' ' + str[1][0][0] + middle + str[1][0][2] + ' ' + str[1][1][0] + ' ' + str[1][2][0] + ' ' + str[1][3][0] + end,
          female: str[1][3][0] + ' ' + str[1][0][0] + middle + str[1][0][3] + ' ' + str[1][1][0] + ' ' + str[1][2][0] + ' ' + str[0][0][0] + end,
          male: str[1][3][0] + ' ' + str[1][0][0] + middle + str[1][0][4] + ' ' + str[1][1][0] + ' ' + str[1][2][0] + ' ' + str[0][0][0] + end
        }
    }

    if (str[0].length === 1 && str[1].length === 5) {
      if (str[0][0] instanceof Array && str[0][0].length === 2 && str[1][0] instanceof Array && str[1][0].length === 5 && str[1][1].length === 1 && str[1][2].length === 1 && str[1][3].length === 1 && str[1][4].length === 4)
        return {
          self: str[0][0][0] + ' ' + str[1][0][0] + middle + str[1][0][2] + ' ' + str[1][1][0] + ' ' + str[1][2][0] + ' ' + str[1][3][0] + ' ' + str[1][4][0] + end,
          female: str[1][4][0] + ' ' + str[1][0][1] + middle + str[1][0][3] + ' ' + str[1][1][0] + ' ' + str[1][2][0] + ' ' + str[1][3][0] + ' ' + str[0][0][0] + end,
          male: str[1][4][0] + ' ' + str[1][0][1] + middle + str[1][0][4] + ' ' + str[1][1][0] + ' ' + str[1][2][0] + ' ' + str[1][3][0] + ' ' + str[0][0][0] + end
        }
    }

    if (str[0].length === 1 && str[1].length === 6) {
      if (str[0][0] instanceof Array && str[0][0].length === 2 && str[1][0] instanceof Array && str[1][0].length === 2 && str[1][1].length === 6 && str[1][2].length === 2 && str[1][3].length === 1 && str[1][4].length === 1 && str[1][5].length === 1)
        return {
          self: str[0][0][0] + ' ' + str[1][0][0] + ' ' + str[1][1][0] + middle + str[1][5][0] + end
        }
    }
  }

  if (str.length === 3 && str[0] instanceof Array && str[1] instanceof Array && str[2] instanceof Array) {
    if (str[0].length === 1 && str[1].length === 1 && str[2].length === 2) {
      if (str[0][0] instanceof Array && str[0][0].length === 2 && str[1][0] instanceof Array && str[1][0].length === 5 && str[2][0] instanceof Array && str[2][1].length === 2)
        return {
          self: str[0][0][0] + ' ' + str[1][0][0] + middle + str[1][0][2] + ' ' + str[2][0][0] + ' ' + str[2][1][0] + end,
          unisex: str[1][0][2] + ' ' + str[1][0][1] + middle + str[0][0][0] + ' ' + str[2][0][0] + ' ' + str[2][1][1] + end
        }
    }

    if (str[0].length === 1 && str[1].length === 2 && str[2].length === 1) {
      if (str[0][0] instanceof Array && str[0][0].length === 2 && str[1][1] instanceof Array && str[1][1].length === 3 && str[2][0] instanceof Array && str[2][0].length === 3)
        return {
          self: str[0][0][0] + ' ' + str[1][0][0] + ' ' + str[1][1][0] + ' ' + str[2][0][0] + end,
          female: str[1][1][0] + ' ' + str[1][0][1] + ' ' + str[0][0][0] + ' ' + str[2][0][1] + end,
          male: str[1][1][0] + ' ' + str[1][0][1] + ' ' + str[0][0][0] + ' ' + str[2][0][2] + end
        }
    }
  }

  console.info("---- Emote " + id + " did not match any known format for targeted strings.");
  throw new Error();
}

function parseUntargetedString(string, id) {
  const end = string.match(/ ?(\w ?)*[.!]?$/)[0];
  let rest = string
    .replace(end, '')
    .replace('<SheetEn(ObjStr,2,PlayerParameter(7),1,1)/>', '')
    .replace('<SheetEn(ObjStr,2,PlayerParameter(7),2,1)/>', '')
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
      return {
        self: str[0][0] + end,
        unisex: str[0][2] + str[0][3] + end
      }

    if (str[0] instanceof Array && str[0].length === 5)
      return {
        self: str[0][0] + ' ' + str[0][3] + end,
        unisex: str[0][1] + ' ' + str[0][4] + end
      }

    if (str[0] instanceof Array && str[0].length === 6 && str[0][4].split(' herself').length === 2) {
      const middleAlt = str[0][4].split(' herself')[0];
      return {
        female: str[0][1] + ' ' + middleAlt + ' ' + 'herself' + end,
        male: str[0][1] + ' ' + middleAlt + ' ' + str[0][5] + end,
        self: str[0][0] + middle + str[0][3] + end
      }
    }

    if (str[0] instanceof Array && str[0].length === 6 && str[0][4].split(' her').length === 2) {
      const middleAlt = str[0][4].split(' her')[0];
      if (end.length === 1) {
        const middleAlt2 = str[0][5].split('his ')[1];
        return {
          female: str[0][1] + ' ' + middleAlt + ' ' + 'her' + ' ' + middleAlt2 + end,
          male: str[0][1] + ' ' + middleAlt + ' ' + str[0][5] + end,
          self: str[0][0] + middle + str[0][3] + end
        }
      }

      return {
        female: str[0][1] + ' ' + middleAlt + ' ' + 'her' + end,
        male: str[0][1] + ' ' + middleAlt + ' ' + str[0][5] + end,
        self: str[0][0] + middle + str[0][3] + end
      }
    }

    if (str[0] instanceof Array && str[0].length === 6 && str[0][4].split(' her').length === 3) {
      const middleAlt = str[0][4].split(' her');
      return {
        female: str[0][1] + ' ' + middleAlt[0] + ' her' + middleAlt[1] + ' her' + end,
        male: str[0][1] + ' ' + middleAlt[0] + ' his' + middleAlt[1] + ' him' + end,
        self: str[0][0] + middle + str[0][3] + end
      }
    }

    if (str[0] instanceof Array && str[0].length === 6) {
      return {
        female: str[0][1] + middle + str[0][4] + end,
        male: str[0][1] + middle + str[0][5] + end,
        self: str[0][0] + middle + str[0][3] + end
      }
    }
  }

  if (str.length === 2) {
    if (str[0] instanceof Array && str[1] instanceof Array && str[0].length === 2 && str[1].length === 2) {
      const split = str[1][1].split(' ');

      if (split.length === 2)
        return {
          self: str[0][0] + ' ' + str[1][0] + ' ' + split[1] + end,
          unisex: str[0][1] + ' ' + str[1][1] + end
        };

      return {
        self: str[0][0] + ' ' + str[1][0] + end,
        unisex: str[0][1] + ' ' + str[1][1] + end
      };
    }

    if (str[0] instanceof Array && str[1] instanceof Array && str[0].length === 2 && str[1].length === 3)
      return {
        female: str[0][1] + ' ' + str[1][1] + middle + str[1][2] + end,
        male: str[0][1] + ' ' + str[1][1] + middle + str[1][2] + end,
        self: str[0][0] + ' ' + str[1][0] + middle + str[1][2] + end
      }

    if (str[0] instanceof Array && str[1] instanceof Array && str[0].length === 2 && str[1].length === 4 && str[1][1].split(' your').length === 2) {
      const middleAlt = str[1][1].split(' your')[0];
      return {
        self: str[0][0] + ' ' + str[1][0] + ' your' + end,
        female: str[0][1] + ' ' + middleAlt + ' ' + str[1][2] + end,
        male: str[0][1] + ' ' + middleAlt + ' ' + str[1][3] + end
      }
    }

    if (str[0] instanceof Array && str[1] instanceof Array && str[0].length === 2 && str[1].length === 5)
      return {
        female: str[0][1] + ' ' + str[1][1] + middle + str[1][3] + end,
        male: str[0][1] + ' ' + str[1][1] + middle + str[1][4] + end,
        self: str[0][0] + ' ' + str[1][0] + middle + str[1][2] + end
      }
  }

  console.info("---- Emote " + id + " did not match any known format for untargeted strings.");
  throw new Error();
}