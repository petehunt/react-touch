var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

var FPSCounter = {
  start: function() {
    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms

    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.bottom = '0px';

    document.body.appendChild(stats.domElement);

    function tick() {
      stats.update();
      rAF(tick);
    }

    tick();
  }
};

module.exports = FPSCounter;