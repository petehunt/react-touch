/** @jsx React.DOM */

var React = require('React');

var Layout = require('../layout/Layout');
var HomePage = require('../pages/HomePage');
var GlassPage = require('../pages/GlassPage');
var Message = require('../components/Message');
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
          This demo peforms best on at least an iPhone 5 and iOS 7.<br />
          <a href="javascript:;" onClick={this.handleClick}>Click here to live dangerously</a>.
        </Message>
      );
    }

    var routeName = this.props.routeParams[0] || 'home';

    if (routeName === '' || routeName === 'home') {
      return <Layout className="HomePage" route="home"><HomePage /></Layout>;
    } else if (routeName === 'glass') {
      return <Layout route="glass"><GlassPage /></Layout>;
    } else if (routeName === 'viewer') {
      return <Layout route="viewer"><ViewerPage /></Layout>;
    } else {
      return <h1>Route not found</h1>;
    }
  }
});

module.exports = RootPage;