const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "production",
  context: path.resolve(__dirname, "src"),
  entry: ["./kits.js", "./bass.js", "./drums.js", "./global.js"],
  output: { path: path.resolve(__dirname, "docs"), filename: "bundle.js" },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        use: ["file-loader"],
      },
      {
        test: /\.(mp3|wav)$/i,
        use: ["file-loader"],
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
