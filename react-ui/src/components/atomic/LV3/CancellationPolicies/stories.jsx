// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import CancellationPolicies from './index';

CancellationPolicies.displayName = 'CancellationPolicies';

storiesOf('Organisms(LV3)/CancellationPolicies', module).add(
  'Normal',
  withInfo(`
        ### コンポーネント概要
        CancellationPolicies
      `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <CancellationPolicies />
    </div>
  )),
);
