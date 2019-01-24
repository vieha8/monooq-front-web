// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import CancellationPolicies from './index';

CancellationPolicies.displayName = 'CancellationPolicies';

storiesOf('Organisms(LV3)/CancellationPolicies', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
          ### コンポーネント概要
          CancellationPolicies
        `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <CancellationPolicies />
      </div>
    )),
  );
