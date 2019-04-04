// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SpaceTemplate from './index';

SpaceTemplate.displayName = 'SpaceTemplate';

storiesOf('Templates/Space', module).add(
  'Normal',
  withInfo(`
        ### コンポーネント概要
        ページテンプレート(スペース)
      `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <SpaceTemplate
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
        map={
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'yellow',
            }}
          >
            map section
          </div>
        }
        detail={
          <div
            style={{
              width: '100%',
              height: '500px',
              background: 'green',
            }}
          >
            detail section
          </div>
        }
        price={
          <div
            style={{
              width: '100%',
              height: '300px',
              background: 'gray',
            }}
          >
            price section
          </div>
        }
        message={
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'orange',
            }}
          >
            message section
          </div>
        }
        footer={
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'blue',
            }}
          >
            footer section
          </div>
        }
      />
    </div>
  )),
);
