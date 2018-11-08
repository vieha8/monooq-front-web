// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Card from './index';

Card.displayName = 'Card';

storiesOf('Atoms(LV1)/Util/Card', module)
  .add(
    'Block',
    withInfo(`
      ### コンポーネント概要
      カード(block)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Card block>
          <span>ほげほげほげ</span>
        </Card>
        <Card block>
          <span>ほげほげほげ</span>
        </Card>
      </div>
    )),
  )
  .add(
    'InlineBlock',
    withInfo(`
      ### コンポーネント概要
      カード(inline)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Card>
          <span>ほげほげほげ</span>
        </Card>
        <Card>
          <span>ほげほげほげ</span>
        </Card>
      </div>
    )),
  );
