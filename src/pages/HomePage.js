/** @jsx React.DOM */

var React = require('React');

var Button = require('../components/Button');
var Content = require('../data/Content');
var Layout = require('../layout/Layout');
var NewPageModal = require('../components/NewPageModal');
var FetchingMixin = require('../framework/FetchingMixin');
var Spinner = require('../components/Spinner');

var HomePage = React.createClass({
  mixins: [FetchingMixin],

  modelState: ['pages'],
  fetchPollInterval: 60000,

  fetchData: function() {
    Content.getAll(this.stateSetter('pages'));
  },

  getInitialState: function() {
    return {pages: null, modalShown: false};
  },

  handleClick: function() {
    this.setState({modalShown: true});
  },

  handleNewPage: function(name) {
    this.setState({modalShown: false});
    this.state.pages.createContent(name);
  },

  render: function() {
    var content;

    if (this.state.pages) {
      var links = this.state.pages.models.map(function(model) {
        var name = model.get('pageName');
        return (
          <li key={name}><a href={'#/pages/' + name}>{name}</a></li>
        );
      });
      content = (
        <ul>
          {links}
          <li><Button onClick={this.handleClick}>Add new</Button></li>
        </ul>
      );
    } else {
      content = <Spinner />;
    }

    return (
      <Layout active="home">
        {content}
        <NewPageModal
          visible={this.state.modalShown}
          onRequestClose={this.setState.bind(this, {modalShown: false}, null)}
          onNewPage={this.handleNewPage}
        />
      </Layout>
    );
  }
});

module.exports = HomePage;