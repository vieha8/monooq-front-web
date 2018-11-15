// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SlideMenu from './index';

SlideMenu.displayName = 'SlideMenu';

storiesOf('Atoms(LV1)/SlideMenu', module)
  .addDecorator(StorybookRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        スライドメニュー
      `)(() => (
      <div style={{ width: '100%', padding: `${Dimens.storyBookPadding}` }}>
        <SlideMenu />
      </div>
    )),
  );
