/** @jsx React.DOM */

var React = require('React');

var DemoVideo = React.createClass({
  render: function() {
    var embedCode = '<iframe src="//player.vimeo.com/video/79659941" width="500" height="889" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="http://vimeo.com/79659941">React touch demo</a> from <a href="http://vimeo.com/user18627551">Pete Hunt</a> on <a href="https://vimeo.com">Vimeo</a>.</p>';
    return <div dangerouslySetInnerHTML={{__html: embedCode}} />;
  }
});

module.exports = DemoVideo;