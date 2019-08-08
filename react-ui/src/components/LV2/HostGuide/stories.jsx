// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import HostGuide from './index';

HostGuide.displayName = 'HostGuide';

storiesOf('Molecules(LV2)/HostGuide', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      灰色背景の文字コンテンツ（スペース登録・編集完了画面で使用）
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <HostGuide
        header="ご成約までの流れ"
        data1="リクエストが届いてから24時間以内に返信しましょう。 早めに返信した方が、成約率が高くなります！"
        data2="荷物の内容や量・利用期間などユーザーの要望を確認し、 引き受けられる場合は見積もりを提出しましょう。"
        data3="ユーザーからの決済が完了すると取引が成立し、スペースの住所がメッセージルームに公開されます。 利用開始日になったら荷物を受け取りましょう。"
      />
    </div>
  )),
);
