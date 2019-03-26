// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Rule from './index';

Rule.displayName = 'Rule';

storiesOf('Organisms(LV3)/Rule', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
          ### コンポーネント概要
          Rule
        `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Rule />
      </div>
    )),
  );
