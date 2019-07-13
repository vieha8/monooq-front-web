// @flow

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import DisplayErrors from './index';

DisplayErrors.displayName = 'DisplayErrors';

storiesOf('Molecules(LV2)/DisplayErrors', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      エラーリスト
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <DisplayErrors keyName="name_errors" errors={['error1', 'error2', 'error3']} />
    </div>
  )),
);
