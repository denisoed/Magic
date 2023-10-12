const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mp3$/,
          loader: "file-loader",
          exclude: /node_modules(?!\/foundation-sites)/,
          options: {
            name: "[path][name].[ext]",
          },
        },
      ],
    },
  },
});
