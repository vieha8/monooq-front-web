import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Card from './index';

Card.displayName = 'Card';

storiesOf('Atoms(LV1)/Card', module)
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
  )
  .add(
    'option',
    withInfo(`
      ### コンポーネント概要
      カード(option)
      * ・「noBorder」を指定することで、枠線を非表示にすることが可能。
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Card block>
          <span>border有り</span>
        </Card>
        <Card block noBorder>
          <span>border無し</span>
        </Card>
        <Card block noBorderPhone>
          <span>tablet以下border無し</span>
        </Card>
      </div>
    )),
  );
