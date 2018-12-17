// @flow

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import WhySafeList from './index';

WhySafeList.displayName = 'WhySafeList';

storiesOf('Molecules(LV2)/WhySafeList', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      安心サポートリスト
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <WhySafeList
        list={[
          {
            label: '最大10万円の保証',
            text:
              'モノオクでは、あなたの荷物やホストをお守りするために保証制度をご用意しています。もしも、破損・紛失・盗難などが起きてしまった場合には、最大10万円（免責金額3,000円）までの補償を提供しています。',
          },
          {
            label: 'すべての取引に対応',
            text:
              'モノオクのサービス内で成立したスペースを利用する、すべての取引に自動的に適用されます。保険料のお支払いは必要ありません。',
          },
          {
            label: 'ホストも安心',
            text:
              'スペースに置いてある荷物に予期せぬ事故や災害があった場合、ホストが荷物の保険を申請することができます。',
          },
        ]}
      />
    </div>
  )),
);
