const localisation = require('../localisation');

class Locale {
  get(string) {
    const match = localisation[string];

    if (!match) {
      console.error("Unknown localisation string '" + string + "'");
      process.exit();
    }

    let localised = {
      de: match.de === true ? string : match.de,
      en: string,
      fr: match.fr === true ? string : match.fr,
      jp: match.jp === true ? string : match.jp
    }

    if (!localised.de) {
      console.error("No German translation found for string  '" + string + "'");
      process.exit();
    }

    if (!localised.fr) {
      console.error("No French translation found for string  '" + string + "'");
      process.exit();
    }

    if (!localised.jp) {
      console.error("No Japanese translation found for string  '" + string + "'");
      process.exit();
    }

    return localised;
  }
}

module.exports = new Locale().get;