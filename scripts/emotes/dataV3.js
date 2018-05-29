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
        const targeted = data.content.LogMessage_Targeted;
        const textCommand = data.content.TextCommand;
        const untargeted = data.content.LogMessage_Untargeted;
        
        const result = {
          info: {
            de: textCommand.Description_de,
            en: textCommand.Description_en,
            fr: textCommand.Description_fr,
            jp: textCommand.Description_ja
          },
          id: data.content.ID,
          img: (() => {
            if (!data.content.Icon)
              return false;
            return config.fullImagePathV3 + data.content.Icon;
          })(),
          // targeted: targeted ? parseTargetedString(targeted.Text_en, data.content.ID) : undefined,
          untargeted: untargeted ? parseUntargetedString(untargeted.Text_en, data.content.ID) : undefined,
          xivdb: data.content.url
        }

        createHTML(result.id, {
          data: result,
          emoji: "😊",
          title: `${data.content.Name_en} | Apkallu Falls`,
          description: `The ${data.content.Name_en} emote on Final Fantasy XIV.${result.untargeted && result.untargeted.unisex ? ` *${result.untargeted.unisex.replace('CHARACTER', 'Apkallu Falls')}*` : ''}`,
          image: result.img
        }, "emote", () => {});

        return result;
      }
    }
  }), () => {
    console.info('?')
  }
});

function parseTargetedString(string, id) {
  console.info("---- Emote " + id + " did not match any known format for targeted strings.");
  throw new Error();
}

function parseUntargetedString(string, id) {
  const end = string.match(/ ?(\w+ ?)*[.!]?$/)[0];
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

    if (str[0] instanceof Array && str[0].length === 6 && str[0][4].split(' her').length === 2) {
      const middleAlt = str[0][4].split(' her')[0];
      return {
        female: str[0][1] + ' ' + middleAlt + ' ' + 'her' + end,
        male: str[0][1] + ' ' + middleAlt + ' ' + str[0][5] + end,
        self: str[0][0] + middle + str[0][3] + end
      }
    }

    if (str[0] instanceof Array && str[0].length === 6 && str[0][4].split(' herself').length === 2) {
      const middleAlt = str[0][4].split(' herself')[0];
      return {
        female: str[0][1] + ' ' + middleAlt + ' ' + 'herself' + end,
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
    if (str[0] instanceof Array && str[1] instanceof Array && str[0].length === 2 && str[1].length === 2)
      return {
        self: str[0][0] + ' ' + str[1][0] + end,
        unisex: str[0][1] + ' ' + str[1][1] + end
      };

    if (str[0] instanceof Array && str[1] instanceof Array && str[0].length === 2 && str[1].length === 3)
      return {
        female: str[0][1] + ' ' + str[1][1] + middle + str[1][2] + end,
        male: str[0][1] + ' ' + str[1][1] + middle + str[1][2] + end,
        self: str[0][0] + ' ' + str[1][0] + middle + str[1][2] + end
      }

    if (str[0] instanceof Array && str[1] instanceof Array && str[0].length === 2 && str[1].length === 4 && str[1][1].split(' your').length === 2) {
      const middleAlt = str[1][1].split(' your')[0];
      return [
        str[0][0] + ' ' + str[1][0] + ' your' + end,
        str[0][1] + ' ' + middleAlt + ' ' + str[1][2] + end,
        str[0][1] + ' ' + middleAlt + ' ' + str[1][3] + end
      ]
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