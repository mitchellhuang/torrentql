const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const baseConfig = {
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    return config;
  },
  target: 'serverless',
};

module.exports = withPlugins([withImages], baseConfig);
