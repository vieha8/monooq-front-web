// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ProfileTemplate from './index';

ProfileTemplate.displayName = 'ProfileTemplate';

storiesOf('Templates/ProfileTemplate', module).add(
  'Normal',
  withInfo(`
        ### コンポーネント概要
        ページテンプレート(プロフィール)
      `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <ProfileTemplate
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
        profile={
          <div
            style={{
              width: '100%',
              height: '400px',
              background: 'yellow',
            }}
          >
            profile section
          </div>
        }
      />
    </div>
  )),
);
