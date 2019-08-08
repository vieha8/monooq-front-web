// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ProfileEdit from './index';
import Completed from './Completed';

ProfileEdit.displayName = 'ProfileEdit';
Completed.displayName = 'Completed';

storiesOf('Organisms(LV3)/ProfileEdit', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        プロフィール編集フォーム
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ProfileEdit />
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
