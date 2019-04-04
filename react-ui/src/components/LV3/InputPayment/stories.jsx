// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import InputPayment from './index';

InputPayment.displayName = 'InputPayment';

storiesOf('Organisms(LV3)/InputPayment', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        決済フォーム
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <InputPayment
          paidError=""
          onChangeName={console.log('Clicked')}
          name="name"
          onChangeNumber={console.log('Clicked')}
          number="number"
          onChangeYear={console.log('Clicked')}
          year="year"
          onChangeMonth={console.log('Clicked')}
          month="month"
          onChangeCvc={console.log('Clicked')}
          cvc="cvc"
          buttonDisabled={true}
          buttonLoading={false}
          onClickPay=""
          errors=""
        />
      </div>
    )),
  )
  .add(
    'Error',
    withInfo(`
        ### コンポーネント概要
        決済フォーム(入力エラーver)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <InputPayment
          paidError
          onChangeName={console.log('Clicked')}
          name="name"
          onChangeNumber={console.log('Clicked')}
          number="number"
          onChangeYear={console.log('Clicked')}
          year="year"
          onChangeMonth={console.log('Clicked')}
          month="month"
          onChangeCvc={console.log('Clicked')}
          cvc="cvc"
          buttonDisabled={true}
          buttonLoading={false}
          onClickPay=""
          errors=""
        />
      </div>
    )),
  );
