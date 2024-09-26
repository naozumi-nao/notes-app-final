const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: "development",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    watchFiles: ["index.html", "src/**/*"],
    open: true,
    hot: true,
    compress: true,
  },
  plugins: [new BundleAnalyzerPlugin()],
});
