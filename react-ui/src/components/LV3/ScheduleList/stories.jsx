// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ScheduleList from './index';

ScheduleList.displayName = 'ScheduleList';

const getData = isHost => {
  const data = [];
  for (let i = 0; i < 3; i += 1) {
    data.push({
      schedule: {
        isHost,
        user: {
          ID: isHost ? 'モノオク太郎(ホスト)' : 'モノオク太郎(ゲスト)',
          Name: isHost ? 'モノオク太郎(ホスト)' : 'モノオク太郎(ゲスト)',
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
      },
      sales: '10,000',
    });
  }
  return data;
};

storiesOf('Organisms(LV3)/ScheduleList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Host',
    withInfo(`
        ### コンポーネント概要
        スケジュールリスト(ホスト)
      `)(() => (
      <div style={{ width: '100%', maxWidth: '680px', padding: `${Dimens.storyBookPadding}` }}>
        <ScheduleList schedules={getData(true)} />
      </div>
    )),
  )
  .add(
    'Guest',
    withInfo(`
        ### コンポーネント概要
        スケジュールリスト(ゲスト)
      `)(() => (
      <div style={{ width: '100%', maxWidth: '680px', padding: `${Dimens.storyBookPadding}` }}>
        <ScheduleList schedules={getData(false)} />
      </div>
    )),
  );
