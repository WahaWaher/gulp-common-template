!(function () {
  /**
   * Lazy Sizes reset
   */
  lazySizesConfig = {
    init: !1
  };

  /**
   * loadScript
   */
  loadScript = function (src, options) {
    var s = document.createElement('script');

    options = options || {};

    if (options.bodyJson) {
      var body = JSON.stringify(options.bodyJson);

      s.innerText = body;
    }

    s.src = src;

    if (options.targetNode) {
      options.targetNode.appendChild(s);
    } else {
      document.body.appendChild(s);
    }
  };

  /**
   * runOn
   */
  runOn = function (fn, events) {
    var e = events || ['mouseover', 'touchstart'];

    function f() {
      for (var i = 0; i < e.length; i++) {
        document.removeEventListener(e[i], f);
      }
      fn();
    }
    for (var i = 0; i < e.length; i++) {
      document.addEventListener(e[i], f);
    }
  };
})();
