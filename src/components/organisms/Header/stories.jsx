// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from './index';
import HeaderMock from './mock/header';

storiesOf('Organisms/Header', module)
  .add('Logged In', () => (
    <div>
      <HeaderMock />
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
