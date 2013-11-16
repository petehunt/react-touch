/** @jsx React.DOM */

var React = require('React');

var Layout = require('../layout/Layout');

require('./LeftNavPage.css');

var LeftNavPage = React.createClass({
  render: function() {
    return (
      <Layout className="LeftNavPage">
        <h1>Check out this sweet left nav.</h1>
        <p>If you tap the hamburger menu it will open.</p>
        <p>You can also swipe open and shut (with inertia).</p>
      </Layout>
    );
  }
});

module.exports = LeftNavPage;