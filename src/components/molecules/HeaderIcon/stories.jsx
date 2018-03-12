// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchIcon from './SearchIcon';
import MessageIcon from './MessageIcon';
import AvatarIcon from './AvatarIcon';

storiesOf('Molecules/Header/HeaderIcon', module)
  .add('SearchIcon', () => (
    <div>
      <SearchIcon
        href="#"
      />
    </div>
  ))
  .add('MessageIcon', () => (
    <div>
      <MessageIcon
        href="#"
        notificationCount={0}
      />
      <MessageIcon
        href="#"
        notificationCount={10}
      />
    </div>
  ))
  .add('AvatarIcon', () => (
    <div>
      <AvatarIcon
        imageSrc="http://placehold.jp/500x500.png"
        imageAlt=""
        onClick={() => console.log('onClick AvatarIcon')}
      />
    </div>
  ));
