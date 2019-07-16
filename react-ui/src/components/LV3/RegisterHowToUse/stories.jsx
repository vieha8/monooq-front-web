// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import RegisterHowToUse from './index';

RegisterHowToUse.displayName = 'RegisterHowToUse';

storiesOf('Organisms(LV3)/RegisterHowToUse', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        利用方法登録フォーム
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <RegisterHowToUse
          onClickNext={() => {}}
          onClickFacebook={() => {}}
          onChangeEmail={() => {}}
          onChangePassword={() => {}}
          userName="モノオク太郎"
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
