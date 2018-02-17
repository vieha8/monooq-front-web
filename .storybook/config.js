import { configure } from '@storybook/react';

import '../public/css/reset.css';
import '../public/css/main.css';

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
