import { configure } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';

import '../src/index.css';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context('../src/', true, /stories\.jsx?$/));
}

configure(loadStories, module);

// addon-info
setDefaults({
  inline: true,
});
