// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchResultTemplate from './index';

storiesOf('Templates/SearchResultTemplate', module)
  .add('Normal', () => (
    <SearchResultTemplate
      header={(
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'red',
          }}
        >
          header section
        </div>
      )}
      headline1="headline1 here"
      headline2="headline2 here"
      searchResult={(
        <div
          style={{
            width: '100%',
            height: '400px',
            background: 'yellow',
          }}
        >
          search result section
        </div>
      )}
      footer={(
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'blue',
          }}
        >
          footer section
        </div>
      )}
    />
  ));
