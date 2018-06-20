const path = require('path');
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

const webpackConfig = {
  devtool: 'source-map',

  entry: {
    'js/admin': path.resolve(__dirname, 'app/admin.js'),
    'js/shortcode': path.resolve(__dirname, 'app/shortcode.js'),
    'js/widget': path.resolve(__dirname, 'app/widget.js'),
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
  plugins: [
    new BrowserSyncPlugin(
      {
        // Inset local WordPress proxy here
        proxy: "<SERVER:PORT>"
      }
    )
  ]
};

if (process.env.NODE_ENV === 'production') {
  webpackConfig.devtool = 'cheap-source-map';
}

module.exports = webpackConfig;
