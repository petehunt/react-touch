/** @jsx React.DOM */

var React = require('React');
var Viewer = require('../components/Viewer');

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
        this.setState({data: data.data});
      }.bind(this)
    );
  },

  render: function() {
    if ((screen.availWidth !== 320 || navigator.userAgent.indexOf('iPhone OS') === -1)) {
      return (
        <div style={STYLE_MESSAGE}>
          This demo is currently only available on an iPhone 5 as it is the
          only phone I have tested extensively. Android is harder because
          browser performance on image-intensive demos depends a lot on the
          amount of texture memory on the device.
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