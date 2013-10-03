/** @jsx React.DOM */

var React = require('React');

var Markdown = React.createClass({
  componentWillMount: function() {
    // TODO: find a version of Showdown on npm that browserifies correctly
    this.converter = new Showdown.converter();
  },
  render: function() {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: this.converter.makeHtml(this.props.children)
        }}
      />
    );
  }
});

module.exports = Markdown;