const rewireMobX = require('react-app-rewire-mobx');
const rewirePreact = require('react-app-rewire-preact');
const { injectBabelPlugin } = require('react-app-rewired');

/* config-overrides.js */
module.exports = function override(config, env) {
  // add a plugin
  config = injectBabelPlugin('babel-plugin-styled-components', config);

  // use the Preact rewire
  if (env === 'production') {
    console.log('⚡ Production build with Preact');
    config = rewirePreact(config, env);
  }

  // use the MobX rewire
  config = rewireMobX(config, env);

  return config;
};
