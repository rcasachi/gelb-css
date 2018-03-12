const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanCSSPlugin = require("less-plugin-clean-css");

const extractLess = new ExtractTextPlugin({
    filename: "css/gelb.css",
    // disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: './src/main',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/gelb.js',
    sourceMapFilename: 'js/gelb.map'
  },
  module: {
    rules: [
      {
				test: /\.css$/,
				use: extractLess.extract({
					fallback: "style-loader",
					use: ["css-loader", "postcss-loader"]
				})
			},
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                alias: {
                  '../../fonts': '../fonts'
                }
              }
            },
            {
              loader: "less-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader"
            }
          ],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    extractLess
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'src')
  }
}
