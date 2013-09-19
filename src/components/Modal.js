/** @jsx React.DOM */

var Modal = React.createClass({
  render: function() {
    var actionButton = null;
    if (this.props.actionButton) {
      actionButton = (
        <button
          class="btn btn-primary"
          onClick={this.props.onAction}>
          {this.props.actionButton}
        </button>
      );
    }

    return this.transferPropsTo(
      <div class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-header">
          <button type="button" class="close" onClick={this.props.onRequestClose}>×</button>
          <h3>{this.props.title}</h3>
        </div>
        <div class="modal-body">
          {this.props.children}
        </div>
        <div class="modal-footer">
          <button class="btn" onClick={this.props.onRequestClose}>Close</button>
          {actionButton}
        </div>
      </div>
    );
  },

  componentDidMount: function() {
    $(this.getDOMNode()).modal({show: this.props.visible});
  },

  componentDidUpdate: function(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      $(this.getDOMNode()).modal(this.props.visible ? 'show' : 'hide');
    }
  }
});

module.exports = Modal;