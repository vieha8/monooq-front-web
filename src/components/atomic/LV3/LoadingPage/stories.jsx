// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import LoadingPage from './index';

storiesOf('Organisms/LoadingPage', module).add('Normal', () => (
  <div>
    コンテンツ
    <LoadingPage />
  </div>
));
