// In the future if we use server rendering we'll need to defer this to the
// function call or something since it references window.

var IS_IPHONE_5 = Math.max(
  window.screen.height,
  window.screen.width
) * window.devicePixelRatio === 1136 &&
  window.navigator.userAgent.indexOf('iPhone OS 7') > -1;

function isIPhone5() {
  return IS_IPHONE_5;
}

module.exports = isIPhone5;