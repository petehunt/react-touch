/** @jsx React.DOM */

var React = require('React');

var AnimationLock = require('../environment/AnimationLock');
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

  componentWillMount: function() {
    this.wasEverOnGPU = false;
  },

  componentDidUpdate: function(prevProps) {
    var style = this.getStyle(this.props);
    var prevStyle = this.getStyle(prevProps);
    if (style['opacity'] !== prevStyle.opacity ||
        style[StyleKeys.TRANSFORM] !== prevStyle[StyleKeys.TRANSFORM]) {
      AnimationLock.informAnimationFrame();
    }
  },

  getStyle: function(props) {
    var style = {};
    var transforms = '';

    if (props.opacity !== 1) {
      style['opacity'] = props.opacity;
    }

    if (props.translate) {
      transforms += (
        'translate3d(' + (props.translate.x || 0) + 'px, ' +
        (props.translate.y || 0) + 'px, ' +
        (props.translate.z || 0) + 'px) '
      );
    }

    if (props.rotate) {
      transforms += (
        'rotate3d(' + (props.rotate.x || 0) + ', ' +
        (props.rotate.y || 0) + ', ' +
        (props.rotate.z || 0) + ', ' +
        props.rotate.deg + 'deg)'
      );
    }

    if (transforms.length > 0) {
      style[StyleKeys.TRANSFORM] = transforms;
      this.wasEverOnGPU = true;
    } else {
      if (this.wasEverOnGPU) {
        // on iOS when you go from translate3d to non-translate3d you get
        // flicker. Let's avoid it
        style[StyleKeys.TRANSFORM] = 'translate3d(0, 0, 0)';
      }
    }

    return style;
  },

  render: function() {
    var component = this.props.component;

    return this.transferPropsTo(
      <component style={this.getStyle(this.props)}>
        <StaticContainer shouldUpdate={AnimationLock.isUnlocked(this)}>
          {this.props.children}
        </StaticContainer>
      </component>
    );
  }
});

module.exports = AnimatableContainer;