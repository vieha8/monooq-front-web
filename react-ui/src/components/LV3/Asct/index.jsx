import React, { Fragment } from 'react';
import Path from 'config/path';

import styled from 'styled-components';
import { Dimens, Colors } from 'variables';
import { Link } from 'react-router-dom';
import DefaultContainer from 'components/LV1/DefaultContainer';
import Text from 'components/LV1/Texts/StaticText';
import Footer from 'components/LV2/Footer';
import MainTitleContainer from 'components/LV2/StaticMainTitle';
import AsctContent from 'components/LV2/AsctContent';

const LinkText = styled(Link)`
  color: ${Colors.linkBlue};
`;

const AsctContainer = styled(DefaultContainer)`
  margin-bottom: ${Dimens.large4_80}px;
`;

const AsctContentWrapper = styled.div`
  margin-bottom: ${Dimens.medium3_40}px;
`;

export default () => (
  <Fragment>
    <MainTitleContainer mainTitle="特定商取引に関する表記" />

    <AsctContainer>
      <AsctContentWrapper>
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
              data: <LinkText to={Path.top()}>https://monooq.com/</LinkText>,
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
              data: 'クレジットカード、コンビニ払い・Pay-easy決済、銀行振込',
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
              data: (
                <Fragment>
                  モノオクの定める
                  <LinkText to={Path.cancellationPolicies()}>キャンセルポリシー</LinkText>
                  がございます。お支払い前に必ずお読みください。
                </Fragment>
              ),
            },
          ]}
        />
      </AsctContentWrapper>

      <AsctContentWrapper>
        <Text>※取引やサービスについてのお問い合わせは電話では受け付けておりません。</Text>
        <Text>
          利用に関するお問い合わせは、ログイン後のメニュー「お問い合わせ」よりご連絡ください。
        </Text>
      </AsctContentWrapper>
    </AsctContainer>
    <Footer />
  </Fragment>
);
