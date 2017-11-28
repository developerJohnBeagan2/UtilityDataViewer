/*
    Can have one out put per config file.
    But can set up multiple config sections,
    that extends a common section,
    then export them as an array.
*/

import webpack from 'webpack';
import path from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';

//const appName = 'mvccore';
const outputFolder = path.join(__dirname, '/dist');
/*
    When using import toastr, webpack automatically pulls in js from node.
    Same w/ bootstrap, though not importing it yet.
      toast: '../node_modules/toastr/build/toastr.min.js',
      bs: '../node_modules/bootstrap/dist/js/bootstrap.min.js'
*/
// weppack w/o -p so can see dev contents, w/ -p for prod
export default {
  // so don't have to type root path rr in front of entry paths
  context: path.resolve('src'),
  // main for js scripts for end of body; fonts for font awesome js which needs to be in header
  //    each key will be file name; see output
  // through an array c/load multiple files into each an entry point
  entry: {
    main: './js/index.js',
    fonts: './fonts/fa_everything.min.js'
  },
  // ? not sure of its significance
  target: 'web',

  module: {
    rules: [

      {
        test: /\.js?$/,
        exclude: [/node_modules/, /fonts/],
        loader: 'babel-loader',
      },

      {
        test: /\.css$|\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [require('precss'), require('autoprefixer')],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
          ],
        }),
      },
    ],
  },
  output: {
    path: outputFolder,
    filename: '[name].js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    new ExtractTextPlugin({
      filename: '../dist/bundle.css',
      allChunks: true,
    }),
  ],
};
