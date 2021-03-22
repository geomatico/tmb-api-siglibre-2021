const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const path = require('path');

module.exports = (env) => ({
  mode: env.prod ? 'production' : 'development',
  devtool: env.prod ? 'source-map' : 'inline-source-map',
  devServer: {
    open: true,
  },
  entry: env.test ? '' : {
    transit: './src/transit.js',
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      '@material-ui/core': path.resolve('./node_modules/@material-ui/core'),
      '@material-ui/icons': path.resolve('./node_modules/@material-ui/icons'),
      '@material-ui/lab': path.resolve('./node_modules/@material-ui/lab'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(svg|xml)$/i,
        use: 'raw-loader',
      },
      {
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
      },
    ],
  },
  plugins: env.test ? [] : [
    new HtmlWebPackPlugin({
      template: './src/template.html',
      filename: './transit.html',
      chunks: ['transit'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'static',
        },
      ],
    }),
    new DotenvWebpackPlugin({
      safe: true
    })
  ],
});
