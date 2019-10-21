// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import AvatarIcon from './AvatarIcon';
import MessageIcon from './MessageIcon';
import SearchIcon from './SearchIcon';

AvatarIcon.displayName = 'AvatarIcon';
MessageIcon.displayName = 'MessageIcon';
SearchIcon.displayName = 'SearchIcon';

storiesOf('Molecules(LV2)/HeaderAction', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
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
    'MessageIcon',
    withInfo(`
      ### コンポーネント概要
      ヘッダアクション(メッセージアイコン)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <MessageIcon href="#" messageCount={10} />
      </div>
    )),
  )
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
  );
