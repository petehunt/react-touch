/** @jsx React.DOM */

var Modal = require('../components/Modal');

var NewPageModal = React.createClass({
  getInitialState: function() {
    return {pageName: '', error: false};
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.visible && !this.props.visible) {
      // Reset the modal when it is opened.
      this.setState(this.getInitialState());
    }
  },

  handleChange: function(e) {
    // No whitespace allowed!
    this.setState({pageName: e.target.value.replace(' ', '_')});
  },

  handleAction: function() {
    if (!this.state.pageName) {
      this.setState({error: true});
    } else {
      this.props.onNewPage(this.state.pageName);
    }

    // Prevent form submission
    return false;
  },

  render: function() {
    return this.transferPropsTo(
      <Modal title="Add a new page" actionButton="OK" onAction={this.handleAction}>
        <form onSubmit={this.handleAction}>
          <input
            type="text"
            placeholder="New page name"
            value={this.state.pageName}
            onChange={this.handleChange}
          />
        </form>
      </Modal>
    );
  }
});

module.exports = NewPageModal;