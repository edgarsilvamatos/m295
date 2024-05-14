const fs = require('fs')

function leseDateiInhalt(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                const character = data.length
                resolve(character)
            }
        });
    });
}

leseDateiInhalt('bla.txt')
  .then(stats => {
    console.log('Die Länge des Dateiinhalts beträgt:', stats);
  })
  .catch(err => {
    console.error('Fehler beim Lesen der Datei:', err);
  });