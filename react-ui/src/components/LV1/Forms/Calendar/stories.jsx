// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';
import moment from 'moment';

import Calendar from './index';

Calendar.displayName = 'Calendar';

storiesOf('Atoms(LV1)/Forms/Calendar', module)
  .add(
    'NonInput',
    withInfo(`
      ### コンポーネント概要
      カレンダー(フォーカスしてないver)
    `)(() => (
      <div style={{ width: '380px', padding: `${Dimens.storyBookPadding}` }}>
        <Calendar
          date={null}
          block
          onDateChange={date => console.log(date)}
          onFocusChange={e => console.log(e)}
        />
      </div>
    )),
  )
  .add(
    'Focus',
    withInfo(`
      ### コンポーネント概要
      カレンダー(フォーカスしてないver)
    `)(() => (
      <div
        style={{
          width: '380px',
          margin: 'auto auto 330px 0px',
          padding: `${Dimens.storyBookPadding}`,
        }}
      >
        <Calendar
          date={moment()}
          focused
          block
          onDateChange={date => console.log(date)}
          onFocusChange={e => console.log(e)}
        />
      </div>
    )),
  );
