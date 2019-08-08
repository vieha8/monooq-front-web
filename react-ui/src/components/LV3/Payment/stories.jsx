// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Payment from './index';

Payment.displayName = 'Payment';

storiesOf('Organisms(LV3)/Payment', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        決済フォーム
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Payment
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
        <Payment
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
