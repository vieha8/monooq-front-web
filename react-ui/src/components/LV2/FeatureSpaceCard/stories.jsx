// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import FeatureSpaceCard from './index';

FeatureSpaceCard.displayName = 'FeatureSpaceCard';

storiesOf('Molecules(LV2)/FeatureSpaceCard', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      ユーザスペースカード
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <FeatureSpaceCard
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
