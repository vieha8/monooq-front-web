// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Privacy from './index';

Privacy.displayName = 'Privacy';

storiesOf('Organisms(LV3)/Privacy', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
          ### コンポーネント概要
          Privacy
        `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Privacy />
      </div>
    )),
  );
