var React = require('react');
var ReactTouch = require('react-touch');
var FPSCounter = require('react-touch/lib/environment/FPSCounter');

var RootPage = require('./pages/RootPage');

FPSCounter.start();
ReactTouch.start(RootPage, document.getElementById('react-root'), {
  '/home': 'home',
  '/glass': 'glass',
  '/scroll': 'scroll',
  '/viewer': 'viewer',
  '/': 'home'
});
