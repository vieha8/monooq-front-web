// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import InputPayment from './index';

InputPayment.displayName = 'InputPayment';

storiesOf('Organisms/InputPayment', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        決済フォーム
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <InputPayment />
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
        <InputPayment paidError />
      </div>
    )),
  );
