const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {                
    app: ['./src/App.jsx'],                
  },    
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  }, 
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
    },
  },
  devtool: 'source-map'              
};