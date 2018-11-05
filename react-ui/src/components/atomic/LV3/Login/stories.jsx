// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Login from './index';

Login.displayName = 'Login';

storiesOf('Organisms/Login', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        ログインフォーム
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Login />
      </div>
    )),
  );
