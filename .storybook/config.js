import { configure } from '@storybook/react';

import '../src/index.css';

require('../src/config/fontawesome-all.min.js');

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context('../src/', true, /stories\.jsx?$/));
}

configure(loadStories, module);
