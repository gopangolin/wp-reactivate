const path = require('path');

const webpackConfig = {
  devtool: 'source-map',

  entry: {
    'js/admin': path.resolve(__dirname, 'app/admin.jsx'),
    'js/frontend': path.resolve(__dirname, 'app/frontend.jsx'),
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'assets'),
  },

  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};

if (process.env.NODE_ENV === 'production') {
  webpackConfig.devtool = 'cheap-source-map';
}

module.exports = webpackConfig;
