/** @jsx React.DOM */

var React = require('React');

var Layout = require('../layout/Layout');
var HomePage = require('../pages/HomePage');
var GlassPage = require('../pages/GlassPage');
var ViewerPage = require('../pages/ViewerPage');

var RootPage = React.createClass({
  render: function() {
    var routeName = this.props.routeParams[0] || '';

    if (routeName === '') {
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