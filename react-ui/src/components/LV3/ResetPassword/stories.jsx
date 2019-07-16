// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ResetPassword from './index';

ResetPassword.displayName = 'ResetPassword';

storiesOf('Organisms(LV3)/ResetPassword', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        パスワードリセット(再設定用メールアドレス入力フォーム)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ResetPassword
          email=""
          onChangeEmail={() => console.log('onChangeEmail')}
          onClickSend={() => console.log('onClickSend')}
          buttonDisabled={false}
        />
      </div>
    )),
  )
  .add(
    'Sended',
    withInfo(`
        ### コンポーネント概要
        パスワードリセット(再設定用メール送信完了)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ResetPassword
          email=""
          onChangeEmail={() => console.log('onChangeEmail')}
          onClickSend={() => console.log('onClickSend')}
          buttonDisabled={false}
          sended
        />
      </div>
    )),
  );
