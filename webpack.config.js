module.exports = {
  module: {
    loaders: [
      { test: /\.css/, loader: "style-loader!css-loader" },
    ],
    postLoaders: [
      { test: /\.js$/, loader: "jsx-loader" }
    ]
  }
};