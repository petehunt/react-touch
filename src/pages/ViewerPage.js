/** @jsx React.DOM */

var React = require('React');
var Message = require('../components/Message');
var Viewer = require('../components/Viewer');

var isIPhone5 = require('../environment/isIPhone5');

var IS_IPHONE_5 = isIPhone5();

var NUM_IMAGES = 10;

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
      'http://graph.facebook.com/' + this.getUsername() + '/photos?fields=name,source&limit=100',
      function(data) {
        this.setState({data: data.data.slice(START_INDEX, START_INDEX + NUM_IMAGES)});
      }.bind(this)
    );
  },

  render: function() {
    if (!IS_IPHONE_5) {
      return (
        <Message>
          This demo is only available for iPhone 5. Sorry!
        </Message>
      );
    }

    if (!this.state.data) {
      return <Message>Loading...</Message>;
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