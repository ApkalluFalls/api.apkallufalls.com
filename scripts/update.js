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
    require('./patches/list.js').fetch();
  }

  // // Achievements.
  if (!config || config.achievements) {
    message('Achievements');
    await require('./achievements/data.js').fetch();
    require('./achievements/list.js').fetch();
  }
  if (config && config.achievementsList) {
    require('./achievements/list.js').fetch();
  }

  // Minions.
  if (!config || config.minions) {
    message('Minions');
    await require('./minions/data.js').fetch();
    require('./minions/list.js').fetch();
  }
  if (config && config.minionsList) {
    require('./minions/list.js').fetch();
  }

  // Mounts.
  if (!config || config.mounts) {
    message('Mounts');
    await require('./mounts/data.js').fetch();
    require('./mounts/list.js').fetch();
  }
  if (config && config.mountsList) {
    require('./mounts/list.js').fetch();
  }

  // Cache bust.
  cacheBust();
}

function message(type) {
  console.info("Updating " + type + ".");
}

update(process.argv.slice(2));