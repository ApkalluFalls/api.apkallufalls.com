const fs = require('fs');
const walk = require('walk');

module.exports = () => {
  return new Promise(resolve => {
    // https://stackoverflow.com/a/5800843/1317805
    const walker = walk.walk('../../apkallufalls.com/docs', { followLinks: false });
    const files = [];

    walker.on('file', function(root, stat, next) {
      const result = root + '/' + stat.name;
      if (result.slice(result.length - 10, result.length) === 'index.html')
        files.push(result.replace('../../apkallufalls.com/docs', 'https://apkallufalls.com').replace('index.html', ''));
      next();
    });
    
    walker.on('end', function() {
      fs.writeFile(
        "../../apkallufalls.com/docs/sitemap.txt",
        files.join('\n'),
        'utf8',
        () => {
          console.log("Updated sitemap. Pages: " + files.length);
          resolve();
        }
      );
    });
  })
}