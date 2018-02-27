import { configure } from '@storybook/react';

import 'index.css';

function loadStories() {
  require('stories');
}

configure(loadStories, module);
