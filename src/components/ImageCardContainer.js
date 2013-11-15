/** @jsx React.DOM */

var EasingFunctions = require('../math/EasingFunctions');
var ImageCard = require('./ImageCard');
var React = require('React');
var StyleKeys = require('../environment/StyleKeys');

require('./ImageCardContainer.css');

var ImageCardContainer = React.createClass({
  render: function() {
    var card = this.transferPropsTo(<ImageCard />);
    var pct = (this.props.left - (this.props.index * this.props.width)) / this.props.width;
    var x = this.props.index * this.props.width - this.props.left;
    var y = 0;
    var z = Math.abs(pct * 200) * -1;
    var yAxis = this.props.left > this.props.index * this.props.width ? 1 : -1;
    var deg = Math.abs(pct * 69);

    var style = {
      opacity: EasingFunctions.easeOutCubic(1 - Math.abs(pct))
    };

    style[StyleKeys.TRANSFORM] = 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) rotate3d(0, ' + yAxis + ', 0, ' + deg + 'deg)';
    return <div style={style} className="ImageCardContainer">{card}</div>;
  }
});

module.exports = ImageCardContainer;