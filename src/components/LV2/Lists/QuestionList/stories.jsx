import React from 'react';
import Path from 'config/path';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import QuestionList from './index';

QuestionList.displayName = 'QuestionList';

storiesOf('Molecules(LV2)/Lists/QuestionList', module)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        よくある質問(リストのみver)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <QuestionList
          list={[
            {
              text: 'モノオクサービス内で決済を行われていない場合。',
            },
            {
              text: 'メッセージ上で記録に残っていない、ホストが把握していない荷物の場合。',
            },
            {
              text: 'モノオクに登録していないスペースに置いた荷物の場合。',
            },
            {
              text: 'スペース登録をした本人が管理していない場合。',
            },
          ]}
        />
      </div>
    )),
  )
  .add(
    'Title Description',
    withInfo(`
        ### コンポーネント概要
        よくある質問(タイトルと説明のみver)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <QuestionList
          title="保証の適用範囲は？"
          text="受託者賠償責任保険が適応され、モノオクで取引・決済を行ったスペースへ置いた荷物に対して最大10万円（免責金額3,000円）までの補償を提供しています。"
        />
      </div>
    )),
  )
  .add(
    'Title List Description',
    withInfo(`
        ### コンポーネント概要
        よくある質問(タイトルとリストと説明ver)(リストではコンポーネントを利用)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <QuestionList
          title="保証対象外の荷物は？"
          list={[
            {
              text: 'サービス内で確認が不可能な荷物の場合。',
            },
            {
              textCustom: (
                <div>
                  モノオクで定める
                  <a href={`${Path.rule()}#not-allowed`}>「取引ができない荷物」</a>
                  に記載された違反の荷物の場合。
                </div>
              ),
            },
          ]}
          text="これらに対しては保証対象外となります。"
        />
      </div>
    )),
  );
