// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Footer from './index';

Footer.displayName = 'Footer';

storiesOf('Molecules(LV2)/Footer', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
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
