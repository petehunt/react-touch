var React = require('React');
var ReactHack = require('ReactHack');
var GlassPage = require('./pages/GlassPage');
var HomePage = require('./pages/HomePage');
var ViewerPage = require('./pages/ViewerPage');

React.initializeTouchEvents(true);

ReactHack.start({
  '': HomePage,
  'glass': GlassPage,
  'viewer': ViewerPage,
});