const fs = require('fs');

// This ensures Apkallu Falls discards oudated data.
module.exports = () => {
  fs.writeFile(
    "../docs/version.json",
    JSON.stringify({
      '@': +new Date()
    }),
    'utf8',
    () => {
      console.log("Updated cache.")
    }
  );
}