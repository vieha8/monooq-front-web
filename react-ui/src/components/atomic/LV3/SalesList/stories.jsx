// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import SalesList from './index';

storiesOf('Organisms/SalesList', module).add('Normal', () => (
  <div>
    <SalesList confirmedSales="20,000" provisionalSales="40,000" />
  </div>
));
