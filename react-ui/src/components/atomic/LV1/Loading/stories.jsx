// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Loading from './index';

Loading.displayName = 'Loading';

storiesOf('Atoms(LV1)/Util/Loading', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    ローディングアイコン(大・中・小)
  `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <Loading size="mini" />
      <Loading size="medium" />
      <Loading size="large" />
    </div>
  )),
);
