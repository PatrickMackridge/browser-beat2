const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/script.js",
  // [
  //   "./src/bass.js",
  //   "./src/drums.js",
  //   "./src/global.js",
  //    "./src/Tone.js",
  // ],
  context: path.resolve(__dirname, "./"),
  output: { path: path.resolve(__dirname, "dist"), filename: "bundle.js" },
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
