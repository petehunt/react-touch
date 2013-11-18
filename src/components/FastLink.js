/** @jsx React.DOM */

var React = require('React');
var Parse = require('parse').Parse;

var FastLink = React.createClass({
  handleTap: function(e) {
    Parse.history.navigate(this.props.href, {trigger: true});
    e.preventDefault();
    if (this.props.onClick) {
      this.props.onClick();
    }
  },

  render: function() {
    return this.transferPropsTo(
      <a onTouchTap={this.handleTap}>
        {this.props.children}
      </a>
    );
  }
});

module.exports = FastLink;