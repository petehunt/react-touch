var React = require('React');

var componentClass = null;
var domNode = null;
var routes = null;

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
  return window.location.pathname;
}

function renderRouteOnClient() {
  React.renderComponent(
    getComponentForRoute(getCurrentRouteOnClient()),
    domNode
  );
}

var Router = {
  start: function(componentClass_, domNode_, routes_) {
    if (componentClass) {
      throw new Error('Already started Router');
    }

    componentClass = componentClass_;
    domNode = domNode_;
    routes = routes_;

    window.addEventListener('popstate', renderRouteOnClient, false);

    renderRouteOnClient();
  },

  trigger: function(route) {
    window.history.pushState({}, document.title, route);
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