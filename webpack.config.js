const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },
  // Configuration for dev server
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    port: 3000,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      { test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'file-loader' },
      { test: /\.(otf|eot|ttf)$/, loader: "file-loader" },
      { test: /\.svg$/, loader: "file-loader" }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: 'body'
    })
  ]
};