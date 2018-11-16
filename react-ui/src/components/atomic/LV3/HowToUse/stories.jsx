// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import HowToUse from './index';

HowToUse.displayName = 'HowToUse';

storiesOf('Organisms(LV3)/HowToUse', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        モノオクの使い方
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <HowToUse />
      </div>
    )),
  );
