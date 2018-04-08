// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import ManageSpaceListItem from './index';

storiesOf('Molecules/ManageSpaceListItem', module)
  .add('Normal', () => (
    <ManageSpaceListItem
      image={{
        src: 'http://placehold.jp/500x500.png',
        alt: 'name',
      }}
      address="六本木"
      content="東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！"
      furniture
      prices={[20000, 10000, 5000]}
      onClickSpace={() => console.log('onClickSpace')}
    />
  ));
