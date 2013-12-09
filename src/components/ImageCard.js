/** @jsx React.DOM */

var React = require('react');

var STYLE_LOADING = {
  color: 'gray',
  fontFamily: 'sans-serif',
  fontSize: '12px',
  left: 0,
  marginTop: -6,
  position: 'absolute',
  right: 0,
  textAlign: 'center',
  top: '50%',
};

var STYLE_CAPTION = {
  background: 'rgba(16, 16, 16, 0.5)',
  bottom: 0,
  color: 'white',
  fontFamily: 'sans-serif',
  fontSize: '16px',
  lineHeight: '48px',
  left: 0,
  position: 'absolute',
  right: 0,
  textAlign: 'center'
};

var ImageCard = React.createClass({
  render: function() {
    var imgStyle = {
      backgroundImage: 'url(' + this.props.url + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: this.props.height,
      left: 0,
      position: 'absolute',
      top: 0,
      width: this.props.width
    };

    var outerStyle = {
      height: this.props.height,
      position: 'relative',
      width: this.props.width
    };

    // The loading text is composited behind the image so it's hidden
    // when the image is loaded. Normally you'd use Image.onload, but
    // that only tells you when the bytes are ready, not when the paint
    // is done.

    return (
      <div style={outerStyle}>
        <div style={STYLE_LOADING}>Loading...</div>
        <div style={imgStyle}>
          <span style={STYLE_CAPTION}>{this.props.caption}</span>
        </div>
      </div>
    );
  }
});

module.exports = ImageCard;