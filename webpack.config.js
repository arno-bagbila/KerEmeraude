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
  //Add resolve.extension. '' is needed to allow imports
  //without an extension. Note the .'s before extensions!!!
  //The matching will faile without!
  resolve:{
    extensions: ["", ".js", ".jsx"]
  },
  output: {
    path: PATHS.build,
    filename: "bundle.js"
  },
  module:{
    loaders: [
      {
        // Test expects a RegExp! Note the slashes!
        test:/\.css$/,
        loaders: ["style", "css"],
        include: PATHS.app
      },
      //Set up jsx. This accepts js too thanks to RexExp
      {
        test:/\.jsx?$/,
        //Enable caching for improved performance during dvelopment
        //It uses default OS directory by default. If you need something
        //more custom, pass a path to it. I.e, babel?cacheDirectory=<path>
        loaders:["babel?cacheDirectory"],
        include:PATHS.app
      }
    ]
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
    devtool: "eval-source-map",
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
