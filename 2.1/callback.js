function verdoppeln(zahl, callback) {
setTimeout(() => {
    const ergebnis = 'Das Ergebnis ist: ' + (zahl * 2);
    callback(ergebnis)
}, 1234)
}

verdoppeln(5, function(ergebnis) {
    console.log(ergebnis);
  });