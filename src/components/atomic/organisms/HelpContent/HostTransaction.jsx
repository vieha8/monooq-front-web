// @flow

import React from 'react';
import styled from 'styled-components';
import Template from './Template';

const QandA = [
  {
    title: 'ユーザーの支払いが完了しない時はどうすれば良いですか？',
    content: 'メッセージで支払いをするように依頼してください。見積もりのお支払い期限は24時間です。期限内に支払いが完了しない場合は、再度見積もりを送付することが可能です。',
    circleDown: true,
  },
  {
    title: '取引成立後にキャンセルをしたい',
    content: '取引成立後のホストのキャンセルはペナルティが発生します。レビューに悪いの評価が自動的につき、キャンセルが多い場合はアカウント停止の対処を行います。',
    circleDown: true,
  },
  {
    title: '利用開始日になりましたが、荷物も届かずユーザーとも連絡がとれません。どうすれば良いですか？',
    content: '引き続き、メッセージで連絡してみてください。万が一、返事がない場合でも決済されたスペース利用料金はあなたの売上に反映されます。',
    circleDown: true,
  },
  {
    title: '利用終了日になりましたが、ユーザーが引取りに来てくれません。どうすれば良いですか？',
    content: '引き続き、メッセージで連絡をお願いします。うっかり利用終了日を忘れているだけかもしれません。モノオクでは問題解決センターを設置しています。トラブル発生の際はこちらまでご依頼ください。',
    circleDown: true,
  },
  {
    title: '掲載したスペース以外に荷物を置いても良いのですか？',
    content: 'いいえ。必ずモノオクに掲載したスペースに荷物を置いてください。掲載していないスペースでもし事故や破損があった場合は保証の対象外となります。',
    circleDown: true,
  },
  {
    title: 'スペースに置いてはいけない荷物はありますか？',
    content: 'スペースの利用を行う前にルールとマナーに記載の「取引ができない荷物」をお読みください。',
    circleDown: true,
  },
  {
    title: '荷物を破損または紛失してしまいました。どうすれば良いでしょうか？',
    content: 'もしスペースに置いた荷物に何かあった場合、保険が適用される場合があります。こちらの「荷物に関する保険」ページをお読みください。',
    circleDown: true,
  },
  {
    title: '掲載できないスペースはありますか？',
    content: 'モノオクでの登録は日本国内のスペースに限ります。また公共の場や自分で管理していないスペース等は登録することができません。',
    circleDown: true,
  },
  {
    title: '荷物の受け取りや管理はホスト本人じゃないとダメですか？',
    content: 'はい。スペース登録を行ったアカウントのご本人が必ず、受け取りと管理をしてください。もしご本人がやり取りをしなかった場合のトラブルや事故には弊社は責任を負いかねます。',
    circleDown: true,
  },
  {
    title: 'ユーザーから利用期間の延長をしたいと連絡がありました。どうすれば良いですか？',
    content: 'メッセージでは同じ相手に何回でも見積もりを作成することができます。延長の申し出があった際は、再度見積もりを発行し、ユーザーに決済をしてもらいます。',
    circleDown: true,
  },
  {
    title: 'ホストですが、取引成立後にキャンセルをしたいのですが可能ですか？',
    content: '可能ですがホスト都合による取引のキャンセルはペナルティが発生します。取引契約をする前にこちらの「キャンセルポリシー」を必ずお読みください。',
    circleDown: true,
  },
  {
    title: '決済後の料金変更は可能ですか？',
    content: '決済された料金の変更はできません。',
    circleDown: true,
  },
  {
    title: '当日になって事前申告がない荷物がありました。',
    content: '事前に連絡がない荷物には保証が適応されず、ホストは受け取り拒否が可能です。',
    circleDown: true,
  },
  {
    title: '取引でトラブルが発生しました。どこに相談すれば良いですか？',
    content: '当人で解決できないトラブルが発生してしまった場合は、「お問い合わせ」よりモノオク問題解決センターまでご依頼ください。',
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
