// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SalesApplication from './index';

SalesApplication.displayName = 'SalesApplication';

storiesOf('Organisms(LV3)/SalesApplication', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        売上詳細
      `)(() => (
      <div style={{ width: '100%', maxWidth: '680px', padding: `${Dimens.storyBookPadding}` }}>
        <SalesApplication sales={[]} transfer={[]} />
      </div>
    )),
  );
