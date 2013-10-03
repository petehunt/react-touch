/** @jsx React.DOM */

var React = require('React');

var converter = new Showdown.converter();

var Markdown = React.createClass({
  render: function() {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: converter.makeHtml(this.props.children)
        }}
      />
    );
  }
});

module.exports = Markdown;