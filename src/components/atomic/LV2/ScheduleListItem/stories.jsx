// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import ScheduleListItem from './index';

storiesOf('Molecules/ScheduleListItem', module)
  .addDecorator(StoryRouter())
  .add('User', () => (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <ScheduleListItem
        schedule={{
          opponentName: 'モノオク太郎',
          space: {
            image: {
              src: 'http://placehold.jp/500x500.png',
              alt: 'name',
            },
            address: '六本木',
            content:
              '東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！',
            onClick: () => console.log('onClick'),
          },
          startDate: '2018/04/01',
          endDate: '2018/04/08',
        }}
        sales="10,000"
      />
    </div>
  ))
  .add('Host', () => (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <ScheduleListItem
        hostIsMySelf
        schedule={{
          opponentName: 'モノオク太郎',
          space: {
            image: {
              src: 'http://placehold.jp/500x500.png',
              alt: 'name',
            },
            address: '六本木',
            content:
              '東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！',
            onClick: () => console.log('onClick'),
          },
          startDate: '2018/04/01',
          endDate: '2018/04/08',
        }}
        sales="10,000"
      />
    </div>
  ));
