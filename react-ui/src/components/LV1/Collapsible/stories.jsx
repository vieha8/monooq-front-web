// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Collapsible from './index';

Collapsible.displayName = 'Collapsible';

storiesOf('Atoms(LV1)/Util/Collapsible', module).add(
  'Collapsible',
  withInfo(`
      ### コンポーネント概要
      アコーディオンコンポーネント
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <Collapsible />
    </div>
  )),
);
