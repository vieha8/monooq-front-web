// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import AvatarIcon from './AvatarIcon';
import Anonymouse from './Anonymouse';
import MessageIcon from './MessageIcon';

AvatarIcon.displayName = 'AvatarIcon';
Anonymouse.displayName = 'Anonymouse';
MessageIcon.displayName = 'MessageIcon';

storiesOf('Molecules(LV2)/HeaderAction', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Anonymouse',
    withInfo(`
      ### コンポーネント概要
      ヘッダアクション(ログイン、登録リンク)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Anonymouse loginUrl="#" signupUrl="#" />
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
    'MessageIcon',
    withInfo(`
      ### コンポーネント概要
      ヘッダアクション(メッセージアイコン)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <MessageIcon href="#" messageCount={10} />
      </div>
    )),
  );
