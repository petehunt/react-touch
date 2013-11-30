/** @jsx React.DOM */

var React = require('React');

var AnimatableContainer = require('../../primitives/AnimatableContainer');
var LeftNavBehaviors = require('./LeftNavBehaviors');
var ZyngaScroller = require('../../environment/ZyngaScroller');

var LeftNavContainer = React.createClass({
  componentWillMount: function() {
    this.scroller = new Scroller(this.handleScroll, {
      bouncing: false,
      scrollingX: true,
      scrollingY: false,
      snapping: true
    });
  },

  componentDidMount: function() {
    this.measure();
  },

  measure: function() {
    var node = this.getDOMNode();
    this.scroller.setDimensions(
      node.clientWidth,
      node.clientHeight,
      node.clientWidth + this.props.sideWidth,
      node.clientHeight
    );
    this.scroller.setSnapSize(this.props.sideWidth, node.clientHeight);
    this.scroller.scrollTo(this.props.sideWidth, 0);
  },

  componentDidUpdate: function(prevProps) {
    if (this.props.sideWidth !== prevProps.sideWidth) {
      this.measure();
    }

    if (this.props.currentNavKey !== prevProps.currentNavKey) {
      if (this.isNavOpen()) {
        this.scroller.scrollTo(this.props.sideWidth, 0, true);
      }
    }
  },

  handleScroll: function(left, top, zoom) {
    this.setState({scrollLeft: left});
  },

  getInitialState: function() {
    return {scrollLeft: 0};
  },

  getDefaultProps: function() {
    return {
      behavior: LeftNavBehaviors.PARALLAX_FADE
    };
  },

  handleTap: function() {
    if (this.isNavOpen()) {
      this.scroller.scrollTo(this.props.sideWidth, 0, true);
    } else {
      this.scroller.scrollTo(0, 0, true);
    }
  },

  handleContentTouchTap: function(e) {
    if (!this.isNavOpen()) {
      return;
    }

    this.scroller.scrollTo(this.props.sideWidth, 0, true);
    e.preventDefault();
  },

  isNavOpen: function() {
    return this.state.scrollLeft !== this.props.sideWidth;
  },

  render: function() {
    // props:
    // sideWidth
    // topHeight
    // topContent
    // button
    // sideContent
    // children (big content area)
    // currentNavItem
    var sidebarX = (this.props.sideWidth - this.state.scrollLeft);

    var side = null;

    // TODO: we could do this with style calc
    var sideStyle = {
      bottom: 0,
      left: this.props.sideWidth * -1,
      position: 'absolute',
      top: 0,
      width: this.props.sideWidth
    };

    var navBehavior = this.props.navBehavior;

    if (this.isNavOpen()) {
      side = (
        <AnimatableContainer
          style={sideStyle}
          translate={navBehavior.side.translate(this.props.sideWidth, this.state.scrollLeft)}
          rotate={navBehavior.side.rotate(this.props.sideWidth, this.state.scrollLeft)}
          opacity={navBehavior.side.opacity(this.props.sideWidth, this.state.scrollLeft)}>
          {this.props.sideContent}
        </AnimatableContainer>
      );
    }

    var touchableAreaStyle = {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0
    };

    var topStyle = {
      height: this.props.topHeight,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0
    };

    var contentStyle = {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: this.props.topHeight
    };

    return this.transferPropsTo(
      <div>
        <AnimatableContainer
          style={topStyle}
          translate={navBehavior.top.translate(this.props.sideWidth, this.state.scrollLeft)}
          rotate={navBehavior.top.rotate(this.props.sideWidth, this.state.scrollLeft)}
          opacity={navBehavior.top.opacity(this.props.sideWidth, this.state.scrollLeft)}>
          <TouchableArea
            style={touchableAreaStyle}
            onTouchTap={this.handleTap}
            scroller={this.scroller}>
            {this.props.button}
          </TouchableArea>
          {this.props.topContent}
        </AnimatableContainer>
        <AnimatableContainer
          style={contentStyle}
          translate={navBehavior.content.translate(this.props.sideWidth, this.state.scrollLeft)}
          rotate={navBehavior.content.rotate(this.props.sideWidth, this.state.scrollLeft)}
          opacity={navBehavior.content.opacity(this.props.sideWidth, this.state.scrollLeft)}>
          <TouchableArea
            style={touchableAreaStyle}
            scroller={this.scroller}
            touchable={this.isNavOpen()}
            onTouchTap={this.handleContentTouchTap}>
            {this.props.children}
          </TouchableArea>
        </AnimatableContainer>
        {side}
      </div>
    );
  }
});

module.exports = LeftNavContainer;