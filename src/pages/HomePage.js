/** @jsx React.DOM */

var React = require('React');

var Layout = require('../layout/Layout');

require('./HomePage.css');

var HomePage = React.createClass({
  render: function() {
    return (
      <Layout className="HomePage">
        <h1>What do ya want?</h1>
        <p><a href="#glass">Frosted glass</a></p>
        <p><a href="#viewer">Photo viewer</a></p>
      </Layout>
    );
  }
});

module.exports = HomePage;