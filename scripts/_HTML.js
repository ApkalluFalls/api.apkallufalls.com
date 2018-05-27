'use strict';

const fs = require('fs');

module.exports = function(fileName, content, folder, callback) {
  const baseFolder = "../../apkallufalls.com";
  const pathPart = (folder ? "/" + folder : "") + "/" + fileName ;
  let path = baseFolder + pathPart + "/index.html";
  const url = "https://alpha.apkallufalls.com" + pathPart;

  const emoji = content.emoji;
  const summary = content.list ? 'summary_large_image' : 'summary';
  const backdrop = 'https://alpha.apkallufalls.com/icon/backdrop-2.0.png?v=2';
  const twitterImage = content.list ? backdrop : (
    content.image
    ? content.image
    : 'https://alpha.apkallufalls.com/icon/apkallu-special.png'
  );

  if (!fs.existsSync(baseFolder + pathPart)){
    fs.mkdirSync(baseFolder + pathPart);
  }

  fs.writeFile(path, `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${content.description}">
    <meta property="fb:app_id" content="157526838114044">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${(emoji ? emoji + ' ' : '') + content.title}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${backdrop}">
    <meta property="og:description" content="${content.description}">
    <meta name="twitter:card" content="${summary}" />
    <meta name="twitter:creator" content="@inb4" />
    <meta name="twitter:site" content="@apkallufalls" />
    <meta name="twitter:title" content="${(emoji ? emoji + ' ' : '') + content.title}" />
    <meta name="twitter:description" content="${content.description}" />
    <meta name="twitter:image" content="${twitterImage}" />
    <title>${content.title}</title>
    <link rel="icon" type="image/png" href="/icon/favicon.png">
    <script>
      var segmentCount = 0;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/?p=/' +
        l.pathname.slice(1).split('/').slice(segmentCount).join('/').replace(/&/g, '~and~') +
        (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
    <p>If you're seeing this text, please tweet <a href="https://twitter.com/apkallufalls">@ApkalluFalls</a> as this is a bug.</p>
  </body>
</html>`, 'utf8', callback);
}