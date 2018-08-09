/* This function takes a mount ID and determines whether the French translation
 * has a sound rather than a quote (which almost all of them do).
 * 
 * @params {object} mount - The mount object.
 * 
 * @example
 * // Returns true - mount 1 has a sound in French.
 * require('sounds.js)({ id: 1, ... });
 * 
 * @example
 * // Returns false - mount speaks French.
 * require('sounds.js)()
 * 
 * @example
 * // Returns string - mount 2 makes a sound but also speaks French.
 * require('sounds.js)({ id: 2, ... });
 * 
 * @returns {(bool|string)} - if it has a sound or a sound override.
 */
module.exports = (mount) => {
  const quote = mount.quote.fr
    && mount.quote.fr
      .replace(/\<Indent\/\>/g, '')
      .replace('<If(PlayerParameter(4))>', '')
      .replace('</If>', '')
      .replace('<Else/>', ' / ')
      .replace(/\n\n/g, '\n');

  switch (mount.id) {
    case 4:
      return override('(bâillement)', '(yawn)');

    case 6:
    case 141:
      return override('Identification en cours...', 'Identification in progress...');
    
    case 8:
      return override('(feulement)', '(growl)');

    case 9:
      return override('(regard fixe)', '(stare)');

    case 21:
      return override('Autorisation en cours...', 'Authorization in progress...');

    case 27:
      return override('(crépitement)', '(crackling)');
    
    case 48:
      return override('Mise à jour en cours...\\nNe pas éteindre le module.', 'Update in progress...\\nDo not turn off the module.')

    case 70:
      return override('Vers les cieux, compagnon!', 'Towards the heavens, companion!');

    case 91:
      return override('Bip bip... Mise à niveau des systèmes recommandée...', 'Beep beep... System upgrade recommended...');
    
    case 101:
      return override('Protocole de conduite responsable engagé', 'Responsible protocol of conduct engaged')

    case 106:
      return override('Un petit œuf, deux petits œufs...', 'One small egg, two small eggs...');
    
    case 161:
      return override('Bonne chasse!', 'Good hunting!');

    default:
      return true;
  }

  function override(match, replacement, stripNewLines) {
    // Throw an error if the quote no longer matches the test.
    if (quote !== match && !quote.match(match))
      throw new Error(
        'Mount ' + mount.id + ' sound "' + quote + '" doesn\'t match test `' + match.toString()
      );

    return quote.replace(match, replacement);
  }
}