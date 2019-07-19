// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import RegisterProfile from './index';

RegisterProfile.displayName = 'RegisterProfile';

storiesOf('Organisms(LV3)/RegisterProfile', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
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
          email=""
          emailError={[]}
          password=""
          passError={[]}
          buttonDisabled={false}
          isRegisterChecking={false}
          story
        />
      </div>
    )),
  );
