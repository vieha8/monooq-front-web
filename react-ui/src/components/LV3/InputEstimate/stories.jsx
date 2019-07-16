// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import InputEstimate from './index';

InputEstimate.displayName = 'InputEstimate';

storiesOf('Organisms(LV3)/InputEstimate', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        見積もり送付フォーム
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <InputEstimate />
      </div>
    )),
  );
