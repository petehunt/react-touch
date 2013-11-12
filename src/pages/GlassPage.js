/** @jsx React.DOM */

var React = require('React');

// Implicit require of Scroller from Zynga

var GlassContainer = require('../components/GlassContainer');
var StaticContainer = require('../components/StaticContainer');

require('./GlassPage.css');

var GlassPage = React.createClass({
  getInitialState: function() {
    return {scrollTop: 0};
  },

  componentWillMount: function() {
    this.scroller = new Scroller(this.handleScroll);
  },

  componentDidMount: function() {
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
    var children = [];
    for (var i = 0; i < 100; i++) {
      children.push(<li key={i}>Item {i}</li>);
    }
    var style = {
      WebkitTransform: 'translate3d(0, -' + this.state.scrollTop + 'px, 0)'
    };

    var maxHeight = document.body.clientHeight;

    var overlays = {
      header: {
        left: 0,
        top: 0,
        width: '100%',
        height: 40,
        style: {borderBottom: '1px solid rgba(10, 10, 10, 0.1)'},
        children: <span>This is the header</span>
      },
      footer: {
        left: 0,
        top: maxHeight - 40,
        width: '100%',
        height: 40,
        style: {borderTop: '1px solid rgba(10, 10, 10, 0.1)'},
        children: <span>This is the footer</span>
      }
    };

    var contentBox = {
      left: 0,
      top: 40,
      width: '100%',
      height: maxHeight - 2 * 40,
      style: {backgroundColor: '#fcfcfc'}
    };

    return (
      <GlassContainer
        style={{background: 'white', border: '1px solid rgba(10, 10, 10, 0.1)', width: '100%', height: 400}}
        overlays={overlays}
        content={contentBox}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}>
        <div style={style} ref="content">
          <StaticContainer>
            <ul>{children}</ul>
          </StaticContainer>
        </div>
      </GlassContainer>
    );
  }
});

module.exports = GlassPage;