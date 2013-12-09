/** @jsx React.DOM */

var React = require('react');

var NYNY = require('../data/NYNY');

require('./GlassContent.css');

var GlassContent = React.createClass({
  render: function() {
    return (
      <div className="GlassContent">
        <p><strong>Scroll me! (touch only)</strong></p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean malesuada ligula erat, non dignissim neque tempus facilisis. Praesent eleifend metus arcu, a lacinia justo mattis condimentum. Vivamus a dui metus. Pellentesque id neque adipiscing, aliquet leo ac, luctus ipsum. Etiam vitae posuere ante. Mauris malesuada mattis tortor. Ut in massa vitae metus lacinia mollis at at enim. Nam pretium mollis felis, et euismod augue accumsan id. Nam sed elementum diam. Nunc sollicitudin consequat sagittis.</p>
        <p><img src={NYNY} width="298" height="199" /></p>
        <p>Etiam sed adipiscing massa. Nulla pulvinar erat sit amet nisi posuere, nec hendrerit libero sollicitudin. Aliquam blandit metus nec iaculis mattis. Quisque orci nulla, viverra non ullamcorper vel, semper sed mauris. In hac habitasse platea dictumst. Cras et tortor ullamcorper, imperdiet leo eget, tempor est. Suspendisse faucibus sit amet odio in cursus. Morbi eleifend felis quis augue rutrum pulvinar. Nunc sem urna, dapibus non fringilla id, ullamcorper vitae augue. Nullam non risus lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed lobortis, justo in volutpat gravida, metus eros mattis risus, sit amet mattis sapien augue in felis.</p>
      </div>
    );
  }
});

module.exports = GlassContent;