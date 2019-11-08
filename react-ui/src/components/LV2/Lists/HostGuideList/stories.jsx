import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import HostGuideList from './index';

HostGuideList.displayName = 'HostGuideList';

storiesOf('Molecules(LV2)/HostGuideList', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      灰色背景の文字コンテンツ（スペース登録・編集完了画面で使用）
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <HostGuideList
        header="ご成約までの流れ"
        guideList={[
          'リクエストが届いてから24時間以内に返信しましょう。早めに返信をすると成約率が高くなります！',
          '荷物の内容や量・利用期間などゲストの要望を確認し、引き受ける場合は見積もりを提出しましょう。',
          <Fragment>
            ゲストの決済が完了すると取引が成立し、スペースの住所がメッセージページに公開されます。
            <br />
            利用開始日になったら荷物を受け取りましょう。
          </Fragment>,
        ]}
      />
    </div>
  )),
);
