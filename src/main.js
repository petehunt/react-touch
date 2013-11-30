var React = require('React');
var ReactHack = require('ReactHack');

var FPSCounter = require('./framework/environment/FPSCounter');

FPSCounter.start();

var RootPage = require('./pages/RootPage');

// The following code is required to install the TapEventPlugin. We have
// an open issue to make this easier to do.
var EventPluginHub = require('React/modules/EventPluginHub');
var ResponderEventPlugin = require('./thirdparty/ResponderEventPlugin');
var TapEventPlugin = require('./thirdparty/TapEventPlugin');

EventPluginHub.injection.injectEventPluginsByName({
  ResponderEventPlugin: ResponderEventPlugin,
  TapEventPlugin: TapEventPlugin
});

React.initializeTouchEvents(true);

ReactHack.start({
  '': RootPage,
  ':name': RootPage
});