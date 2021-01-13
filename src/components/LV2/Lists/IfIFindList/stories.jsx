import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import IfIFindList from './index';

IfIFindList.displayName = 'IfIFindList';

storiesOf('Molecules(LV2)/Lists/IfIFindList', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      利用フローリスト
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <IfIFindList
        list={[
          {
            label: '相談',
            text:
              'スペースが見つかったら、まずはホストに預けたい荷物の種類や量と希望期間をメッセージで相談しましょう。この時点でまだ支払いは発生しないので、気軽に連絡してみましょう。',
          },
          {
            label: '見積もり',
            text: 'あなたの荷物内容と利用期間に応じて、ホストから見積もりが送られてきます。',
          },
          {
            label: 'お支払い',
            text:
              '提示された見積もりに納得したらお支払いへ進みます。ホストが困らないように支払い前までに荷物の詳細はすべて伝えておきましょう。',
          },
          {
            label: '取引成立',
            text:
              'お支払いが完了したら取り引き成立です！直前に慌ただしくならないように荷物の準備はお早めに。',
          },
          {
            label: '利用開始',
            text:
              'ホストのスペースへ荷物を置かせてもらいます。事前に連絡がない荷物は受けてもらえないこともあるので約束通り誠実な対応を。',
          },
          {
            label: '利用終了',
            text:
              'スペース利用終了日はお忘れなく！無断での延長・あなたと連絡がとれない時は、規約に基づいた対応やペナルティ料金が発生する場合があります。',
          },
          {
            label: 'レビュー',
            text: '親切に預かってくれたホストに感謝の気持ちをこめてレビューを送りましょう！',
          },
        ]}
      />
    </div>
  )),
);
