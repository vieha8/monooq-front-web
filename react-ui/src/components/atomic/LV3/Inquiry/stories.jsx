// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Inquiry from './index';

Inquiry.displayName = 'Inquiry';

storiesOf('Organisms/Inquiry', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        お問い合わせ
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Inquiry />
      </div>
    )),
  );
