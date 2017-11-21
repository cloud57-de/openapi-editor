const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  devtool: 'inline-source-map',
  devServer: {
     contentBase: './public'
  },
  plugins: [
       new HtmlWebpackPlugin({
         title: 'Load Google API',
       })
     ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'public')
  }
};
