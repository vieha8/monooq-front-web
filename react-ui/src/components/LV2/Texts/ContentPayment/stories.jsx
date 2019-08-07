// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ContentPayment from './index';

ContentPayment.displayName = 'ContentPayment';

storiesOf('Molecules(LV2)/Texts/ContentPayment', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      お支払い情報
    `)(() => (
    <div style={{ width: '100%', maxWidth: '380px', padding: `${Dimens.storyBookPadding}` }}>
      <ContentPayment
        beginAt="2018年03月20日"
        endAt="2018年05月20日"
        duration={60}
        price="32,000"
      />
    </div>
  )),
);
