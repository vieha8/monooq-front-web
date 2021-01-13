import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import RadioListMock from './mock/RadioList';

RadioListMock.displayName = 'RadioListMock';

storiesOf('Molecules(LV2)/Forms/RadioList', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    ラジオリスト
  `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <RadioListMock />
    </div>
  )),
);
