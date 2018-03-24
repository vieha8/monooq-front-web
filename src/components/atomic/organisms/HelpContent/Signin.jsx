// @flow

import React from 'react';
import styled from 'styled-components';
import Template from './Template';

const QandA = [
  {
    title: 'アカウント登録には何が必要ですか？',
    content: 'お名前・メールアドレス（またはfacebookアカウント）・パスワード・電話番号が必要です。',
    circleDown: true,
  },
  {
    title: 'パスワードを忘れてしまいました。',
    content: 'ログイン画面の「パスワードを忘れた方はこちら」よりお手続きください。',
    circleDown: true,
  },
  {
    title: 'ログイン情報を忘れてしまいました。',
    content: 'アカウント登録を行った「お名前」をご記入の上、info@monooq.comまでご連絡ください。',
    circleDown: true,
  },
  {
    title: '電話番号は誰かに知られるのですか？',
    content: 'いいえ。アカウント登録時のご本人確認として使用するだけです。サービス上には掲載されませんのでご安心を。',
    circleDown: true,
  },
  {
    title: 'メールが届きません。',
    content: '登録・情報の変更等をした場合にモノオクからのメールが届かない場合は、主に以下の理由が考えられます。<br /><br />1. 迷惑メールフィルターにかかっている</br>ウイルス対策ソフト・プロバイダのサービスなどで迷惑メールの設定をしているとメールが届かない場合があります。迷惑メールや設定をご確認ください。<br /><br />2. ドメイン指定受信をしている<br />ドメイン指定受信をされている方は「@monooq.com」のドメインを受信できるように設定をお願いいたします。<br />',
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
    headline="登録・ログイン"
    qa={QandA}
    openFlagList={props.openFlagList}
    onClickList={props.onClickList}
    onClickBack={props.onClickBack}
  />
);
