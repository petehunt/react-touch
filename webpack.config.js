module.exports = {
  module: {
    loaders: [
      { test: /\.css/, loader: "style-loader!css-loader" },
      { test: /\.gif/, loader: "url-loader?limit=10000&minetype=image/gif" },
      { test: /\.js$/, loader: "jsx-loader" }
    ],
    noParse: /parse-latest.js/
  }
};