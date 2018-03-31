// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import Register from './index';

storiesOf('Organisms/Register', module)
  .addDecorator(StoryRouter())
  .add('Normal', () => (
    <Register
      onClickNext={() => {}}
      onClickFacebook={() => {}}
      onChangeEmail={() => {}}
      onChangePassword={() => {}}
      onChangePasswordConfirm={() => {}}
      email=""
      emailError={[]}
      password=""
      passError={[]}
      passwordConfirm=""
      passConfirmError={[]}
      buttonDisabled={false}
      isRegisterChecking={false}
    />
  ));
