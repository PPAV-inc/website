const { IgnorePlugin, DefinePlugin } = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  webpack: config => {
    config.plugins.push(new IgnorePlugin(/__tests__\/.*/));

    config.plugins.push(
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.LNG': JSON.stringify(process.env.LNG),
      })
    );

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
