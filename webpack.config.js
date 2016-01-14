const path = require("path");
const HtmlwebpackPlugin = require("html-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
const merge = require("webpack-merge");
const webpack = require("webpack");

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, "app"),
  build: path.join(__dirname, "build")
};

const common = {
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: "bundle.js"
  },
  plugins:[
    new HtmlwebpackPlugin({
      title:"Ker Emeraude"
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ]
};

//Default configuration
if(TARGET === "start" || !TARGET){
  module.exports = merge(common, {
    devServer:{
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      //Display only erros to reduce the amount of output
      stats: "errors-only",

      //Parse host and port from env so this is easy to customize.
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins:[
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if(TARGET === "build"){
  module.exports = merge(common, {});
}
