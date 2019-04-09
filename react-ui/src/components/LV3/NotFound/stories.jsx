// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import NotFound from './index';

NotFound.displayName = 'NotFound';

storiesOf('Organisms(LV3)/NotFound', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
          ### コンポーネント概要
          NotFound
        `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <NotFound />
      </div>
    )),
  );
