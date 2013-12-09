/** @jsx React.DOM */

var React = require('react');

require('./HomePage.css');

var HomePage = React.createClass({
  render: function() {
    return (
      <div>
        <h2><a href="http://reactjs.org/" target="_blank">React</a>-based touch demos</h2>
        <h3>Open the nav by tapping or swiping the button on the upper left.</h3>
        <p>Or you can <a href="https://vimeo.com/79659941" target="_blank">check out the demo video</a> instead.</p>
        <p>
          Source available <a href="http://github.com/petehunt/react-touch/" target="_blank">on my github account</a>.
        </p>
      </div>
    );
  }
});

module.exports = HomePage;