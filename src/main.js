var React = require('React');
var ReactHack = require('ReactHack');
var GlassPage = require('./pages/GlassPage');
var HomePage = require('./pages/HomePage');
var ViewerPage = require('./pages/ViewerPage');

var EventPluginHub = require('React/modules/EventPluginHub');
var TapEventPlugin = require('./thirdparty/TapEventPlugin');

EventPluginHub.injection.injectEventPluginsByName({
  TapEventPlugin: TapEventPlugin
});

React.initializeTouchEvents(true);

ReactHack.start({
  '': HomePage,
  'glass': GlassPage,
  'viewer': ViewerPage,
});