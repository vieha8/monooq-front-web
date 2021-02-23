const withFonts = require('next-fonts');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const withPlugins = require('next-compose-plugins');

const withImages = require('next-images');
const nextConfig = {
	webpack(config) {
	   config.module.rules.push({
        test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            publicPath: '/_next/static/',
            outputPath: 'static/',
            name: '[name].[ext]',
          },
        },
		});
		config.resolve.alias['../../theme.config$'] = path.join(config.context, '/semantic-ui/theme.config');
    config.plugins.push(
				new OptimizeCssAssetsPlugin({
					assetNameRegExp: /\.css$/g,
					cssProcessor: CleanCss,
					cssProcessorOptions: {
						sourceMap: true,
					},
					canPrint: true,
				})
			);
		return config;
	},
};
module.exports = withPlugins([
  withFonts(
    withImages(
      withBundleAnalyzer({
        async rewrites() {
          return [
            {
              source: '/search/:path*',
              destination: '/spaces',
            },
            {
              source: '/spaces/pref:prefecture',
              destination: '/spaces?pref=:prefecture',
            },
            {
              source: '/spaces/pref:prefecture/city:cityCode',
              destination: '/spaces?pref=:prefecture&city=:cityCode',
            },
            {
              source: '/spaces/pref:prefecture/city:cityCode/town:townCode',
              destination: '/spaces?pref=:prefecture&city=:cityCode&town=:townCode',
            },
            {
              source: '/lp1_2/guest',
              destination: '/lp1/guest',
            },
            {
              source: '/lp1_3/guest',
              destination: '/lp1/guest',
            },
            {
              source: '/lp2/guest',
              destination: '/lp1/guest',
            },
            {
              source: '/lp2_2/guest',
              destination: '/lp1/guest',
            },
            {
              source: '/lp2_3/guest',
              destination: '/lp1/guest',
            },
            {
              source: '/lp3/guest',
              destination: '/lp1/guest',
            },
            {
              source: '/lp3_3/guest',
              destination: '/lp1/guest',
            },
          ];
        },
      }),
    )
  )
],
nextConfig
)
