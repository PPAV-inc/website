const { IgnorePlugin } = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  webpack: config => {
    config.plugins.push(new IgnorePlugin(/__tests__\/.*/));

    if (isProduction) {
      config.plugins = config.plugins.filter(
        plugin => plugin.constructor.name !== 'UglifyJsPlugin'
      );
      config.plugins.push(
        new UglifyJSPlugin({
          parallel: true,
        })
      );
    }

    return config;
  },
};
