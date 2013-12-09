/** @jsx React.DOM */

var React = require('react');

var SimpleScroller =
  require('react-touch/lib/interactions/simplescroller/SimpleScroller');

require('./ScrollPage.css');

var ScrollPage = React.createClass({
  render: function() {
    var content = [];

    for (var i = 0; i < 100; i++) {
      content.push(<p key={i}>Item {i}</p>);
    }

    return (
      <SimpleScroller className="ScrollPage" options={{scrollingX: false}}>
        <div className="ScrollPage-content">{content}</div>
      </SimpleScroller>
    );
  }
});

module.exports = ScrollPage;