// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import PaidComplete from './index';

PaidComplete.displayName = 'PaidComplete';

storiesOf('Organisms(LV3)/PaidComplete', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        支払い完了
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <PaidComplete spaceName="素敵なものおき！" />
      </div>
    )),
  );
