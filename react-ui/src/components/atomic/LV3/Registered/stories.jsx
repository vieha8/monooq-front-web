// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import Registered from './index';

storiesOf('Organisms(LV3)/Registered', module)
  .addDecorator(StoryRouter())
  .add('Normal', () => (
    <Registered
      image="http://placehold.jp/500x500.png"
      name="ものおく太郎"
      onClickUser={() => console.log('onClickUser')}
      onClickHost={() => console.log('onClickHost')}
    />
  ));
