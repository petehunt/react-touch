/** @jsx React.DOM */

var React = require('React');

// Implicit require of Scroller from Zynga

var GlassContainer = require('../components/GlassContainer');
var Message = require('../components/Message');
var StaticContainer = require('../components/StaticContainer');
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

    var children = [];
    for (var i = 0; i < 100; i++) {
      children.push(
        <li key={i} style={{color: COLORS[i % COLORS.length]}}>
          Item {i}!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        </li>
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
        style={{background: 'white', border: '1px solid rgba(10, 10, 10, 0.1)', width: '100%', height: maxHeight}}
        overlays={overlays}
        content={contentBox}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}>
        <div style={style} ref="content">
          <StaticContainer>
            <div style={{padding: 10}}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean malesuada ligula erat, non dignissim neque tempus facilisis. Praesent eleifend metus arcu, a lacinia justo mattis condimentum. Vivamus a dui metus. Pellentesque id neque adipiscing, aliquet leo ac, luctus ipsum. Etiam vitae posuere ante. Mauris malesuada mattis tortor. Ut in massa vitae metus lacinia mollis at at enim. Nam pretium mollis felis, et euismod augue accumsan id. Nam sed elementum diam. Nunc sollicitudin consequat sagittis.</p>
              <p><img src="http://www.finishingsolutionsnetwork.com/wp-content/uploads/2013/04/bay-bridge-2.jpg" width="298" height="199" /></p>
              <p>Etiam sed adipiscing massa. Nulla pulvinar erat sit amet nisi posuere, nec hendrerit libero sollicitudin. Aliquam blandit metus nec iaculis mattis. Quisque orci nulla, viverra non ullamcorper vel, semper sed mauris. In hac habitasse platea dictumst. Cras et tortor ullamcorper, imperdiet leo eget, tempor est. Suspendisse faucibus sit amet odio in cursus. Morbi eleifend felis quis augue rutrum pulvinar. Nunc sem urna, dapibus non fringilla id, ullamcorper vitae augue. Nullam non risus lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed lobortis, justo in volutpat gravida, metus eros mattis risus, sit amet mattis sapien augue in felis.</p>
            </div>
          </StaticContainer>
        </div>
      </GlassContainer>
    );
  }
});

module.exports = GlassPage;