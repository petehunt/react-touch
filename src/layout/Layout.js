/** @jsx React.DOM */

var React = require('React');

var Header = require('../components/Header');
var StaticContainer = require('../components/StaticContainer');

require('./Layout.css');

// Keep in sync with Layout.css
// TODO: deprecate the CSS standard
var SIDEBAR_WIDTH = 128;

var Layout = React.createClass({
  componentWillMount: function() {
    this.scroller = new Scroller(this.handleScroll, {
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
  },

  handleScroll: function(left, top, zoom) {
    this.setState({scrollLeft: left});
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

  getInitialState: function() {
    return {scrollLeft: 0};
  },

  handleTap: function() {
    // TODO: animate scrolling etc
    if (this.state.scrollLeft === 0) {
      this.scroller.scrollTo(SIDEBAR_WIDTH, 0, true);
    } else {
      this.scroller.scrollTo(0, 0, true);
    }
  },

  render: function() {
    var style = {
      WebkitTransform: 'translate3d(' + (128 - this.state.scrollLeft) + 'px, 0, 0)'
    };
    return this.transferPropsTo(
      <div className="Layout">
        <div className="Layout-scroller" style={style}>
          <StaticContainer>
            <div>
              <div className="Layout-topBar">
                <div
                  className="Layout-hamburger fa fa-bars"
                  onTouchTap={this.handleTap}
                  onTouchStart={this.handleTouchStart}
                  onTouchMove={this.handleTouchMove}
                  onTouchEnd={this.handleTouchEnd}
                />
                <Header>React mobile playground</Header>
              </div>
              <div className="Layout-content">
                {this.props.children}
              </div>
              <div className="Layout-nav">
                navs on navs
              </div>
            </div>
          </StaticContainer>
        </div>
      </div>
    );
  }
});

module.exports = Layout;