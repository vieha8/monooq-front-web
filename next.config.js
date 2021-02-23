const withFonts = require('next-fonts');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withCSS = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const withImages = require('next-images');
module.exports = withPlugins([
  withCSS({ 
    webpack: ( config ) => {
      config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
      return config
    }
  }),
  withFonts
])
// module.exports = withFonts(
//   withImages(
//     withBundleAnalyzer({
//       async rewrites() {
//         return [
//           {
//             source: '/search/:path*',
//             destination: '/spaces',
//           },
//           {
//             source: '/spaces/pref:prefecture',
//             destination: '/spaces?pref=:prefecture',
//           },
//           {
//             source: '/spaces/pref:prefecture/city:cityCode',
//             destination: '/spaces?pref=:prefecture&city=:cityCode',
//           },
//           {
//             source: '/spaces/pref:prefecture/city:cityCode/town:townCode',
//             destination: '/spaces?pref=:prefecture&city=:cityCode&town=:townCode',
//           },
//           {
//             source: '/lp1_2/guest',
//             destination: '/lp1/guest',
//           },
//           {
//             source: '/lp1_3/guest',
//             destination: '/lp1/guest',
//           },
//           {
//             source: '/lp2/guest',
//             destination: '/lp1/guest',
//           },
//           {
//             source: '/lp2_2/guest',
//             destination: '/lp1/guest',
//           },
//           {
//             source: '/lp2_3/guest',
//             destination: '/lp1/guest',
//           },
//           {
//             source: '/lp3/guest',
//             destination: '/lp1/guest',
//           },
//           {
//             source: '/lp3_3/guest',
//             destination: '/lp1/guest',
//           },
//         ];
//       },
//     }),
//   )
// )
