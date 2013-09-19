/** @jsx React.DOM */

var Content = require('../model/Content');
var ContentBlock = require('../components/ContentBlock');
var Layout = require('../layout/Layout');

var ContentPage = React.createClass({
  render: function() {
    return (
      <Layout>
        <ContentBlock
          editing={this.props.routeParams[1] === 'edit'}
          name={this.props.routeParams[0]}
        />
      </Layout>
    );
  }
});

module.exports = ContentPage;