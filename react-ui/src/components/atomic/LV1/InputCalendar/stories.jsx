// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import moment from 'moment';

import InputCalendar from './index';

InputCalendar.displayName = 'InputCalendar';

storiesOf('Atoms/Forms/InputCalendar', module)
  .add(
    'NonInput',
    withInfo(`
      ### コンポーネント概要
      カレンダー(フォーカスしてないver)
    `)(() => (
      <div style={{ width: '300px' }}>
        <InputCalendar
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
      <div style={{ width: '300px' }}>
        <InputCalendar
          date={moment()}
          focused
          block
          onDateChange={date => console.log(date)}
          onFocusChange={e => console.log(e)}
        />
      </div>
    )),
  );
