// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import About from './index';

About.displayName = 'About';

storiesOf('Organisms(LV3)/About', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
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
