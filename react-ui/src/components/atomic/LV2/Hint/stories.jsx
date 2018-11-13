// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Hint from './index';

Hint.displayName = 'Hint';

storiesOf('Molecules(LV2)/Hint', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      ヒント
    `)(() => (
    <div
      style={{
        width: '100%',
        maxWidth: '380px',
        height: '100%',
        maxHeight: '340px',
        padding: `${Dimens.storyBookPadding}`,
      }}
    >
      <Hint
        title="お見積もりのヒント"
        content={[
          'メッセージの相談内容を元に最終的な見積もりを相手に提示しましょう。',
          '思っていたより荷物が少なかったり、期間が短い場合はちょっぴり値下げすると喜ばれます。',
        ]}
      />
    </div>
  )),
);
