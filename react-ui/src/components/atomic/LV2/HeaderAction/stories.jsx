// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SearchIcon from './SearchIcon';
import MessageIcon from './MessageIcon';
import AvatarIcon from './AvatarIcon';
import Anonymouse from './Anonymouse';

SearchIcon.displayName = 'SearchIcon';
MessageIcon.displayName = 'MessageIcon';
AvatarIcon.displayName = 'AvatarIcon';
Anonymouse.displayName = 'Anonymouse';

storiesOf('Molecules/HeaderAction', module)
  .addDecorator(StoryRouter())
  .add(
    'SearchIcon',
    withInfo(`
      ### コンポーネント概要
      ヘッダアクション(検索アイコン)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <SearchIcon href="#" />
      </div>
    )),
  )
  .add(
    'MessageIcon',
    withInfo(`
      ### コンポーネント概要
      ヘッダアクション(メッセージアイコン)
      - ・to：遷移先URL
      - ・notificationCount：通知カウント
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <MessageIcon to="#" notificationCount={0} />
        <MessageIcon to="#" notificationCount={10} />
      </div>
    )),
  )
  .add(
    'AvatarIcon',
    withInfo(`
      ### コンポーネント概要
      ヘッダアクション(アバターアイコン)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <AvatarIcon
          imageSrc="http://placehold.jp/500x500.png"
          imageAlt=""
          onClick={() => console.log('onClick AvatarIcon')}
        />
      </div>
    )),
  )
  .add(
    'Anonymouse',
    withInfo(`
      ### コンポーネント概要
      ヘッダアクション(ログイン、登録リンク)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Anonymouse loginUri="#" signupUri="#" />
      </div>
    )),
  );
