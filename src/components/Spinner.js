/** @jsx React.DOM */

var React = require('React');

var Spinner = React.createClass({
  render: function() {
    return <img src="./static/spinner.gif" alt="Loading..." />;
  }
});

module.exports = Spinner;