// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import SearchNotFound from './index';

storiesOf('Organisms/SearchNotFound', module)
  .addDecorator(StoryRouter())
  .add('Normal', () => (
    <div style={{ width: '100%', maxWidth: '1200px' }}>
      <SearchNotFound
        locationText="東京"
        onChangeLocation={() => console.log('onChangeLocation')}
        onClickSearchButton={() => console.log('onClickSearchButton')}
        onKeyDownSearchField={() => console.log('onKeyDownSearchField')}
      />
    </div>
  ))
  .add('Disabled', () => (
    <div style={{ width: '100%', maxWidth: '12000px' }}>
      <SearchNotFound
        locationText=""
        onChangeLocation={() => console.log('onChangeLocation')}
        onClickSearchButton={() => console.log('onClickSearchButton')}
        onKeyDownSearchField={() => console.log('onKeyDownSearchField')}
      />
    </div>
  ));
