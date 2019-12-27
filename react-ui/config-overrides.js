const PrerenderSPAPlugin = require('prerender-spa-plugin');
const path = require('path');

module.exports = (config, env) => {
  if (env === 'production') {
    config.plugins = config.plugins.concat([
      new PrerenderSPAPlugin({
        routes: ['/', '/about', '/lp1/guest'],
        staticDir: path.join(__dirname, 'build'),
      }),
    ]);
  }

  return config;
};
