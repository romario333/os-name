const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: [nodeExternals({
    allowlist: [
        // matching packages will be included in the bundle
        "macos-release",
        "windows-release"
    ]
  })],
  optimization: {
    minimize: false
  }
};