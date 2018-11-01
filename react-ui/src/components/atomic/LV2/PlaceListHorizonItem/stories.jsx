// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import PlaceListHorizonItem from './index';

PlaceListHorizonItem.displayName = 'PlaceListHorizonItem';

storiesOf('Molecules/PlaceListHorizonItem', module)
  .addDecorator(StorybookRouter())
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      スペースリストアイテム(Horizon)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <PlaceListHorizonItem
          image={{
            src: 'http://placehold.jp/500x500.png',
            alt: 'name',
          }}
          address="六本木"
          content="東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！"
          onClick={() => console.log('onClick')}
        />
      </div>
    )),
  );
