/** @jsx React.DOM */

var Layout = require('../layout/Layout.js');

var AboutPage = React.createClass({
  render: function() {
    return (
      <Layout active="about">
        <h1>About ReactHack</h1>
        <p>This is a simple application built with React, Parse, and Bootstrap. Use it to get started building your application.</p>
      </Layout>
    );
  }
});

module.exports = AboutPage;