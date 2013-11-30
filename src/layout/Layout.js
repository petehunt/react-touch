/** @jsx React.DOM */

var React = require('React');

var App = require('../framework/primitives/App');
var FastLink = require('../components/FastLink');
var Header = require('../components/Header');
var LeftNavContainer = require('../framework/interactions/leftnav/LeftNavContainer');

require('./Layout.css');

// Keep in sync with Layout.css
// TODO: deprecate the CSS standard
var SIDEBAR_WIDTH = 192;
var TOPBAR_HEIGHT = 50; // + 1 for the border

var Layout = React.createClass({
  getInitialState: function() {
    return {numNavs: 0};
  },

  handleNavClick: function() {
    this.setState({numNavs: this.state.numNavs + 1});
  },

  render: function() {
    var button = (
      <div className="Layout-hamburger fa fa-bars">{'='}</div>
    );

    var topContent = (
      <Header className="Layout-topBar">React touch demos</Header>
    );

    var sideContent = (
      <div className="Layout-nav">
        <FastLink href="#home" className="Layout-navLink" onClick={this.handleNavClick}>Home</FastLink>
        <FastLink href="#glass" className="Layout-navLink" onClick={this.handleNavClick}>Frosted glass</FastLink>
        <FastLink href="#viewer" className="Layout-lastNavLink" onClick={this.handleNavClick}>Photo gallery</FastLink>
      </div>
    );

    return (
      <LeftNavContainer
        button={button}
        currentNavKey={this.state.numNavs}
        topContent={topContent}
        sideContent={sideContent}
        topHeight={TOPBAR_HEIGHT}
        sideWidth={SIDEBAR_WIDTH}>
        <div className="Layout-content">
          {this.props.children}
        </div>
      </LeftNavContainer>
    );
  }
});

Layout.TOPBAR_HEIGHT = TOPBAR_HEIGHT + 1; // account for border

module.exports = Layout;