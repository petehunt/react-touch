/** @jsx React.DOM */

var React = require('React');

var Layout = require('../layout/Layout');
var Message = require('../components/Message');

require('./LeftNavPage.css');

var isIPhone5 = require('../environment/isIPhone5');

var IS_IPHONE_5 = isIPhone5();


var LeftNavPage = React.createClass({
  getInitialState: function() {
    return {force: false};
  },

  handleClick: function() {
    this.setState({force: true});
  },

  render: function() {
    if (!IS_IPHONE_5 && !this.state.force) {
      return (
        <Message>
          This demo peforms best on at least an iPhone 5 and iOS 7.<br />
          <a href="javascript:;" onClick={this.handleClick}>Click here to live dangerously</a>.
        </Message>
      );
    }

    return (
      <Layout className="LeftNavPage">
        <h1>Check out this sweet left nav.</h1>
        <p>If you tap the hamburger menu it will open.</p>
        <p>You can also swipe open and shut (with inertia).</p>
      </Layout>
    );
  }
});

module.exports = LeftNavPage;