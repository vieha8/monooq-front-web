// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import RegisterProfile from './index';

storiesOf('Organisms/RegisterProfile', module)
  .addDecorator(StoryRouter())
  .add('Normal', () => (
    <RegisterProfile
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
