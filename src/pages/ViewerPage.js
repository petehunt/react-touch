/** @jsx React.DOM */

var React = require('React');
var Viewer = require('../components/Viewer');

var NUM_IMAGES = 10;

var STYLE_MESSAGE = {
  bottom: 0,
  color: 'gray',
  fontFamily: 'sans-serif',
  fontSize: '16px',
  left: 0,
  marginTop: -8,
  position: 'absolute',
  right: 0,
  textAlign: 'center',
  top: '50%'
};

var IS_IPHONE_5 = Math.max(
  window.screen.height,
  window.screen.width
) * window.devicePixelRatio === 1136 &&
  window.navigator.userAgent.indexOf('iPhone OS 7') > -1;

var START_INDEX = 5;

var ViewerPage = React.createClass({
  getInitialState: function() {
    return {data: null, width: 0, height: 0};
  },

  getUsername: function() {
    return this.props.routeParams[0] || 'JustinBieber';
  },

  componentDidMount: function() {
    this.setState({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });

    $.getJSON(
      'http://graph.facebook.com/' + this.getUsername() + '/photos?fields=images&limit=100',
      function(data) {
        this.setState({data: data.data.slice(START_INDEX, START_INDEX + NUM_IMAGES)});
      }.bind(this)
    );
  },

  render: function() {
    if (!IS_IPHONE_5) {
      return (
        <div style={STYLE_MESSAGE}>
          This demo is only available for iPhone 5. Sorry!
        </div>
      );
    }

    if (!this.state.data) {
      return <div style={STYLE_MESSAGE}>Loading...</div>;
    }

    return (
      <Viewer
        width={this.state.width}
        height={this.state.height}
        images={this.state.data}
      />
    );
  }
});

module.exports = ViewerPage;