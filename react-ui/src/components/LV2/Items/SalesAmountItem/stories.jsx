// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SalesAmountItem from './index';

SalesAmountItem.displayName = 'SalesAmountItem';

storiesOf('Molecules(LV2)/Items/SalesAmountItem', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    売上金額
  `)(() => (
    <div style={{ width: '100%', maxWidth: '800px', padding: `${Dimens.storyBookPadding}` }}>
      <SalesAmountItem amount={123456789} />
    </div>
  )),
);
