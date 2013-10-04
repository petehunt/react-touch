var Parse = require('parse').Parse;

var Fetching;

if (typeof Parse !== 'undefined') {
  Fetching = Parse;
} else if (typeof Backbone !== 'undefined') {
  Fetching = Backbone;
} else {
  throw new Error('Cannot require() FetchingMixin without Parse or Backbone global');
}

var FetchingMixin = {
  /**
   * Helper that's useful with Fetching.
   */
  stateSetter: function(key) {
    return function(value) {
      var newState = {};
      newState[key] = value;
      this.setState(newState);
    }.bind(this);
  },

  _isModel: function(model) {
    var ModelClass = Fetching.Object || Fetching.Model; // Support Backbone and Parse
    return (model && model instanceof ModelClass || model instanceof Fetching.Collection);
  },

  _subscribe: function(model) {
    if (!this._isModel(model)) {
      return;
    }
    // Detect if it's a collection
    if (model instanceof Fetching.Collection) {
      model.on('add remove reset sort', function () { this.forceUpdate(); }, this);
    } else if (model) {
      var changeOptions = this.changeOptions || 'change';
      model.on(changeOptions, (this.onModelChange || function () { this.forceUpdate(); }), this);
    }
  },

  _unsubscribe: function(model) {
    if (!this._isModel(model)) {
      return;
    }
    model.off(null, null, this);
  },

  _subscribeAll: function(state) {
    this.modelState.forEach(function(key) {
      this._subscribe(state[key]);
    }.bind(this));
  },

  _unsubscribeAll: function(state) {
    this.modelState.forEach(function(key) {
      this._unsubscribe(state[key]);
    }.bind(this));
  },

  componentWillMount: function() {
    if (!Array.isArray(this.modelState)) {
      throw new Error('FetchingMixin requires a modelState array attribute');
    }

    if (typeof this.fetchData !== 'function') {
      throw new Error('FetchingMixin requires a fetchData() method');
    }
  },

  componentDidMount: function() {
    // Whenever there may be a change in the Backbone data, trigger a reconcile.
    this._subscribeAll(this.state);

    this.fetchData();

    this._interval = null;
    if (this.fetchPollInterval) {
      this._interval = setInterval(this.fetchData, this.fetchPollInterval);
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    this._unsubscribeAll(prevState);
    this._subscribeAll(this.state);

    if (this.shouldRefreshData && this.shouldRefreshData(prevProps)) {
      this.fetchData();
    }
  },

  componentWillUnmount: function() {
    // Ensure that we clean up any dangling references when the component is destroyed.
    this._unsubscribeAll(this.state);
    if (this._interval) {
      clearInterval(this.interval);
    }
  }
};

module.exports = FetchingMixin;