// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import { SearchIcon, MessageIcon } from './index';

storiesOf('Atoms/Util/ActionIcon', module)
  .add('SearchIcon', () => (
    <div>
      <SearchIcon />
    </div>
  ))
  .add('MessageIcon', () => (
    <div>
      <MessageIcon />
    </div>
  ));
