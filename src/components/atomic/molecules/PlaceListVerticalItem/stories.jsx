// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import PlaceListVerticalItem from './index';

storiesOf('Molecules/PlaceListVerticalItem', module)
  .add('Normal', () => (
    <div style={{ width: '237px' }}>
      <PlaceListVerticalItem
        image={{
          src: 'http://placehold.jp/500x500.png',
          alt: 'name',
        }}
        address="六本木"
        content="東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！"
        homeAppliances
        prices={[20000, 10000, 5000]}
        onClick={() => console.log('onClick')}
      />
    </div>
  ));
