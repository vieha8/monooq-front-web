// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import About from './index';

About.displayName = 'About';

storiesOf('Organisms(LV3)/About', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
          ### コンポーネント概要
          About
        `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <About />
      </div>
    )),
  );
