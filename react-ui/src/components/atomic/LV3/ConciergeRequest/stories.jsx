// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ConciergeRequest from './index';

ConciergeRequest.displayName = 'ConciergeRequest';

storiesOf('Organisms(LV3)/ConciergeRequest', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        モノオクコンシェルジュLP
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ConciergeRequest />
      </div>
    )),
  );
