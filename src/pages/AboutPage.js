/** @jsx React.DOM */

var Layout = require('../layout/Layout.js');

var AboutPage = React.createClass({
  render: function() {
    return (
      <Layout active="about">
        <h1>About React</h1>
      </Layout>
    );
  }
});

module.exports = AboutPage;