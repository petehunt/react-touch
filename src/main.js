var React = require('React');
var ReactHack = require('ReactHack');

var GlassPage = require('./pages/GlassPage');
var HomePage = require('./pages/HomePage');
var ViewerPage = require('./pages/ViewerPage');

// The following code is required to install the TapEventPlugin. We have
// an open issue to make this easier to do.
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