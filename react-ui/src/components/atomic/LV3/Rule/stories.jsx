// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Rule from './index';

Rule.displayName = 'Rule';

storiesOf('Organisms(LV3)/Rule', module).add(
  'Normal',
  withInfo(`
        ### コンポーネント概要
        Rule
      `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <Rule />
    </div>
  )),
);
