// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import SearchInput from './index';

storiesOf('Molecules/SearchInput', module)
  .addDecorator(StoryRouter())
  .add('Normal', () => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <SearchInput
        onRef={() => { }}
        onClickSearchButton={() => console.log('onClickSearchButton')}
      />
    </div>
  ))
  .add('Disabled', () => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <SearchInput
        onRef={() => { }}
        searchDisabled
      />
    </div>
  ));
