// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ConciergeIntroduction from './index';

ConciergeIntroduction.displayName = 'ConciergeIntroduction';

storiesOf('Molecules(LV2)/ConciergeIntroduction', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      コンシェルジュ紹介枠
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <ConciergeIntroduction />
    </div>
  )),
);
