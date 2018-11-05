// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import RegisterEmail from './index';

RegisterEmail.displayName = 'RegisterEmail';

storiesOf('Organisms/RegisterEmail', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        アカウント登録フォーム
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <RegisterEmail
          onClickNext={() => {}}
          onClickFacebook={() => {}}
          onChangeEmail={() => {}}
          onChangePassword={() => {}}
          onChangePasswordConfirm={() => {}}
          email=""
          emailError={[]}
          password=""
          passError={[]}
          passwordConfirm=""
          passConfirmError={[]}
          buttonDisabled={false}
          isRegisterChecking={false}
        />
      </div>
    )),
  );
