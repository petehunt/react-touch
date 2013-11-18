/** @jsx React.DOM */

var React = require('React');

var Layout = require('../layout/Layout');

require('./HomePage.css');

var HomePage = React.createClass({
  render: function() {
    return (
      <Layout className="HomePage">
        <h1><a href="http://reactjs.org/" target="_blank">React</a>-based touch demos</h1>
        <p>Use the back button to get back to this menu.</p>
        <p><a href="#glass">Frosted glass</a></p>
        <p><a href="#viewer">Photo viewer</a></p>
        <p><a href="#leftnav">Left nav</a></p>
      </Layout>
    );
  }
});

module.exports = HomePage;