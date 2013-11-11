/** @jsx React.DOM */

// Implicit require of Scroller from Zynga
var ImageCardContainer = require('./ImageCardContainer');
var React = require('React');

require('./Viewer.css');

var Viewer = React.createClass({
  componentWillMount: function() {
    this.scroller = new Scroller(this.handleScroll, {
      snapping: true
    });
  },

  componentDidMount: function() {
    this.scroller.setDimensions(
      this.props.width,
      this.props.height,
      this.props.width * this.props.images.length,
      this.props.height
    );
    this.scroller.setSnapSize(this.props.width, this.props.height);
  },

  getInitialState: function() {
    return {left: 0};
  },

  handleScroll: function(left, top, zoom) {
    this.setState({left: left});
  },

  handleTouchStart: function(e) {
    this.scroller.doTouchStart(e.touches, e.timeStamp);
    e.preventDefault();
  },

  handleTouchMove: function(e) {
    this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
    e.preventDefault();
  },

  handleTouchEnd: function(e) {
    this.scroller.doTouchEnd(e.timeStamp);
    e.preventDefault();
  },

  render: function() {
    var images = this.props.images.map(function(image, i) {
      if (this.state.left < (i - 1) * this.props.width || this.state.left > (i + 1) * this.props.width) {
        return null;
      }

      // Find the highest resolution image
      return (
        <ImageCardContainer
          left={this.state.left}
          key={i}
          index={i}
          url={image.source}
          width={this.props.width}
          height={this.props.height}
          caption={image.name || 'Amazing Justin Bieber photo #' + (i + 1)}
        />
      );
    }, this);

    return (
      <div
        className="Viewer"
        style={{width: this.props.width, height: this.props.height}}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}>
        {images}
      </div>
    );
  }
});

module.exports = Viewer;