const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withPlugins([withCSS, withImages]);
