/** @jsx React.DOM */

var React = require('React');

var FastLink = require('../components/FastLink');
var Header = require('../components/Header');
var PreventBrowserSwipe = require('../components/PreventBrowserSwipe');
var StaticContainer = require('../components/StaticContainer');
var StyleKeys = require('../environment/StyleKeys');
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
    var style = {};
    style[StyleKeys.TRANSFORM] = 'translate3d(' + (SIDEBAR_WIDTH - this.state.scrollLeft) + 'px, 0, 0)';

    var nav = null;

    if (this.isNavOpen()) {
      var navStyle = {
        opacity: .5 + .5 * (1 - this.state.scrollLeft / SIDEBAR_WIDTH)
      };
      // Parallax!
      navStyle[StyleKeys.TRANSFORM] = 'translate3d(' + (SIDEBAR_WIDTH - .5 * this.state.scrollLeft) + 'px, 0, 0)';

      nav = (
        <div className="Layout-nav" style={navStyle}>
          <StaticContainer>
            <div>
              <FastLink href="#home" className="Layout-navLink" onClick={this.handleNavClick}>Home</FastLink>
              <FastLink href="#glass" className="Layout-navLink" onClick={this.handleNavClick}>Frosted glass</FastLink>
              <FastLink href="#viewer" className="Layout-lastNavLink" onClick={this.handleNavClick}>Photo gallery</FastLink>
            </div>
          </StaticContainer>
        </div>
      );
    }

    return this.transferPropsTo(
      <PreventBrowserSwipe className="Layout">
        <div className="Layout-scroller">
          <div className="Layout-topBar" style={style}>
            <StaticContainer>
              <div>
                <ZyngaScrollerTouchableArea
                  className="Layout-hamburger fa fa-bars"
                  onTouchTap={this.handleTap}
                  scroller={this.scroller}
                />
                <Header>React touch demos</Header>
              </div>
            </StaticContainer>
          </div>
          <ZyngaScrollerTouchableArea
            className="Layout-content"
            style={style}
            scroller={this.scroller}
            touchable={this.isNavOpen()}
            onTouchTap={this.handleContentTouchTap}>
            <StaticContainer staticKey={this.props.route}>
              <div>{this.props.children}</div>
            </StaticContainer>
          </ZyngaScrollerTouchableArea>
          {nav}
        </div>
      </PreventBrowserSwipe>
    );
  }
});

Layout.TOPBAR_HEIGHT = TOPBAR_HEIGHT;

module.exports = Layout;