// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SalesList from './index';

SalesList.displayName = 'SalesList';

storiesOf('Organisms/SalesList', module).add(
  'Normal',
  withInfo(`
        ### コンポーネント概要
        売上リスト
      `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <SalesList confirmedSales="20,000" provisionalSales="40,000" />
    </div>
  )),
);
