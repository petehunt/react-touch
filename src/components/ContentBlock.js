/** @jsx React.DOM */

var React = require('React');

var Button = require('./Button');
var Content = require('../data/Content');
var Markdown = require('./Markdown');
var FetchingMixin = require('../framework/FetchingMixin');
var Spinner = require('../components/Spinner');

var ContentBlock = React.createClass({
  mixins: [FetchingMixin],

  modelState: ['content'],

  getInitialState: function() {
    return {content: null, editableContent: null, loading: false};
  },

  shouldRefreshData: function(prevProps) {
    return this.props.name !== prevProps.name;
  },

  fetchData: function() {
    Content.getByPageName(
      this.props.name,
      this.props.children,
      this.stateSetter('content')
    );
  },

  handleChange: function(e) {
    this.setState({editableContent: e.target.value});
  },

  getEditableContent: function() {
    // Example of a "computed property": either the user has changed the data
    // and it lives in this.state.editableContent, or they haven't, and it
    // lives in this.state.content.
    return this.state.editableContent || this.state.content.get('content');
  },

  handleSave: function() {
    this.state.content.set('content', this.getEditableContent());
    this.setState({loading: true});

    this.state.content.save(null, {
      success: function() {
        this.setState({loading: false});
        Parse.history.navigate('#/pages/' + this.props.name, {trigger: true});
      }.bind(this),

      error: function(obj, error) {
        console.error('Error saving', obj, error);
      }
    });
  },

  handleDelete: function() {
    this.setState({loading: true});

    this.state.content.destroy({
      success: function() {
        this.setState({loading: false});
        Parse.history.navigate('#', {trigger: true});
      }.bind(this),

      error: function(obj, error) {
        console.error('Error destroying', obj, error);
      }
    });
  },

  render: function() {
    if (!this.state.content) {
      return <Spinner />;
    }

    if (!this.props.editing) {
      return (
        <div>
          <Button href={'#/pages/' + this.props.name + '/edit'}>Edit</Button>
          <Button class="btn-danger" onClick={this.handleDelete}>
            Delete
          </Button>
          <Markdown>{this.state.content.get('content') || ''}</Markdown>
        </div>
      );
    }

    var editableContent = this.getEditableContent();

    if (this.state.saving) {
      return (
        <div>
          <Spinner />
          <Markdown>{editableContent}</Markdown>
        </div>
      );
    }

    return (
      <div>
        <Button onClick={this.handleSave} class="btn-primary">
          Save
        </Button>
        <Button href={'#/pages/' + this.props.name}>Cancel</Button>
        <textarea value={editableContent} onChange={this.handleChange} />
        <Markdown>{editableContent}</Markdown>
      </div>
    );
  }
});

module.exports = ContentBlock;