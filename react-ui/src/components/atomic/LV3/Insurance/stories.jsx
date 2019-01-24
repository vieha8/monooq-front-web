// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Insurance from './index';

Insurance.displayName = 'Insurance';

storiesOf('Organisms(LV3)/Insurance', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
          ### コンポーネント概要
          Insurance
        `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Insurance />
      </div>
    )),
  );
