/** @jsx React.DOM */

var React = require('React');

var ZyngaScrollerTouchableArea = React.createClass({
  getDefaultProps: function() {
    return {
      component: React.DOM.div
    };
  },

  handleTouchStart: function(e) {
    if (!this.props.scroller) {
      return;
    }

    this.props.scroller.doTouchStart(e.touches, e.timeStamp);
    e.preventDefault();
  },

  handleTouchMove: function(e) {
    if (!this.props.scroller) {
      return;
    }

    this.props.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
    e.preventDefault();
  },

  handleTouchEnd: function(e) {
    if (!this.props.scroller) {
      return;
    }

    this.props.scroller.doTouchEnd(e.timeStamp);
    e.preventDefault();
  },

  render: function() {
    var component = this.props.component;
    return this.transferPropsTo(
      <component
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onTouchCancel={this.handleTouchEnd}>
        {this.props.children}
      </component>
    );
  }
});

module.exports = ZyngaScrollerTouchableArea;