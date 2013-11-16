/** @jsx React.DOM */

var React = require('React');

require('./Layout.css');

var Layout = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <div className="Layout">
        {this.props.children}
      </div>
    );
  }
});

module.exports = Layout;