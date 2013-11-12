/** @jsx React.DOM */

var React = require('React');

var StaticContainer = React.createClass({
  shouldComponentUpdate: function() {
    return false;
  },
  render: function() {
    return this.props.children;
  }
});

module.exports = StaticContainer;