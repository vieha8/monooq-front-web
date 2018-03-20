// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import PlaceListHorizonItem from './index';

storiesOf('Molecules/PlaceListHorizonItem', module)
  .add('Normal', () => (
    <div>
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
  ));
