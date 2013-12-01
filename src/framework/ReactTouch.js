var React = require('React');

var Router = require('./routing/Router');

var ReactTouch = {
  start: function(componentClass, domNode, routes) {
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

    Router.start(componentClass, domNode, routes);
  }
};

module.exports = ReactTouch;