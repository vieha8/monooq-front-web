// @flow

import React from 'react';
import Path from 'config/path';
import { storiesOf } from '@storybook/react';
import StorybookRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import AsctContent from './index';

AsctContent.displayName = 'AsctContent';

storiesOf('Molecules(LV2)/AsctContent', module)
  .addDecorator(StorybookRouter())
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      特商取引に関する表記一覧(静的画面向け)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <AsctContent
          asctList={[
            {
              header: '提供事業者',
              data: 'モノオク株式会社',
            },
            {
              header: '運営責任者',
              data: '阿部　祐一',
            },
            {
              header: 'ホームページ',
              data: `<a href=${Path.top()}>https://monooq.com/</a>`,
            },
            {
              header: 'メールアドレス',
              data: 'info＠monooq.com',
            },
            {
              header: '所在地',
              data: '〒166-0003 東京都杉並区高円寺南 2-48-12 1F',
            },
            {
              header: '電話番号',
              data: '03‑1819‑2729',
            },
            {
              header: '販売価格帯',
              data:
                'ホストの提示する見積もりにて表示する価格（サービス利用手数料を含む）となります。',
            },
            {
              header: '商品の引き渡し時期',
              data: '決済完了後、ホストと同意を得た利用開始日よりご利用頂けます。',
            },
            {
              header: '代金の支払方法',
              data: 'クレジットカード',
            },
            {
              header: '代金の支払時期',
              data: 'ホストの見積もり提示より24時間以内にお支払いいただきます。',
            },
            {
              header: '商品代金以外に必要な費用',
              data: '輸送費（必要な場合のみ）',
            },
            {
              header: '返品・交換について',
              data: `モノオクの定める<a href=${Path.cancellationPolicies()}>キャンセルポリシー</a>がございます。お支払い前に必ずお読みください。`,
            },
          ]}
        />
      </div>
    )),
  );
