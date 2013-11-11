/** @jsx React.DOM */

var React = require('React');

var STYLE_LOADING = {
  color: 'gray',
  fontFamily: 'sans-serif',
  fontSize: '12px',
  left: 0,
  marginTop: '-6px',
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
  shouldComponentUpdate: function() {
    return false;
  },

  render: function() {
    var imgStyle = {
      backgroundImage: 'url(' + this.props.url + ')',
      backgroundSize: '100% auto',
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