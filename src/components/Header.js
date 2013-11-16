/** @jsx React.DOM */

var React = require('React');

require('./Header.css');

var Header = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <header className="Header">
        {this.props.children}
      </header>
    )
  }
});

module.exports = Header;