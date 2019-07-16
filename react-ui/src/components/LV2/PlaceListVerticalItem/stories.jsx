// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import PlaceListVerticalItem from './index';

PlaceListVerticalItem.displayName = 'PlaceListVerticalItem';

storiesOf('Molecules(LV2)/PlaceListVerticalItem', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'IsFurniture',
    withInfo(`
      ### コンポーネント概要
      スペースリストアイテム(Vertical)(NotFurnitureVer)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <PlaceListVerticalItem
          image={{
            src: 'http://placehold.jp/500x500.png',
            alt: 'name',
          }}
          address="六本木"
          content="東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！"
          furniture
          prices={[20000, 10000, 5000]}
          onClick={() => console.log('onClick')}
        />
      </div>
    )),
  )
  .add(
    'NotFurniture',
    withInfo(`
      ### コンポーネント概要
      スペースリストアイテム(Vertical)(NotFurnitureVer)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <PlaceListVerticalItem
          image={{
            src: 'http://placehold.jp/500x500.png',
            alt: 'name',
          }}
          address="六本木"
          content="東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！"
          prices={[20000, 10000, 5000]}
          onClick={() => console.log('onClick')}
        />
      </div>
    )),
  );
