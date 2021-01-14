const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  rewrites() {
    return [
      {
        source: '/spaces/pref:prefecture',
        destination: '/spaces/pref/:prefecture',
      },
      {
        source: '/spaces/pref:prefecture/city:cityCode',
        destination: '/spaces/pref/:prefecture/city/:cityCode',
      },
      {
        source: '/spaces/pref:prefecture/city:cityCode/town:townCode',
        destination: '/spaces/pref/:prefecture/city/:cityCode/town/:townCode',
      },
    ];
  },
});
