const cacheBust = require('./_cacheBust');

console.log("\n");

const update = async function(args) {
  let config = {};

  if (args.length)
    args.forEach(a => config[a] = true);
  else
    config = false;

  // // Patches
  if (!config || config.patches) {
    message('Patches');
    await require('./patches/list.js').fetch();
  }

  // // Achievements.
  if (!config || config.achievements) {
    message('Achievements');
    await require('./achievements/data.js').fetch();
    await require('./achievements/list.js').fetch();
  }
  if (config && config.achievementsList) {
    await require('./achievements/list.js').fetch();
  }

  // Minions.
  if (!config || config.minions) {
    message('Minions');
    await require('./minions/data.js').fetch();
    await require('./minions/list.js').fetch();
  }
  if (config && config.minionsList) {
    await require('./minions/list.js').fetch();
    await require('./minions/list.js').fetch();
  }

  // Mounts.
  if (!config || config.mounts) {
    message('Mounts');
    await require('./mounts/data.js').fetch();
    await require('./mounts/list.js').fetch();
  }
  if (config && config.mountsList) {
    await require('./mounts/list.js').fetch();
  }

  if (!config || config.icons) {
    message('Icons');
    await require('./icons/achievements.js').fetch();
    await require('./icons/minions.js').fetch();
    await require('./icons/mounts.js').fetch();
  }

  // Cache bust.
  cacheBust();
}

function message(type) {
  console.info("Updating " + type + ".");
}

update(process.argv.slice(2));