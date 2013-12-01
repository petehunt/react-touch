var React = require('React');

var componentClass = null;
var domNode = null;
var routes = null;
var useHistory = false;

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
  if (useHistory) {
    return window.location.pathname;
  } else {
    return '/' + window.location.hash.slice(1);
  }
}

function renderRouteOnClient() {
  React.renderComponent(
    getComponentForRoute(getCurrentRouteOnClient()),
    domNode
  );
}

var Router = {
  start: function(componentClass_, domNode_, routes_, useHistory_) {
    if (componentClass) {
      throw new Error('Already started Router');
    }

    componentClass = componentClass_;
    domNode = domNode_;
    routes = routes_;
    useHistory = useHistory_ && !!window.history;

    if (useHistory) {
      window.addEventListener('popstate', renderRouteOnClient, false);

      // If we got a hash-based URL and we want to use history API
      // do a redirect.
      if (window.location.hash.length > 0) {
        var redirectRoute = window.location.hash;
        window.location.hash = '';
        Router.trigger('/' + redirectRoute.slice(1));
      } else {
        renderRouteOnClient();
      }
    } else {
      window.addEventListener('hashchange', renderRouteOnClient, false);
      renderRouteOnClient();
    }
  },

  trigger: function(route) {
    if (route.length === 0 || route[0] !== '/') {
      throw new Error('trigger() takes an absolute path');
    }

    if (useHistory) {
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