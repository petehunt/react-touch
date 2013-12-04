var TRANSFORM_KEY = typeof document.body.style.MozTransform !== 'undefined' ? 'MozTransform' : 'WebkitTransform';
var FILTER_KEY = typeof document.body.style.MozFilter !== 'undefined' ? 'MozFilter' : 'WebkitFilter';

module.exports = {
  TRANSFORM: TRANSFORM_KEY,
  FILTER: FILTER_KEY
};