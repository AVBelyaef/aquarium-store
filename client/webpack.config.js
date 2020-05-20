const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => {
  const { mode = 'development' } = env;

  const isProd = mode === 'production';
  const isDev = mode === 'development';

  const getStyleLoaders = () => [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader',
  ];

  const jsLoaders = () => {
    const loaders = ['babel-loader'];
    if (isDev) {
      loaders.push('eslint-loader');
    }
    return loaders;
  };

  const fileName = (ext) => (isProd ? `bundle.[hash].${ext}` : `bundle.${ext}`);

  return {
    context: path.resolve(__dirname, 'src'),
    mode: isProd ? 'production' : isDev && 'development',
    entry: './index.js',
    output: {
      filename: fileName('js'),
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    devServer: {
      open: true,
      hot: true,
      port: 3000,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/favicon.ico'),
            to: path.resolve(__dirname, 'dist'),
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: fileName('css'),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modues/,
          use: jsLoaders(),
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // isDev = 'style-loader', 'css-loader'
            ...getStyleLoaders(),
            'sass-loader',
          ],
        },
      ],
    },
  };
};
