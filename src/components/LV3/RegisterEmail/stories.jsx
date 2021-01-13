import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import RegisterEmail from './index';

RegisterEmail.displayName = 'RegisterEmail';

storiesOf('Organisms(LV3)/RegisterEmail', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
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
          email=""
          emailError={[]}
          password=""
          passError={[]}
          buttonDisabled={false}
          isRegisterChecking={false}
        />
      </div>
    )),
  );
