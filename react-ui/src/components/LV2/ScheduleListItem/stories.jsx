// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ScheduleListItem from './index';

ScheduleListItem.displayName = 'ScheduleListItem';

storiesOf('Molecules(LV2)/ScheduleListItem', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Guest',
    withInfo(`
      ### コンポーネント概要
      スケジュールリストアイテム(ゲストver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '680px', padding: `${Dimens.storyBookPadding}` }}>
        <ScheduleListItem
          schedule={{
            isHost: false,
            user: {
              ID: 'モノオク太郎(ゲスト)',
              Name: 'モノオク太郎(ゲスト)',
              ImageUrl: 'http://placehold.jp/500x500.png',
            },
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
            isHost: true,
            user: {
              ID: 'モノオク太郎(ホスト)',
              Name: 'モノオク太郎(ホスト)',
              ImageUrl: 'http://placehold.jp/500x500.png',
            },
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
