// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import AccountTemplate from './index';

AccountTemplate.displayName = 'AccountTemplate';

storiesOf('Templates/AccountPageTemplate', module).add(
  'Normal',
  withInfo(`
        ### コンポーネント概要
        ページテンプレート(アカウント)
      `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <AccountTemplate
        header={
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'red',
            }}
          >
            header section
          </div>
        }
        form={
          <div
            style={{
              width: '100%',
              height: '400px',
              background: 'white',
            }}
          >
            form section
          </div>
        }
        stories
      />
    </div>
  )),
);
