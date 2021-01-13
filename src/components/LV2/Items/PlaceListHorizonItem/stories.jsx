import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import PlaceListHorizonItem from './index';

PlaceListHorizonItem.displayName = 'PlaceListHorizonItem';

storiesOf('Molecules(LV2)/Items/PlaceListHorizonItem', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      スペースリストアイテム(Horizon)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <PlaceListHorizonItem
          user={{
            ID: 1,
            Name: 'モノオク太郎',
            ImageUrl: 'http://placehold.jp/500x500.png',
          }}
          image={{
            src: 'http://placehold.jp/500x500.png',
            alt: 'name',
          }}
          address="東京都港区六本木"
          content="東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！"
          onClick={() => console.log('onClick')}
        />
      </div>
    )),
  );
