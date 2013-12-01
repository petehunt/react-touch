var React = require('React');
var ReactTouch = require('./framework/ReactTouch');
var FPSCounter = require('./framework/environment/FPSCounter');

var RootPage = require('./pages/RootPage');

FPSCounter.start();
ReactTouch.start(RootPage, document.getElementById('react-root'), {
  '/home': 'home',
  '/glass': 'glass',
  '/scroll': 'scroll',
  '/viewer': 'viewer',
  '/': 'home'
});
