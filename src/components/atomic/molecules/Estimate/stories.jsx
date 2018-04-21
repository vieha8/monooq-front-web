// @flow

import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';

import Estimate from './Message';
import InputSchedule from './InputSchedule';
import InputPrice from './InputPrice';

storiesOf('Molecules/Estimate', module)
  .add('Message', () => (
    <div style={{ width: '100%', maxWidth: '300px' }}>
      <Estimate beginAt="2018年03月20日" endAt="2018年05月20日" duration={60} price="32,000" />
    </div>
  ))
  .add('InputSchedule', () => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <InputSchedule
        beginDate={moment()}
        endDate={moment()}
        beginDateFocused
        onDateChangeBegin={() => {}}
        onFocusChangeBegin={() => {}}
        onDateChangeEnd={() => {}}
        onFocusChangeEnd={() => {}}
      />
    </div>
  ))
  .add('InputPrice', () => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <InputPrice
        value="123"
        onChange={() => {}}
        errors={['入力してください', '1,000円以上です']}
      />
    </div>
  ));
