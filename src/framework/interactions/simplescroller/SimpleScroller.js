/** @jsx React.DOM */

var React = require('React');

var AnimatableContainer = require('../../primitives/AnimatableContainer');
var TouchableArea = require('../../primitives/TouchableArea');
var ZyngaScroller = require('../../environment/ZyngaScroller');

var ANIMATABLE_CONTAINER_STYLE = {
  bottom: 0,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0
};

var SimpleScroller = React.createClass({
  getInitialState: function() {
    return {left: 0, top: 0};
  },

  componentWillMount: function() {
    this.scroller = new Scroller(this.handleScroll, this.props.options);
    this.configured = false;
  },

  componentDidMount: function() {
    this.configure();
  },

  componentDidUpdate: function() {
    this.configure();
  },

  configure: function() {
    if (this.configured) {
      return;
    }
    this.configured = true;
    var node = this.refs.content.getDOMNode();
    this.scroller.setDimensions(
      this.getDOMNode().clientWidth,
      this.getDOMNode().clientHeight,
      node.clientWidth,
      node.clientHeight
    );
  },

  handleScroll: function(left, top) {
    // TODO: zoom
    this.setState({
      left: left,
      top: top
    });
  },

  render: function() {
    return this.transferPropsTo(
      <TouchableArea scroller={this.scroller} style={{overflow: 'hidden'}}>
        <AnimatableContainer
          translate={{x: -1 * this.state.left, y: -1 * this.state.top}}
          style={ANIMATABLE_CONTAINER_STYLE}>
          <div ref="content">{this.props.children}</div>
        </AnimatableContainer>
      </TouchableArea>
    );
  }
});

module.exports = SimpleScroller;