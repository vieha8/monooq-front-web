// @flow

import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Estimate from './Message';
import InputSchedule from './InputSchedule';
import InputPrice from './InputPrice';

Estimate.displayName = 'Estimate';
InputSchedule.displayName = 'InputSchedule';
InputPrice.displayName = 'InputPrice';

storiesOf('Molecules(LV2)/Estimate', module)
  .add(
    'Message',
    withInfo(`
      ### コンポーネント概要
      お見積もり
      - ・beginAt：利用開始日
      - ・endAt：利用終了日
      - ・duaration：期間
      - ・price：お見積もり金額
    `)(() => (
      <div style={{ width: '100%', maxWidth: '300px', padding: `${Dimens.storyBookPadding}` }}>
        <Estimate beginAt="2018年03月20日" endAt="2018年05月20日" duration={60} price="32,000" />
      </div>
    )),
  )
  .add(
    'InputSchedule',
    withInfo(`
      ### コンポーネント概要
      日付入力
      - ・beginDate：利用開始日
      - ・endDate：利用終了日
    `)(() => (
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          margin: 'auto 0px 300px',
          padding: `${Dimens.storyBookPadding}`,
        }}
      >
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
    )),
  )
  .add(
    'InputPrice',
    withInfo(`
      ### コンポーネント概要
      お見積もり料金入力
    `)(() => (
      <div style={{ width: '100%', maxWidth: '800px', padding: `${Dimens.storyBookPadding}` }}>
        <InputPrice
          value="123"
          onChange={() => {}}
          errors={['入力してください', '1,000円以上です']}
        />
      </div>
    )),
  );
