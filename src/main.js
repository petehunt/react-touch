var React = require('React');
var ReactHack = require('ReactHack');
var ReactTouch = require('./framework/ReactTouch.js');
var FPSCounter = require('./framework/environment/FPSCounter');

var RootPage = require('./pages/RootPage');

ReactTouch.start();
FPSCounter.start();
ReactHack.start({
  '': RootPage,
  ':name': RootPage
});