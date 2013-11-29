var React = require('React');
var ReactHack = require('ReactHack');

var AnimationLock = require('./environment/AnimationLock');
var RootPage = require('./pages/RootPage');

// The following code is required to install the TapEventPlugin. We have
// an open issue to make this easier to do.
var EventPluginHub = require('React/modules/EventPluginHub');
var TapEventPlugin = require('./thirdparty/TapEventPlugin');

EventPluginHub.injection.injectEventPluginsByName({
  TapEventPlugin: TapEventPlugin
});

AnimationLock.init();
React.initializeTouchEvents(true);

ReactHack.start({
  '': RootPage,
  ':name': RootPage
});