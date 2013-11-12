/** @jsx React.DOM */

var React = require('React');

require('./HomePage.css');

var HomePage = React.createClass({
  render: function() {
    return (
      <div className="HomePage">
        <h1>What do ya want?</h1>
        <p><a href="#glass">Frosted glass</a></p>
        <p><a href="#justinbieber">The Justin Bieber Experience</a></p>
      </div>
    );
  }
});

module.exports = HomePage;