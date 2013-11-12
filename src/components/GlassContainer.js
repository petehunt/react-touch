/** @jsx React.DOM */

var React = require('React');

var GlassViewport = require('./GlassViewport');

function shallowCopy(x) {
  var y = {};
  for (var z in x) {
    if (!x.hasOwnProperty(z)) {
      continue;
    }
    y[z] = x[z];
  }
  return y;
}

function cloneChildren(children) {
  if (React.isValidComponent(children)) {
    return cloneComponent(children);
  } else if (Array.isArray(children)) {
    return children.map(cloneComponent);
  } else if (!children) {
    return null;
  } else {
    var r = {};
    for (var k in children) {
      if (!children.hasOwnProperty(k)) {
        continue;
      }
      r[k] = cloneComponent(children[k]);
    }
    return r;
  }
}

function cloneComponent(component) {
  if (!React.isValidComponent(component)) {
    // string or something
    return component;
  }
  var newInstance = new component.constructor();
  var newChildren = cloneChildren(component.props.children);
  var newProps = shallowCopy(component.props);
  delete newProps.children;
  newInstance.construct(newProps, newChildren);
  return newInstance;
}

var GLASS_STYLE = {
  WebkitFilter: 'blur(5px)'
};

var GlassContainer = React.createClass({
  getDefaultProps: function() {
    return {style: {}, overlays: {}};
  },

  render: function() {
    var viewports = [
      <GlassViewport
        key="content"
        glassContent={this.props.children}
        left={this.props.content.left}
        top={this.props.content.top}
        width={this.props.content.width}
        height={this.props.content.height}
        style={this.props.content.style}
      />
    ];

    for (var key in this.props.overlays) {
      var overlay = this.props.overlays[key];

      viewports.push(
        <GlassViewport
          key={key}
          glassContent={cloneChildren(this.props.children)}
          glassStyle={GLASS_STYLE}
          left={overlay.left}
          top={overlay.top}
          width={overlay.width}
          height={overlay.height}
          style={overlay.style}>
          {overlay.children}
        </GlassViewport>
      );
    }

    return this.transferPropsTo(
      <div style={{position: 'relative', overflow: 'hidden'}}>
        {viewports}
      </div>
    );
  }
});

module.exports = GlassContainer;