// @flow

import React from 'react';
import Template from './Template';

const QandA = [
  {
    title: 'モノオクのホストになる方法は？',
    content: 'アカウント登録後にメニュー「ホストになる」より、掲載するスペース登録を行ってください。',
    circleDown: true,
    anchor: 'common2',
  },
  {
    title: '私もモノオクのホストになれますか？',
    content: 'はい、もちろんです！モノオクは誰でも気軽にできる物置きのシェアリングエコノミーサービスです。余ったスペースさえあればどなたでも始めることができます。',
    circleDown: true,
  },
  {
    title: 'ホストも他のスペース利用をすることはできますか？',
    content: 'はい、もちろんです！あなた自身が荷物にお困りの時もモノオクでスペース利用が可能です。',
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
    headline="ホストについて"
    qa={QandA}
    openFlagList={props.openFlagList}
    onClickList={props.onClickList}
    onClickBack={props.onClickBack}
  />
);
