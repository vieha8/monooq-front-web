// @flow

import React from 'react';
import Template from './Template';

const QandA = [
  {
    title: 'PickGoとはなんですか？',
    content: '単身の引越しや少し大きな荷物の配達に便利な、お客様と配送員を直接つないでくれる配送サービスです。配送料金5000円〜から交渉・依頼できます。<a href="http://pickgo.town/personal/" target="_blank">詳細はこちら</a>',
    circleDown: true,
  },
  {
    title: '外国語の対応はできますか？',
    content: 'ホストによっては対応が可能なスペースもあります。',
    circleDown: true,
  },
  {
    title: 'レビューはどこから投稿するのですか？',
    content: 'スペースの取引完了後にメッセージで通知されます。または「スケジュール」ページの終了したスペース欄に「レビューを投稿する」ボタンがあります。@monooq.comまでご連絡ください。',
    circleDown: true,
    anchor: 'common4',
  },
  {
    title: '誤ったレビュー内容を投稿してしまいました。変更できますか？',
    content: '1度投稿したレビューは原則変更できません。どうしても変更したい場合は、ログイン後の「お問い合わせ」よりモノオクまでご連絡ください。',
    circleDown: true,
  },
  // {
  //   title: '嫌がらせのメッセージが届きます。どうすればよいですか？',
  //   content: '該当するユーザーの写真アイコンをクリックし、プロフィールページ右上にある「通報ボタン」より、モノオクまでお知らせください。',
  //   circleDown: true,
  // },
  // {
  //   title: '不快な内容が掲載されたスペースがあります。',
  //   content: '該当するスペース情報の右上にある「通報ボタン」より、モノオクまでお知らせください。',
  //   circleDown: true,
  // },
  {
    title: '退会をしたいです。',
    content: 'ご利用ありがとうございました。ログイン後の「プロフィール編集」ページに退会申請ボタンがあります。',
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
    headline="その他"
    qa={QandA}
    openFlagList={props.openFlagList}
    onClickList={props.onClickList}
    onClickBack={props.onClickBack}
  />
);
