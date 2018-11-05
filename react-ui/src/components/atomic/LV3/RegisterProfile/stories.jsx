// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import RegisterProfile from './index';

RegisterProfile.displayName = 'RegisterProfile';

storiesOf('Organisms/RegisterProfile', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        プロフィール登録フォーム
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <RegisterProfile
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
