// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import moment from 'moment';

import InputCalendar from './index';

storiesOf('Atoms/Forms/InputCalendar', module)
  .add('Normal', () => (
    <div style={{ width: '300px' }}>
      <InputCalendar
        date={moment()}
        focused
        block
        onDateChange={date => console.log(date)}
        onFocusChange={e => console.log(e)}
      />
    </div>
  ));
