var React = require('React');
var ReactHack = require('ReactHack');
var GlassPage = require('./pages/GlassPage');
var ViewerPage = require('./pages/ViewerPage');

React.initializeTouchEvents(true);

ReactHack.start({
  '': ViewerPage,
  'glass': GlassPage,
  ':username': ViewerPage,
});