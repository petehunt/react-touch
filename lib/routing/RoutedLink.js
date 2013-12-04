/** @jsx React.DOM */

var React = require('React');

var Router = require('./Router');

var RoutedLink = React.createClass({
  handleTap: function(e) {
    Router.trigger(this.props.href);

    if (this.props.onClick) {
      this.props.onClick(e);
    }
    e.preventDefault();
  },

  render: function() {
    var linkProps = {};
    for (var key in this.props) {
      linkProps[key] = this.props[key];
    }
    linkProps.href = 'javascript:;';
    linkProps.onTouchTap = this.handleTap;
    return React.DOM.a(linkProps, this.props.children);
  }
});

module.exports = RoutedLink;