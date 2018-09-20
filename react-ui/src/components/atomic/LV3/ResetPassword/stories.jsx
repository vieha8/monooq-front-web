// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import ResetPassword from './index';

storiesOf('Organisms/ResetPassword', module)
  .addDecorator(StoryRouter())
  .add('Normal', () => (
    <ResetPassword
      email=""
      onChangeEmail={() => console.log('onChangeEmail')}
      onClickSend={() => console.log('onClickSend')}
      buttonDisabled={false}
    />
  ))
  .add('Sended', () => (
    <ResetPassword
      email=""
      onChangeEmail={() => console.log('onChangeEmail')}
      onClickSend={() => console.log('onClickSend')}
      buttonDisabled={false}
      sended
    />
  ));
