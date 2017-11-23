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
         title: 'Open API Editor',
         template: './src/template/index.ejs'
       })
     ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
};
