// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import UserSpaceImage from './index';

UserSpaceImage.displayName = 'UserSpaceImage';

storiesOf('Molecules(LV2)/UserSpaceImage', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      ユーザスペースカード
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <UserSpaceImage
          link="#"
          user={{
            image: 'http://placehold.jp/500x500.png',
            name: 'hogehoge',
          }}
          space={{
            image: 'http://placehold.jp/500x500.png',
            price: '3,000',
            area: '東京都渋谷区',
            description: '素敵なスペース',
            color: '#FF0000',
          }}
        />
      </div>
    )),
  );
