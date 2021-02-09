process.env.VUE_APP_TITLE = require('./package.json').title;
process.env.VUE_APP_VERSION = require('./package.json').version;
const manifestJSON = require('./public/manifest.json');

module.exports = {
  // The base URL your application bundle will be deployed.
  publicPath: '/',
  // Setting this to false can speed up production builds if you don't need source maps for production.
  productionSourceMap: false,
  // By default, generated static assets contains hashes in their filenames for better caching control.
  filenameHashing: false,
  // PWA
  pwa: {
    name: manifestJSON.name,
    themeColor: manifestJSON.theme_color,
    msTileColor: manifestJSON.background_color,
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    assetsVersion: process.env.VUE_APP_VERSION,
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      msTileImage: 'img/icons/mstile-150x150.png',
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'service-worker.js',
    },
  },
};
