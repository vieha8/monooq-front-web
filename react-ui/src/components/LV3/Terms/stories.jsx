// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Terms from './index';

Terms.displayName = 'Terms';

storiesOf('Organisms(LV3)/Terms', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        Terms
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Terms />
      </div>
    )),
  );
