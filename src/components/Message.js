/** @jsx React.DOM */

var React = require('React');

require('./Message.css');

var Message = React.createClass({
  render: function() {
    return <div className="Message">{this.props.children}</div>;
  }
});

module.exports = Message;