import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ErrorList from './index';

ErrorList.displayName = 'ErrorList';

storiesOf('Molecules(LV2)/Lists/ErrorList', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      エラーリスト
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <ErrorList keyName="name_errors" errors={['error1', 'error2', 'error3']} />
    </div>
  )),
);
