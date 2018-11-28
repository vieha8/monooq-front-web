// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ScheduleListItem from './index';

ScheduleListItem.displayName = 'ScheduleListItem';

storiesOf('Molecules(LV2)/ScheduleListItem', module)
  .addDecorator(StoryRouter())
  .add(
    'User',
    withInfo(`
      ### コンポーネント概要
      スケジュールリストアイテム(ユーザver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '680px', padding: `${Dimens.storyBookPadding}` }}>
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
    )),
  )
  .add(
    'Host',
    withInfo(`
      ### コンポーネント概要
      スケジュールリストアイテム(ホストver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '680px', padding: `${Dimens.storyBookPadding}` }}>
        <ScheduleListItem
          isHost
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
    )),
  );
