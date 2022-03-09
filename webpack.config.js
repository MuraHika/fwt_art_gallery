const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require('dotenv').config({ path: `${__dirname  }/.env` });
const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';


module.exports = {
  entry: {
    app: "./src/index.tsx",
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  mode: "development",
  devServer: {
    historyApiFallback: true,
    hot: true,
    liveReload: false,
    open:true,
    port: 3001,
    proxy: {
      '/artists/': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  output: {
    filename: '[name].js',
    path: path.resolve( __dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html', // output file
      publicPath: '/',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
      'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
    }),   
  ],
};
