/** @jsx React.DOM */

var React = require('React');

var StaticContainer = require('../components/StaticContainer');
var StyleKeys = require('../environment/StyleKeys');

var AnimatableContainer = React.createClass({
  getDefaultProps: function() {
    return {
      animating: false,
      component: React.DOM.div,
      translate: null,
      rotate: null,
      opacity: 1
    };
  },

  render: function() {
    var component = this.props.component;
    var style = {};
    var transforms = '';

    if (this.props.opacity !== 1) {
      style['opacity'] = this.props.opacity;
    }

    if (this.props.translate) {
      transforms += (
        'translate3d(' + this.props.translate.x + 'px, ' +
        this.props.translate.y + 'px, ' +
        this.props.translate.z + 'px) '
      );
    }

    if (this.props.rotate) {
      transforms += (
        'rotate3d(' + this.props.rotate.x + ', ' +
        this.props.rotate.y + ', ' +
        this.props.rotate.z + ', ' +
        this.props.rotate.deg + 'deg)'
      );
    }

    if (transforms.length > 0) {
      style[StyleKeys.TRANSFORM] = transforms;
    }

    return this.transferPropsTo(
      <component style={style}>
        <StaticContainer shouldUpdate={!this.props.animating}>
          {this.props.children}
        </StaticContainer>
      </component>
    );
  }
});

module.exports = AnimatableContainer;