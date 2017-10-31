const config = require('../_config');
const request = require('request');
const fs = require('fs');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminPngcrush = require('imagemin-pngcrush');
const imageminOptipng = require('imagemin-optipng');

let createdImages;

module.exports = (type, data, resolve) => {
  createdImages = [];
  process(type, data, resolve);
}

function process(type, data, resolve) {
  const saveFolder = '../docs/icons/' + type + '/';

  if (!data.length) {
    if (!createdImages.length)
      return resolve();

    console.info("Minifying " + createdImages.length + " new " + type + " icons @ " + saveFolder + ".");
    return imagemin(createdImages, saveFolder, {
      plugins: [
          imageminPngquant({ quality: '5-10' }),
          imageminPngcrush({ reduce: true }),
          imageminOptipng()
      ]
    }).then(() => {
      console.info("Minification of " + type + " finished.");
      resolve()
    });
  }

  const entry = data.shift();

  if (entry.icon == 0)
    return process(type, data, resolve);

  const path = config.fullImagePath + pad(Math.floor(entry.icon/1000) * 1000, 6) + "/" + pad(entry.icon, 6) + ".png";
  const savePath = saveFolder + entry.icon + '.png';

  fs.exists(savePath, (exists) => {
    if (exists)
      return process(type, data, resolve);
    
    getImage(path, savePath, () => {
      process(type, data, resolve)
    });
  });
}

// http://stackoverflow.com/a/10073788/1317805
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getImage(path, savePath, callback) {
  createdImages.push(savePath);
  console.info("Creating icon @ " + savePath);
  return request.get(path, function() { callback() }).pipe(fs.createWriteStream(savePath));
}