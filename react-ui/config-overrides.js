const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');

module.exports = (config, env) => {
  if (env === 'production') {
    config.plugins = config.plugins.concat([
      new PrerenderSPAPlugin({
        routes: ['/', '/about', '/lp1/guest'],
        staticDir: path.join(__dirname, 'build'),
        renderer: new Renderer({
          '--no-sandbox': 1,
        }),
      }),
    ]);
  }

  return config;
};
