// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from './index';

storiesOf('Organisms/Header', module)
  .add('Logged In', () => (
    <div>
      <Header
        homeUri="#"
        searchUri="#"
        messageUri="#"
        messageCount={4}
        user={{
          image: 'http://placehold.jp/500x500.png',
          name: 'name',
        }}
        loginUri="#"
        signupUri="#"
        onClickAvatar={() => console.log('onClickAvatar')}
      />
    </div>
  ))
  .add('Anonymouse', () => (
    <div>
      <Header
        homeUri="#"
        user={null}
        loginUri="#"
        signupUri="#"
      />
    </div>
  ));
