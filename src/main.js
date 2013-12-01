var React = require('React');
var ReactHack = require('ReactHack');
var ReactTouch = require('./framework/ReactTouch');
var FPSCounter = require('./framework/environment/FPSCounter');

var RootPage = require('./pages/RootPage');

FPSCounter.start();
ReactTouch.start(RootPage, document.getElementById('react-root'), {
  '/home': 'home',
  '/glass': 'glass',
  '/viewer': 'viewer',
  '/': 'home'
});
