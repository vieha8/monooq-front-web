// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import RegisterEmail from './index';

storiesOf('Organisms/RegisterEmail', module)
  .addDecorator(StoryRouter())
  .add('Normal', () => (
    <RegisterEmail
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
