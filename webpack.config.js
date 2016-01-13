const path = require("path");
const HtmlwebpackPlugin = require("html-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, "app"),
  build: path.join(__dirname, "build")
};

module.exports = {
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
