/** @jsx React.DOM */

var React = require('React');

// Implicit require of Scroller from Zynga

var GlassContainer = require('../components/GlassContainer');
var GlassContent = require('../components/GlassContent');
var Message = require('../components/Message');
var StyleKeys = require('../environment/StyleKeys');

require('./GlassPage.css');

var isIPhone5 = require('../environment/isIPhone5');

var IS_IPHONE_5 = isIPhone5();

var COLORS = ['red', 'green', 'blue'];
var HEADER_HEIGHT = 40; // keep in sync w/ GlassPage.css

var GlassPage = React.createClass({
  getInitialState: function() {
    return {scrollTop: 0, force: false};
  },

  handleClick: function() {
    this.setState({force: true});
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
    if (this.configured || (!IS_IPHONE_5 && !this.state.force)) {
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

  handleTouchStart: function(e) {
    this.scroller.doTouchStart(e.touches, e.timeStamp);
    e.preventDefault();
  },

  handleTouchMove: function(e) {
    this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
    e.preventDefault();
  },

  handleTouchEnd: function(e) {
    this.scroller.doTouchEnd(e.timeStamp);
    e.preventDefault();
  },

  render: function() {
    if (!IS_IPHONE_5 && !this.state.force) {
      return (
        <Message>
          This demo peforms best on at least an iPhone 5 and iOS 7.<br />
          <a href="javascript:;" onClick={this.handleClick}>Click here to live dangerously</a>.
        </Message>
      );
    }

    var style = {};
    style[StyleKeys.TRANSFORM] = 'translate3d(0, ' + (-this.state.scrollTop) + 'px, 0)';

    // TODO: we can make this positioning significantly less lame
    // by measuring the DOM but I'm not sure we want to rely that
    // staying up-to-date, so for now make it explicit.
    var maxHeight = document.body.clientHeight;

    var overlays = {
      header: {
        left: 0,
        top: 0,
        width: '100%',
        height: HEADER_HEIGHT,
        style: {borderBottom: '1px solid rgba(10, 10, 10, 0.1)'},
        children: <div className="GlassPage-header">This is the header</div>
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
      <GlassContainer
        style={{height: maxHeight}}
        overlays={overlays}
        content={contentBox}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}>
        <div style={style} ref="content">
          <GlassContent />
        </div>
      </GlassContainer>
    );
  }
});

module.exports = GlassPage;