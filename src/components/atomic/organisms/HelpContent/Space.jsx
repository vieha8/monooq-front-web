// @flow

import React from 'react';
import Template from './Template';

const QandA = [
  {
    title: 'スペースの所在地はどこでも良いのですか？',
    content: 'はい、モノオクは誰でもかんたんに余ったスペースを掲載できるサービスです。東京を中心に拠点数は全国へ広がっています。',
    circleDown: true,
  },
  {
    title: 'スペースの掲載には手数料はかかりますか？',
    content: 'スペース掲載料は無料です！取引成立時のみ、ユーザーがホストへお支払いするスペース利用総額の20%をサービス手数料として頂いています。',
    circleDown: true,
  },
  {
    title: '大きなスペースが余っていますが、同時に複数の取り引きはできますか？',
    content: 'はい、可能です。あなたが管理できる範囲で複数のユーザーと取り引きができます。',
    circleDown: true,
  },
  {
    title: '大きなスペースが余っていますが、同時に複数の取り引きはできますか？',
    content: 'はい、可能です。あなたが管理できる範囲で複数のユーザーと取り引きができます。',
    circleDown: true,
  },
  {
    title: '誰でもスペースの所在地を知ることができるのですか？',
    content: 'いいえ、安心してください！あなたのスペース所在地は決済が完了した相手にしか知らされません。',
    circleDown: true,
  },
  {
    title: '保存した下書きを編集するにはどうしたら良いですか？',
    content: '「スペースの管理」ページより該当するスペースを編集してください。',
    circleDown: true,
  },
  {
    title: 'スペースは何箇所でも登録できますか？',
    content: 'はい。余ったスペースがあれば複数のスペース登録が可能です。',
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
    headline="スペース登録について"
    qa={QandA}
    openFlagList={props.openFlagList}
    onClickList={props.onClickList}
    onClickBack={props.onClickBack}
  />
);
