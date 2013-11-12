/** @jsx React.DOM */

var React = require('React');

var GlassViewport = React.createClass({
  getDefaultProps: function() {
    return {glassStyle: {}};
  },

  render: function() {
    var style = {
      position: 'absolute',
      left: this.props.left,
      top: this.props.top,
      width: this.props.width,
      height: this.props.height,
      overflow: 'hidden'
    };

    var glassStyle = this.props.glassStyle || {};
    glassStyle.position = 'absolute';
    // TODO: this won't animate well. Not sure if compositing will
    // make things better or worse...
    glassStyle.left = -this.props.left;
    glassStyle.top = -this.props.top;

    var contentStyle = {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0
    };

    return this.transferPropsTo(
      <div style={style}>
        <div style={glassStyle}>
          {this.props.glassContent}
        </div>
        <div style={contentStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = GlassViewport;