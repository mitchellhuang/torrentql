const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

const nextConfig = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    });
    return config;
  },
};

module.exports = withPlugins([withCSS, withImages], nextConfig);
