/* Returns information about minions with parents.
 * For example, the Minion of Light is made up of three child minions.
 */
module.exports = (minion) => {
  switch (+minion.id) {
    case 68:
    case 69:
    case 70:
      // Minion of light.
      return 67;
    
    case 72:
    case 73:
    case 74:
      // Wind-up Leader.
      return 71;
  }
}