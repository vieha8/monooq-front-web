const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  rewrites() {
    return [
      {
        source: '/spaces/pref:prefecture',
        destination: '/spaces/pref/:prefecture' 
      }
    ]
  }
})