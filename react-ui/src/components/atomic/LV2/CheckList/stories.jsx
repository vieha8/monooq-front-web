// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import CheckListMock from './mock/CheckList';

CheckListMock.displayName = 'CheckListMock';

storiesOf('Molecules(LV2)/CheckList', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    チェックボックスリスト
  `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <CheckListMock />
    </div>
  )),
);
