// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import PlanListItem from './index';

storiesOf('Molecules/PlanListItem', module)
  .add('Normal', () => (
    <div>
      <PlanListItem
        image={{
          src: 'http://placehold.jp/500x500.png',
          alt: 'name',
        }}
        address="六本木"
        content="東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！"
      />
    </div>
  ));
