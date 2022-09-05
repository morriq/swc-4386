const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { readFileSync } = require('fs');

const swcConfiguration = JSON.parse(readFileSync('.swcrc', 'utf-8'));

module.exports = (_, { mode }) => {
  return {
    mode,
    output: {
      filename: '[name].[contenthash].bundle.js',
      library: 'application',
      publicPath: 'auto',
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'swc-loader',
              options: swcConfiguration,
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: mode === 'production',
      minimizer: [
        new TerserPlugin({
          minify: TerserPlugin.swcMinify,
          terserOptions: {
            compress: {
              arrows: false,
              conditionals: false,
              evaluate: false,
            },
            mangle: {
              topLevel: false,
            },
          },
        }),
      ],
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: './src/index.ejs',
      }),
    ],
  };
};
