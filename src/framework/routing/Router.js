var React = require('React');

var componentClass = null;
var domNode = null;
var routes = null;
var historyRoot = null;

function getComponentForRoute(route) {
  for (var regexSource in routes) {
    var regex = new RegExp(regexSource);
    var result = regex.exec(route);

    if (result) {
      return componentClass({
        routeName: routes[regexSource],
        routeParams: result
      });
      break;
    }
  }

  return React.DOM.span(null, 'ReactHack: 404 not found');
}

function getCurrentRouteOnClient() {
  if (historyRoot) {
    return window.location.pathname;
  } else {
    return window.location.hash.slice(1);
  }
}

function renderRouteOnClient() {
  React.renderComponent(
    getComponentForRoute(getCurrentRouteOnClient()),
    domNode
  );
}

var Router = {
  start: function(componentClass_, domNode_, routes_, historyRoot_) {
    if (componentClass) {
      throw new Error('Already started Router');
    }

    componentClass = componentClass_;
    domNode = domNode_;
    routes = routes_;
    historyRoot = window.history && historyRoot_;

    if (historyRoot) {
      window.addEventListener('popstate', renderRouteOnClient, false);

      // If we got a hash-based URL and we want to use history API
      // do a redirect.
      if (window.location.hash.length > 0) {
        var redirectRoute = window.location.hash;
        window.location.hash = '';
        Router.trigger(redirectRoute.slice(1));
      } else {
        renderRouteOnClient();
      }
    } else {
      window.addEventListener('hashchange', renderRouteOnClient, false);

      // If we got a history-based URL and we want to use hash routing
      // do a redirect.
      if (window.location.pathname.indexOf(historyRoot) === 0 && window.location.hash.length === 0) {
        Router.trigger(window.location.pathname.slice(historyRoot.length));
      } else {
        renderRouteOnClient();
      }
    }
  },

  trigger: function(route) {
    if (route.length === 0 || route[0] !== '/') {
      throw new Error('trigger() takes an absolute path');
    }

    if (historyRoot) {
      window.history.pushState({}, document.title, route);
    } else {
      window.location.hash = route;
    }
    renderRouteOnClient();
  },

  getMarkupForRoute: function(route, cb) {
    React.renderComponentToString(
      getComponentForRoute(route),
      cb
    );
  }
};

module.exports = Router;