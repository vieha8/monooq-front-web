// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import InfoUser from './index';

InfoUser.displayName = 'InfoUser';

storiesOf('Molecules(LV2)/Space', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'InfoUser',
    withInfo(`
      ### コンポーネント概要
      ユーザ情報(ホスト)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <InfoUser
          id={100}
          name="モノオク 太郎"
          profile="よろしくお願いします！"
          imageUrl="http://placehold.jp/500x500.png"
          isHost
        />
      </div>
    )),
  )
  .add(
    'InfoUser',
    withInfo(`
      ### コンポーネント概要
      ユーザ情報(ゲスト)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <InfoUser
          id={100}
          name="モノオク 太郎"
          profile="よろしくお願いします！"
          imageUrl="http://placehold.jp/500x500.png"
        />
      </div>
    )),
  );
