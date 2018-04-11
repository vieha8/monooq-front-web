// @flow

import React from 'react';
import Template from './Template';

const QandA = [
  {
    title: '料金目安よりも高い見積もりが提示されました。',
    content: 'あなたの荷物はとても量が多く、大きなものだったり、一般的ではない荷物ではありませんか？ホストは出来る限りの最適な見積もりを提示してくれています。料金に納得できない場合は丁寧にお断りをしましょう。',
    circleDown: true,
  },
  {
    title: 'ホストから送られてきた見積もりに誤りがありました。',
    content: 'ホストに正しい内容を伝えて再度見積もりの発行をしてもらってください。',
    circleDown: true,
  },
  // {
  //   title: '決済完了しましたが、スペース利用のキャンセルをしたいです。可能ですか？',
  //   content: 'キャンセルは可能ですが、利用開始日前15日間以降はキャンセル手数料が発生します。ホストと契約をする前にこちらの「キャンセルポリシー」を必ずお読みになってください。',
  //   circleDown: true,
  // },
  {
    title: '思ったより荷物が増えてしまいました。事前に申告しなくても荷物は置けますか？',
    content: 'いいえ。事前に了承を得た荷物のみ、ホストの元へ届けてください。ホストの物置きスペースに余裕がない場合はどんなに頑張っても置くことはできません。',
    circleDown: true,
  },
  {
    title: '途中でスペースの延長したくなりました。可能ですか？',
    content: 'まずはホストに利用延長が可能か確認をしてください。ホストのスケジュールが合えば、追加で決済をすることで延長が可能です。',
    circleDown: true,
  },
  {
    title: '取引でトラブルが発生しました。どこに相談すれば良いですか？',
    content: '当人で解決できないトラブルが発生してしまった場合は、「お問い合わせ」よりモノオク問題解決センターまでご依頼ください。',
    circleDown: true,
  },
  {
    title: '現金でのやり取りはできますか？',
    content: 'いいえ、できません。モノオクのサイト以外では決して送金や連絡を行わないようにご注意ください。サービス外での取り引きに対しては、荷物の保証が一切できません。',
    circleDown: true,
  },
];

type PropTypes = {
  onClickList: Function,
  openFlagList: Array<boolean>,
  onClickBack: Function,
}

export default (props: PropTypes) => (
  <Template
    headline="取引について"
    qa={QandA}
    openFlagList={props.openFlagList}
    onClickList={props.onClickList}
    onClickBack={props.onClickBack}
  />
);
