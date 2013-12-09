/** @jsx React.DOM */

var React = require('react');

// Implicit require of Scroller from Zynga

var AnimatableContainer = require('react-touch/lib/primitives/AnimatableContainer');
var FrostedGlassContainer =
  require('react-touch/lib/interactions/frostedglass/FrostedGlassContainer');
var GlassContent = require('../components/GlassContent');
var Header = require('../components/Header');
var Layout = require('../layout/Layout');
var StyleKeys = require('react-touch/lib/environment/StyleKeys');

require('./GlassPage.css');

var COLORS = ['red', 'green', 'blue'];
var HEADER_HEIGHT = 50; // keep in sync w/ GlassPage.css

var GlassPage = React.createClass({
  getInitialState: function() {
    return {scrollTop: 0};
  },

  componentWillMount: function() {
    this.scroller = new Scroller(this.handleScroll);
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

  handleScroll: function(left, top, zoom) {
    this.setState({scrollTop: top});
  },

  render: function() {
    // TODO: we can make this positioning significantly less lame
    // by measuring the DOM but I'm not sure we want to rely on that
    // staying up-to-date, so for now make it explicit.
    var maxHeight = document.body.clientHeight - Layout.TOPBAR_HEIGHT;

    var overlays = {
      header: {
        left: 0,
        top: 0,
        width: '100%',
        height: HEADER_HEIGHT,
        style: {borderBottom: '1px solid rgba(10, 10, 10, 0.1)'},
        children: <Header className="GlassPage-header">Frosted glass overlay</Header>
      }
    };

    var contentBox = {
      left: 0,
      top: HEADER_HEIGHT - 1,
      width: '100%',
      height: maxHeight - HEADER_HEIGHT + 1,
      style: {backgroundColor: '#fcfcfc'}
    };

    return (
      <FrostedGlassContainer
        className="GlassPage-container"
        style={{height: maxHeight}}
        overlays={overlays}
        content={contentBox}
        scroller={this.scroller}>
        <AnimatableContainer translate={{y: -this.state.scrollTop}} ref="content">
          <GlassContent />
        </AnimatableContainer>
      </FrostedGlassContainer>
    );
  }
});

module.exports = GlassPage;