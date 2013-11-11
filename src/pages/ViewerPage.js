/** @jsx React.DOM */

var React = require('React');
var Viewer = require('../components/Viewer');

var STYLE_LOADING = {
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
    if (!this.state.data) {
      return <span style={STYLE_LOADING}>Loading...</span>;
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