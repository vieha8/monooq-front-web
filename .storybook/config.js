import { configure } from '@storybook/react';

import '../public/css/reset.css';

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
