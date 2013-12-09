/** @jsx React.DOM */

var React = require('react');

var Layout = require('../layout/Layout');
var HomePage = require('../pages/HomePage');
var GlassPage = require('../pages/GlassPage');
var Message = require('../components/Message');
var ScrollPage = require('../pages/ScrollPage');
var ViewerPage = require('../pages/ViewerPage');

var isIPhone5 = require('../environment/isIPhone5');

var IS_IPHONE_5 = isIPhone5();

var RootPage = React.createClass({
  getInitialState: function() {
    return {force: false};
  },

  handleClick: function() {
    this.setState({force: true});
  },

  render: function() {
    if (!IS_IPHONE_5 && !this.state.force) {
      return (
        <Message>
          <p>This demo peforms best on at least an iPhone 5 and iOS 7.</p>
          <p><a href="javascript:;" onClick={this.handleClick}>Click here to run the demo anyway</a>.</p>
          <p><a href="https://vimeo.com/79659941" target="_blank">Or check out the demo video instead</a>.</p>
        </Message>
      );
    }

    var routeName = this.props.routeName;

    if (routeName === '' || routeName === 'home') {
      return <Layout className="HomePage" route="home"><HomePage /></Layout>;
    } else if (routeName === 'glass') {
      return <Layout><GlassPage /></Layout>;
    } else if (routeName === 'viewer') {
      return <Layout><ViewerPage /></Layout>;
    } else if (routeName === 'scroll') {
      return <Layout><ScrollPage /></Layout>;
    } else {
      return <h1>Route not found</h1>;
    }
  }
});

module.exports = RootPage;