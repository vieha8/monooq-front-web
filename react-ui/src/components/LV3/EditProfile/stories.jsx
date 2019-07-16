// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import EditProfile from './index';
import Completed from './Completed';

EditProfile.displayName = 'EditProfile';
Completed.displayName = 'Completed';

storiesOf('Organisms(LV3)/EditProfile', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        プロフィール編集フォーム
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <EditProfile />
      </div>
    )),
  )
  .add(
    'Completed',
    withInfo(`
        ### コンポーネント概要
        プロフィール編集完了
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Completed />
      </div>
    )),
  );
