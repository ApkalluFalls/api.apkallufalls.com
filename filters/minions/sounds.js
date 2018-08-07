/* This function takes a minion ID and determines whether the French translation
 * has a sound rather than a quote (which almost all of them do).
 * 
 * @params {object} minion - The minion object.
 * 
 * @example
 * // Returns true - minion 1 has a sound in French.
 * require('sounds.js)({ id: 1, ... });
 * 
 * @example
 * // Returns false - minion speaks French.
 * require('sounds.js)()
 * 
 * @example
 * // Returns string - minion 2 makes a sound but also speaks French.
 * require('sounds.js)({ id: 2, ... });
 * 
 * @returns {(bool|string)} - if it has a sound or a sound override.
 */
module.exports = (minion) => {
  const quote = minion.quote.fr
    && minion.quote.fr
      .replace(/\<Indent\/\>/g, '')
      .replace('<If(PlayerParameter(4))>', '')
      .replace('</If>', '')
      .replace('<Else/>', ' / ')
      .replace(/\n\n/g, '\n');

  switch (minion.id) {
    case 200:
    case 201:
    case 202:
    case 203:
    case 204:
    case 205:
    case 206:
    case 207:
    case 208:
    case 209:
    case 210:
    case 211:
    case 212:
    case 220:
    case 221:
    case 222:
      return false;

    case 2:
      return override('Tout neuf, tout beau!', 'All new, all beautiful!');

    case 6:
      return override('Longue vie à l\'Amirale!', 'Long live the Admiral!');
    
    case 7:
      return override('Longue vie à notre Oracle!', 'Long live our Oracle!');

    case 8:
      return override('Longue vie au Général!', 'Long live the General!');

    case 53:
      return override('“Clic clic, clic clic!”', 'Click click, click click!');
    
    case 57:
      return override('Capitaine! Mon capitaine!', 'Captain! My captain!');

    case 58:
      return override('Pour notre honneur!', 'For our honor!');

    case 59:
      return override('Celui-ci est prêt!', 'This one is ready!');

    case 62:
      return override('“Siman frapper méchants!”', 'Brickman knock bad guys!');

    case 76:
      return override('Que vos âmes nourrissent ma lame!', 'May your souls feed my blade!');

    case 82:
      return override('Sacrifice... humain!', 'Sacrifice... human!');

    case 84:
      return override('Notre véritable trésor, c\'est vous!', 'Our true treasure is you!');
    
    case 85:
      return override('Je suis le fantasque, l\'inénarrable Gilgamesh!', 'I am the whimsical, hilarious Gilgamesh!');
    
    case 91:
      return override('Le savoirrr est la clef de la réussite.', 'Knowledge is the key to success.');
    
    case 92:
      return override('32 coups!', '32 moves!');
    
    case 93:
      return override('Tchomp... (désolé)', 'Chomp... (sorry)');

    case 98:
      return override('Allô? Ici Minfilia!', 'Hello? Minfilia here!');
    
    case 99:
      return override('On vous a déjà dit que vous aviez de beaux yeux?', 'Have you ever been told that you have beautiful eyes?');
    
    case 105:
      return override('Adieu...', 'Farewell...');
    
    case 108:
      return override('C\'est bien ce que je pensais.', 'That\'s what I thought.');
    
    case 109:
      return override('L\'aube toujours resplendit...', 'Dawn always shines...');
    
    case 110:
      return override('Meuh...iaou!', 'Moo...iaou!');
    
    case 112:
      return override('Mamie? C\'est toi?', 'Mummy? Is it you?');
    
    case 113:
      return override('En avant toute!', 'Forward all!');
    
    case 114:
      return override('J\'ai une lettre pour toi, kupo!', 'I have a letter for you, kupo!');
    
    case 116:
      return override('Pour l\'éternité!', 'For eternity!');
    
    case 118:
      return override('L\'avenir sera porteur d\'espoir.', 'The future will bring hope.');
    
    case 123:
      return override('Ô grand Ramuh!\\nProtège-nous des intrus!', 'Oh great Ramuh!\\nProtect us from intruders!', true);
    
    case 124:
      return override('Son ennemi, un  guerrier doit respecter.', 'A warrior must respect his enemy.');
    
    case 125:
      return override('Celui-ci s\'envolera!', 'This one will fly away!');
    
    case 126:
      return override('Tic tac tic tac...', 'Tick tock, tick tock...');
    
    case 129:
      return override('Je m\'en occupe. Un jeu d\'enfant!', 'I\'m taking care of it. Child\'s play!');
    
    case 130:
      return override('Pour Éorzéa!', 'For Eorzea!');
    
    case 131:
      return override('Grand-père...', 'Grandfather...');
    
    case 132:
      return override('♪ Une jolie rose a fleuri...', '♪ A prettry rose has bloomed...');

    case 133:
      return override('Allez, on plonge!', 'Come on, let\'s dive!');
    
    case 135:
      return override('Gens d\'en bas!', 'People from below!');
    
    case 138:
      return override('Coin coin!', 'Quack quack!');
    
    case 142:
      return override('Défense de lire.', 'Do not read.');
    
    case 145:
      return override('Nous serons les acteurs de\\nnotre propre délivrance!', 'We will be the actors of our own deliverance!');
    
    case 146:
      return override('Fusion, ouaf!', 'Fusion, woof!');
    
    case 149:
      return override('Une erreur a été détectée...', 'An error has been detected...');
    
    case 150:
      return override('Merci mille fois...', 'Thank you so much...');
    
    case 161:
      return override('Vieux débris! Secoue-toi un peu!', 'Old debris! Shake yourself a little!');
    
    case 165:
      return override('Peine de mort!', 'Death sentence!');

    case 167:
      return override('Mon rêve n\'est pas encore terminé!', 'My dream is not over yet!');
    
    case 168:
      return override('Succombez aux enfers!', 'Succumb to hell!');
    
    case 172:
      return override('Paisible comme le ciel bleu!', 'Peaceful like the blue sky!');
    
    case 173:
      return override('Tu veux toucher mes muscles?', 'You want to touch my muscles?');
    
    case 176:
      return override('Entraînement!', 'Training!');
    
    case 177:
      return override('Je suis prête!', 'I am ready!');
  
    case 178:
      return override('Bande de simplets!', 'You bunch of idiots!');
    
    case 181:
      return override('Crôa crôôôa...', 'Croak croooak...');

    case 182:
      return override('Pour Damcyan!', 'For Damcyan!');
    
    case 184:
      return override('J-je me rends, ayez pitié de moi!', 'I... I surrender, have pity on me!');
    
    case 185:
      return override('Ula menida tula oh!', 'Ura Menida Tula O (Hoary Arbor, Lord of Light)');
    
    case 187:
      return override('Grouik grouik!', 'Oink oink!');
    
    case 188:
      return override('Plouf plouf plouf', 'Plonk plonk plonk');
    
    case 190:
      return override('Météore!', 'Meteor!');

    case 191:
      return override('Courage! Battez-vous!... Entre-tuez-vous!', 'Courage! Fight! ...Get in!');
    
    case 192:
      return override('Un peu de respect pour ton aînée!', 'A little respect for your elder!');
    
    case 193:
      return override('Pour Ishgard!', 'For Ishgard!');
    
    case 195:
      return override('Aucun d\'entre vous ne m\'échappera!', 'None of you will escape me!');
    
    case 214:
      return override('Going-My-Way', 'Going my way');
    
    case 217:
      return override('La survie, ça me connaît', 'Survival, it knows me');
    
    case 218:
      return override('Prêtez-moi main-forte', 'Lend me a helping hand');
    
    case 224:
      return override('Où est-ce que tu te cachais, vieille canaille!?', 'Where were you hiding, old rascal!?');

    case 225:
      return override('(scrute scrute)', '(scans scans)');
    
    case 226:
      return override('Ouaf ouaf!', 'Woof woof!');

    case 228:
      return override('Espèce de...!', 'You ...!');
    
    case 231:
      return override('Comptez sur moi, Maîtresse / Maître!', 'Count on me, Mistress / Master!');
    
    case 235:
      return override('Répète un peu ça pour voir!', 'Repeat this to see!');

    case 238:
      return override('Moi et mon chocobo, nous allons là où le sentier nous mène.', 'Me and my chocobo, we go where the path leads us.');
    
    case 240:
      return override('Ouaf, ouaf!', 'Woof, woof!');

    case 246:
      return override('Aïe aïe!', 'Ouch ouch!');
    
    case 248:
      return override('Allez!', 'Go ahead!');

    case 249:
      return override('À votre service...', 'At your service...');
    
    case 253:
      return override('Du poisson!?', 'Fish!?');
    
    case 255:
      return override('Hé hé!', 'He he!');

    case 256:
      return override('Donne la viande! Miam miam la viande!', 'Give the meat! Yum yum the meat!');
    
    case 257:
      return override('Identification en cours...', 'Identification in progress...');
    
    case 258:
      return override('Tu crois que j\'ai passé sept cents ans à me goinfrer?', 'Do you think I\'ve spent seven hundred years gorging myself?');

    case 259:
      return override('Tortue méprisable!', 'Despicable turtle!');
    
    case 260:
      return override('J\'ai une histoire pour vous!', 'I have a story for you!');
    
    case 262:
      return override('Laissez-moi vous étreindre...', 'Let me hug you...');
    
    case 264:
      return override('Tu peux vraiment être fier de toi!', 'You can really be proud of yourself!');
    
    case 265:
      return override('Survivras-tu à ma charge!?', 'Will you survive my charge!?');
    
    case 266:
      return override('Les affaires tournent rondemeeeent!', 'The business is turning aroooound!');
    
    case 267:
      return override('Wouf! Wouf!', 'Woof! Woof!');
    
    case 268:
      return override('Encore un coup des tengu!', 'Another hit of Tengu!');
    
    case 275:
      return override('C\'est un piège!', 'It\'s a trap!');
    
    case 276:
      return override('Je m\'en veux tellement...', 'I\'m so angry...');
    
    case 279:
      return override('(couine)... (couine)...', '(whine)... (whine)...');
    
    case 281:
      return override('Je n\'y crois pas', 'I just can\'t believe it');
    
    case 282:
      return override('Où te caches-tu, fille de Nhaamaaa!?', 'Where are you hiding, daughter of Nhaamaaa!?')

    case 285:
      return override('Triple attaque!', 'Triple attack!');

    case 286:
      return override('Ce harrrnais scorpion me va comme un gant!', 'This scorpion harness fits me like a glove!')

    case 290:
      return override('À moi, nuage magique', 'To me, magic cloud');

    case 294:
      return override('Les Dotharl ne craignent rien, pas même la mort', 'The Dotharl fear nothing, not even death');

    case 296:
      return override('Ma pelisse vermillon est magnifique!', 'My vermilion fur-lined cloak is beautiful!');

    case 298:
      return override('Merrrci beaucoup', 'Thaaaaank you');

    case 299:
      return override('J\'ATTENDS VOS ORDRES, MAÎTRE', 'I AM WAITING YOUR ORDERS, MASTER');

    case 300:
      return override('Chat c\'est sûr!', 'Cat is sure!');

    case 301:
      return override('Grouik', 'Oink');

    default:
      return quote === minion.quote.fr ? true : quote;
  }

  function override(match, replacement, stripNewLines) {
    // Throw an error if the quote no longer matches the test.
    if (quote !== match && !quote.match(match)) {
      console.error(
        'Minion ' + minion.id + ' sound "' + quote + '" doesn\'t match test `' + match.toString()
      );
      process.exit();
    }

    return quote.replace(match, replacement);
  }
}