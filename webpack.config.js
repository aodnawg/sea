const path = require("path");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js", ".glsl"],
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.glsl?$/, loader: "raw-loader" },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
};
