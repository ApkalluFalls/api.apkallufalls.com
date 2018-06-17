const createHTML = require('../_HTML');
const recursiveFetch = require('../_recursiveV3');
const config = require('../_config');

const api = "Item";
const base = 'v3/barding';
const name = "Barding";

module.exports = ({
  fetch: async (achievements, items) => {
    const data = items.barding.map(b => ({
      ...b,
      ID: b.awards // To allow the helper class to read the ID.
    }));
    return new Promise((resolve) => {
      recursiveFetch(data, name, (entry) => {
        return {
          v3: true,
          api: api + '/' + entry.id,
          base,
          customId: entry.awards,
          format: (data) => {
            const result = {
              id: data.ItemAction.Data0,
              help: {
                de: data.Description_de,
                en: data.Description_en,
                fr: data.Description_fr,
                jp: data.Description_ja
              },
              img: (() => {
                if (!data.Icon)
                  return false;
                return data.Icon;
              })(),
              xivdb: data.Url && ('/' + data.Url.charAt(1).toLowerCase() + data.Url.slice(2))
            };

            createHTML(result.id, {
              data: result,
              emoji: "💺",
              title: `${data.Name_en} | Apkallu Falls`,
              description: `${data.Name_en} on Final Fantasy XIV. ${result.help ? result.help.en : ''}`,
              image: config.fullImagePathV3 + result.img,
              section: "Chocobo Barding"
            }, "chocobo-barding", () => {});

            return result;
          }
        }
      }, resolve, true)
    })
  }
})