'use strict';

// This function returns the weight of a given achievement.
module.exports = function(achievement) {
	switch (+achievement.Type) {
		case 4: // affix n materia to the same piece of gear
		case 10: // level your companion chocobo to rank n
		case 12: // participate in n matches in The Fold
		case 13: // triumph in n matches in The Fold
		case 17: // participate in n Frontline matches
		case 19: // triumph in n Frontline matches
			return achievement.Data0;

		case 1: // do n things
		case 3: // achieve n levels as class
		case 11: // achieve PVP rank n with a specific Grand Company
		case 15: // achieve rank n with a specific Beast Tribe
		case 18: // guide a specific Grand Company to n Frontline victories
		case 21: // obtain n minions
			return achievement.Data1;

		case 0: // complete specific Legacy thing (some stil relevant)
		case 5: // complete all n of these requirement_2 - 9 things
		case 6: // complete a specific quest
		case 7: // complete all specific hunting log entries
		case 8: // discover every location within...
		case 9: // complete any of these requirement_2 - 9 quests (?)
		case 14: // complete a specific Trial
		case 20: // attune to all aether currents in a specific area
		case 23: // complete all Verminion challenges
		case 24: // obtain a variety of anima weapon
			return 1;

		case 2: // complete n other achievements
			return 0; // the other achievements have their own weights and this is automatic
			
		case 16: // there is no type 16
		case 22: // there is no type 22
		default:
			console.error("Unknown achievement type " + achievement.Type + " detected. achievements/_getWeight.js will need updating.");
			return process.exit();
	}
}