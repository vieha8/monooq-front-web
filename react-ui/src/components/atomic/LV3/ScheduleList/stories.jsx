// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ScheduleList from './index';

ScheduleList.displayName = 'ScheduleList';

function getData() {
  const data = [];
  for (let i = 0; i < 5; i += 1) {
    data.push({
      schedule: {
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
      },
      sales: '10,000',
    });
  }
  return data;
}

storiesOf('Organisms/ScheduleList', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        スケジュールリスト
      `)(() => (
      <div style={{ width: '100%', maxWidth: '680px', padding: `${Dimens.storyBookPadding}` }}>
        <ScheduleList schedules={getData()} />
      </div>
    )),
  );
