const config = require('../_config');
const request = require('request');
const fs = require('fs');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminPngcrush = require('imagemin-pngcrush');
const imageminOptipng = require('imagemin-optipng');
const imageminAdvpng = require('imagemin-advpng');
const Spritesmith = require('spritesmith');

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
      ],
      use: [
        imageminAdvpng()
      ]
    }).then(() => {
      console.info("Minification of " + type + " finished.");
      fs.readdir(saveFolder, (err, files) => {
        Spritesmith.run(
          { src: files.map(file => saveFolder + file) },
          (err, result) => {
            console.info("Creating icon spritesheet @ " + saveFolder);
            if (err) {
              console.info("NOTE TO SELF: INVALID FILE SIGNATURE MEANS AN ICON IS NOT A VALID IMAGE. CHECK ICONS.");
              return console.error(err);
            }

            const coordinates = {};
            Object.keys(result.coordinates).forEach(k => {
              const { x, y, width, height } = result.coordinates[k];
              const response = [
                x,
                y
              ]
              
              if (width !== 40)
                response.push(width);

              if (height !== 40)
                response.push(height);

              coordinates[k.replace(/^\.\.\/docs\/icons\/\w+\/|\.png$/g, '')] = response;
            });

            fs.writeFileSync('../docs/icons/' + type + 's.png', result.image);
            fs.writeFileSync('../docs/icons/' + type + 's.json', JSON.stringify(coordinates));
            
            console.info("Optimising icon spritesheet @ " + saveFolder);

            imagemin(['../docs/icons/' + type + 's.png'], '../docs/icons/', {
              plugins: [
                imageminPngquant({ quality: '5-10', speed: 1, floyd: 0.1 }),
                imageminPngcrush({ reduce: true }),
                imageminOptipng()
              ]
            }).then(() => {
              resolve();
            })
          }
        )
      })
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