import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Login from './index';

Login.displayName = 'Login';

storiesOf('Organisms(LV3)/Login', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
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
