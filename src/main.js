var Parse = require('parse').Parse;

var AboutPage = require('./pages/AboutPage');
var ContentPage = require('./pages/ContentPage');
var HomePage = require('./pages/HomePage');
var ReactHack = require('./framework/ReactHack');

Parse.initialize('APPLICATION_ID', 'JAVASCRIPT_KEY');

ReactHack.start({
  '': HomePage,
  'pages/:name': ContentPage,
  'pages/:name/:mode': ContentPage,
  'about': AboutPage
});