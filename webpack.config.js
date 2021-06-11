const path = require('path');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const isLocal = slsw.lib.webpack.isLocal;

module.exports = {
  entry: slsw.lib.entries,
  externals: [nodeExternals()],
  devtool: 'source-map',
  mode: isLocal ? 'development' : 'production',
  target: 'node',
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|ts)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.json'],
    plugins: [
      new TsconfigPathsPlugin({ configFile: './tsconfig.json' }),
    ]
  },
};
