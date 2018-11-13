// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import PaymentTemplate from './index';

PaymentTemplate.displayName = 'PaymentTemplate';

storiesOf('Templates/PaymentTemplate', module).add(
  'Normal',
  withInfo(`
        ### コンポーネント概要
        ページテンプレート(決済)
      `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <PaymentTemplate
        header={
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'pink',
            }}
          >
            header section
          </div>
        }
        left={
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'red',
            }}
          >
            left section
          </div>
        }
        right={
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'blue',
            }}
          >
            right section
          </div>
        }
      />
    </div>
  )),
);
