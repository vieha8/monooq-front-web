import React, { Fragment } from 'react';
import Path from 'config/path';

import styled from 'styled-components';
import { Dimens, Colors } from 'variables';
import Link from 'next/link';
import PageDefault from 'components/LV1/PageDefault';
import Text from 'components/LV1/Texts/TextStatic';
import MainTitlePage from 'components/LV2/Texts/MainTitleStatic';
import ContentAsct from 'components/LV2/Texts/ContentAsct';

const Wrapper = styled.div`
  margin-bottom: ${Dimens.medium3_40}px;
`;

const LinkText = styled(Link)`
  color: ${Colors.linkBlue};
`;

export default () => (
  <PageDefault>
    <Wrapper>
      <MainTitlePage mainTitle="特定商取引に関する表記" />
      <ContentAsct
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
            data: (
              <LinkText href={Path.top()}>
                <a>https://monooq.com/</a>
              </LinkText>
            ),
          },
          {
            header: 'メールアドレス',
            data: 'info＠monooq.com',
          },
          {
            header: '所在地',
            data: '〒150-0002 東京都渋谷区渋谷 2-6-6-301',
          },
          {
            header: '電話番号',
            data: '03-6869-2729',
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
            data:
              '利用期間の開始日までにお支払いいただきます。お支払いの完了をもって、スペース利用契約の成立とします。',
          },
          {
            header: '商品代金以外に必要な費用',
            data: '輸送費（必要な場合のみ）',
          },
          {
            header: '返品・交換について',
            data: (
              <Fragment>
                モノオクの定める
                <LinkText href={Path.cancelPolicy()}>
                  <a>キャンセルポリシー</a>
                </LinkText>
                がございます。お支払い前に必ずお読みください。
              </Fragment>
            ),
          },
        ]}
      />
    </Wrapper>
    <Wrapper>
      <Text>※取引やサービスについてのお問い合わせは電話では受け付けておりません。</Text>
      <Text>
        利用に関するお問い合わせは、ログイン後のメニュー「お問い合わせ」よりご連絡ください。
      </Text>
    </Wrapper>
  </PageDefault>
);
