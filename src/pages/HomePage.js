/** @jsx React.DOM */

var React = require('React');

require('./HomePage.css');

var HomePage = React.createClass({
  render: function() {
    return (
      <div className="HomePage">
        <h1>What do ya want?</h1>
        <p><a href="#glass">Frosted glass</a></p>
        <p><a href="#viewer">Photo viewer</a></p>
        <p><a href="#leftnav">Left nav</a></p>
      </div>
    );
  }
});

module.exports = HomePage;