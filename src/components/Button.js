/** @jsx React.DOM */

var React = require('React');

var Button = React.createClass({
  getDefaultProps: function() {
    return {href: 'javascript:;'};
  },

  render: function() {
    return this.transferPropsTo(<a role="button" class="btn">{this.props.children}</a>);
  }
});

module.exports = Button;