// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Footer from './index';

Footer.displayName = 'Footer';

storiesOf('Molecules(LV2)/Footer', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      共通フッタ
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Footer />
      </div>
    )),
  );
