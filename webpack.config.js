module.exports = {
  module: {
    loaders: [
      { test: /\.css/, loader: "style-loader!css-loader" },
      { test: /\.gif/, loader: "url-loader?limit=10000&mimetype=image/gif" },
      { test: /\.jpg/, loader: "url-loader?limit=10000&mimetype=image/jpg" },
      { test: /\.png/, loader: "url-loader?limit=10000&mimetype=image/png" },
      { test: /\.js$/, loader: "jsx-loader" }
    ],
    noParse: /parse-latest.js/
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
};
