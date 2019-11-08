import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import insuranceImage1 from 'images/insurance-img01.svg';
import insuranceImage2 from 'images/insurance-img02.svg';
import insuranceImage3 from 'images/insurance-img03.svg';

import HowSafeList from './index';

HowSafeList.displayName = 'HowSafeList';

storiesOf('Molecules(LV2)/Lists/HowSafeList', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      安心取引リスト
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <HowSafeList
        list={[
          {
            image: insuranceImage1,
            label: 'ユーザーは何をすれば良い？',
            text:
              'しっかりと荷物の内容と写真をメッセージに残しましょう。何かが起こった場合にスムーズな対応を行うためです。もし事前に連絡をしていない荷物はホストに受け入れを断られてしまったり、保証の対象となりません。',
          },
          {
            image: insuranceImage2,
            label: 'ホストは何をすれば良い？',
            text:
              '荷物の受け取りが完了したら、すべての荷物とスペース状況を写真に残しましょう。そして相手にメッセージで送信してください。もしも何かが起こった際に、発生した時期や内容を特定する参考として必要です。',
          },
          {
            image: insuranceImage3,
            label: '気持ちの良い取引をするには？',
            text:
              'ユーザーもホストも荷物の内容やスペースに関して、事前にしっかりと確認しましょう。当日になって「思っていたのと内容が違う」なんてことはトラブルの原因です。お互いが気持ち良くサービスを使えるようなコミュニケーションを。',
          },
        ]}
      />
    </div>
  )),
);
