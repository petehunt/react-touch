var React = require('React');
var ReactHack = require('ReactHack');
var ViewerPage = require('./pages/ViewerPage');

React.initializeTouchEvents(true);

ReactHack.start({
  '': ViewerPage,
  ':username': ViewerPage
});