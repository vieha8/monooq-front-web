// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import IconInputField from './index';

IconInputField.displayName = 'IconInputField';

storiesOf('Molecules/IconInputField', module)
  .add(
    'Email',
    withInfo(`
      ### コンポーネント概要
      入力欄(Email)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '800px', padding: `${Dimens.storyBookPadding}` }}>
        <IconInputField iconClassName="fal fa-envelope" />
      </div>
    )),
  )
  .add(
    'Password',
    withInfo(`
      ### コンポーネント概要
      入力欄(パスワード)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '800px', padding: `${Dimens.storyBookPadding}` }}>
        <IconInputField iconClassName="fal fa-unlock-alt" type="password" />
      </div>
    )),
  );
