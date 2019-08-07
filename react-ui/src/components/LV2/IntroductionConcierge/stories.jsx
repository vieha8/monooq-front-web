// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import IntroductionConcierge from './index';

IntroductionConcierge.displayName = 'IntroductionConcierge';

storiesOf('Molecules(LV2)/IntroductionConcierge', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      コンシェルジュ紹介枠
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <IntroductionConcierge />
    </div>
  )),
);
