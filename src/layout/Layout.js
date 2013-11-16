/** @jsx React.DOM */

var React = require('React');

var Header = require('../components/Header');
var StaticContainer = require('../components/StaticContainer');

require('./Layout.css');

// Keep in sync with Layout.css
// TODO: deprecate the CSS standard
var SIDEBAR_WIDTH = 128;

var Layout = React.createClass({
  getInitialState: function() {
    return {scrollLeft: 128};
  },

  handleTap: function() {
    // TODO: animate scrolling etc
    if (this.state.scrollLeft === 0) {
      this.setState({scrollLeft: SIDEBAR_WIDTH});
    } else {
      this.setState({scrollLeft: 0});
    }
  },

  render: function() {
    var style = {
      WebkitTransform: 'translate3d(' + this.state.scrollLeft + 'px, 0, 0)'
      //marginLeft: this.state.scrollLeft
    };
    return this.transferPropsTo(
      <div className="Layout">
        <div className="Layout-scroller" style={style}>
          <StaticContainer>
            <div>
              <div className="Layout-topBar">
                <div className="Layout-hamburger fa fa-bars" onTouchTap={this.handleTap} />
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