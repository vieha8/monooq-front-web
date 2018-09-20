// @flow

import React from 'react';
import Template from './Template';

const QandA = [
  {
    title: '売上の振込申請は何円からできますか？',
    content: 'サービス手数料を差し引いた売上の合計が3,000円以上の場合に振込申請が可能です。',
    circleDown: true,
  },
  {
    title: '振込申請をした後、売上はいつごろ入金されますか？',
    content:
      '原則、5営業日後にご登録いただいた振込先へ送金いたします。もしも振込口座の入力ミスがあった場合は、送金までにお時間をいただく可能性がございます。',
    circleDown: true,
  },
  {
    title: '振込先は自分の口座を入力しなければいけませんか？',
    content:
      'はい。アカウント登録をおこなったご本人が所有している銀行口座をご入力ください。もしご本人でないと発覚した場合、送金までにお時間をいただく可能性がございます。',
    circleDown: true,
  },
  {
    title: '振込手数料はかかりますか？',
    content:
      '合計金額が10,000円以下の振込申請時は1回の振込につき一律260円の振込手数料を頂戴します。合計金額が10,000円以上の場合の振込手数料は無料です。※振込手数料を差し引いた金額が入金されます。※登録された口座情報に誤りがあった場合は再振込手数260円がかかりますのでご注意ください。',
    circleDown: true,
  },
  {
    title: '本名で登録しなければいけませんか？',
    content: 'スペースの掲載を行うホストの方は、できるだけ本名でのご登録をお願いしています。',
    circleDown: true,
  },
  {
    title: '売上はどこから振込を申請できますか？',
    content: 'モノオクにログイン後、メニュー「売上・振込申請」より申請をしてください。',
    circleDown: true,
  },
  {
    title: 'スペース利用料金が売上に反映されるのはいつですか？',
    content:
      'ユーザーの決済が完了した時点で売上に反映されます。メニュー「売上・振込申請」より今までの売上履歴が確認できます。',
    circleDown: true,
  },
  // {
  //   title: 'スペース利用料金の振込申請はいつからできますか？',
  //   content:
  //     'メッセージ通知で「荷物の受け取りが完了した」リンクをクリックし、ユーザーへ荷物とスペースの様子を写真で報告した後から振込申請が可能です。',
  //   circleDown: true,
  // },
  // {
  //   title: '間違えて振込先口座を登録してしまいました。変更はできますか？',
  //   content: '売上・振込申請ページの「口座情報を変更する」ボタンより変更が可能です。',
  //   circleDown: true,
  // },
];

type PropTypes = {
  onClickList: Function,
  openFlagList: Array<boolean>,
  onClickBack: Function,
};

export default (props: PropTypes) => (
  <Template
    headline="売上や振込について"
    qa={QandA}
    openFlagList={props.openFlagList}
    onClickList={props.onClickList}
    onClickBack={props.onClickBack}
  />
);
