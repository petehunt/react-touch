/** @jsx React.DOM */

var React = require('react');

var Images = require('../data/Images');
var Layout = require('../layout/Layout');
var Message = require('../components/Message');
var Viewer = require('../components/Viewer');

var NUM_IMAGES = 10;

var START_INDEX = 5;

var ViewerPage = React.createClass({
  getInitialState: function() {
    return {width: 0, height: 0};
  },

  getUsername: function() {
    return this.props.routeParams[0] || 'JustinBieber';
  },

  componentDidMount: function() {
    this.setState({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  },

  render: function() {
    if (!this.state.width || !this.state.height) {
      return <Message>Loading...</Message>;
    }

    return (
      <Viewer
        width={this.state.width}
        height={this.state.height - Layout.TOPBAR_HEIGHT}
        images={Images}
      />
    );
  }
});

module.exports = ViewerPage;