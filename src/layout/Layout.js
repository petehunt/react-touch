/** @jsx React.DOM */

var React = require('React');

var App = require('../framework/App');
var AnimatableContainer = require('../components/AnimatableContainer');
var FastLink = require('../components/FastLink');
var Header = require('../components/Header');
var StaticContainer = require('../components/StaticContainer');
var ZyngaScrollerTouchableArea =
  require('../components/ZyngaScrollerTouchableArea');

require('./Layout.css');

// Keep in sync with Layout.css
// TODO: deprecate the CSS standard
var SIDEBAR_WIDTH = 192;
var TOPBAR_HEIGHT = 50 + 1; // + 1 for the border

var Layout = React.createClass({
  componentWillMount: function() {
    this.scroller = new Scroller(this.handleScroll, {
      bouncing: false,
      scrollingX: true,
      scrollingY: false,
      snapping: true
    });
  },

  componentDidMount: function() {
    var node = this.getDOMNode();
    this.scroller.setDimensions(
      node.clientWidth,
      node.clientHeight,
      node.clientWidth + SIDEBAR_WIDTH,
      node.clientHeight
    );
    this.scroller.setSnapSize(SIDEBAR_WIDTH, node.clientHeight);
    this.scroller.scrollTo(SIDEBAR_WIDTH, 0);
  },

  handleScroll: function(left, top, zoom) {
    this.setState({scrollLeft: left});
  },

  getInitialState: function() {
    return {scrollLeft: 0};
  },

  handleTap: function() {
    if (this.isNavOpen()) {
      this.scroller.scrollTo(SIDEBAR_WIDTH, 0, true);
    } else {
      this.scroller.scrollTo(0, 0, true);
    }
  },

  handleNavClick: function() {
    if (this.isNavOpen()) {
      this.scroller.scrollTo(SIDEBAR_WIDTH, 0, true);
    }
  },

  handleContentTouchTap: function(e) {
    if (!this.isNavOpen()) {
      return;
    }

    this.scroller.scrollTo(SIDEBAR_WIDTH, 0, true);
    e.preventDefault();
  },

  isNavOpen: function() {
    return this.state.scrollLeft !== SIDEBAR_WIDTH;
  },

  render: function() {
    var sidebarX = (SIDEBAR_WIDTH - this.state.scrollLeft);

    var nav = null;

    if (this.isNavOpen()) {
      var navOpacity = .5 + .5 * (1 - this.state.scrollLeft / SIDEBAR_WIDTH);
      var navX = (SIDEBAR_WIDTH - .5 * this.state.scrollLeft);

      nav = (
        <AnimatableContainer
          className="Layout-nav"
          translate={{x: navX}}
          opacity={navOpacity}>
          <div>
            <FastLink href="#home" className="Layout-navLink" onClick={this.handleNavClick}>Home</FastLink>
            <FastLink href="#glass" className="Layout-navLink" onClick={this.handleNavClick}>Frosted glass</FastLink>
            <FastLink href="#viewer" className="Layout-lastNavLink" onClick={this.handleNavClick}>Photo gallery</FastLink>
          </div>
        </AnimatableContainer>
      );
    }

    return this.transferPropsTo(
      <App className="Layout">
        <div className="Layout-scroller">
          <AnimatableContainer className="Layout-topBar" translate={{x: sidebarX}}>
            <ZyngaScrollerTouchableArea
              className="Layout-hamburger fa fa-bars"
              onTouchTap={this.handleTap}
              scroller={this.scroller}>
              {'='}
            </ZyngaScrollerTouchableArea>
            <Header>React touch demos</Header>
          </AnimatableContainer>
          <AnimatableContainer translate={{x: sidebarX}} className="Layout-contentContainer">
            <ZyngaScrollerTouchableArea
              className="Layout-content"
              scroller={this.scroller}
              touchable={this.isNavOpen()}
              onTouchTap={this.handleContentTouchTap}>
              {this.props.children}
            </ZyngaScrollerTouchableArea>
          </AnimatableContainer>
          {nav}
        </div>
      </App>
    );
  }
});

Layout.TOPBAR_HEIGHT = TOPBAR_HEIGHT;

module.exports = Layout;