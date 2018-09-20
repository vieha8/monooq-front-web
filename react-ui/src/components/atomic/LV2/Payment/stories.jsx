// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Payment from './index';

storiesOf('Molecules/Payment', module).add('Normal', () => (
  <div style={{ width: '100%', maxWidth: '300px' }}>
    <Payment beginAt="2018年03月20日" endAt="2018年05月20日" duration={60} price="32,000" />
  </div>
));
