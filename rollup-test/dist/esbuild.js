(() => {
  // src/module.js
  function log(value) {
    console.log(value);
  }
  var a = 2;
  for (let i = 0; i < 5; i++) {
    a = a * a;
    (function() {
      let a2 = "Dupa";
      a2 = "dupadupa";
    })();
  }

  // src/index.js
  log(a);
})();
