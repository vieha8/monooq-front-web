// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import PaidComplete from './index';

PaidComplete.displayName = 'PaidComplete';

storiesOf('Organisms(LV3)/PaidComplete', module)
  .addDecorator(StoryRouter())
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
