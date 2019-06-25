const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const withTypeScript = require("@zeit/next-typescript");

module.exports = withPlugins([withCSS, withImages, withTypeScript]);
