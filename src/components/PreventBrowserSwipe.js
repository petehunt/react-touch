/** @jsx React.DOM */

var React = require('React');

// Some browsers will do a weird bounce thing. This disables it.
var PreventBrowserSwipe = React.createClass({
  handleTouch: function(e) {
    e.preventDefault();
  },

  render: function() {
    return this.transferPropsTo(
      <div onTouchMove={this.handleTouch}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = PreventBrowserSwipe;