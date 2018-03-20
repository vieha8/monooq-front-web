import React, { Fragment } from 'react';
import Path from 'config/path';

import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Footer } from 'components/Shared';

const DefaultContainer = styled.div`
  padding: 0 116px;
  ${media.phone`
    padding: 0 8vw;
  `};
`;

const MainTitle = styled.div`
  font-size: 34px;
  line-height: 51px;
  margin-bottom: 44px;
  ${media.phone`
    font-size: 32px;
  `};
`;

const Text = styled.div`
  font-size: 16px;
  line-height: 32px;
`;

const TextWrapper = styled.div`
  margin-bottom: 40px;
`;

const MainTitleContainer = DefaultContainer.extend`
  margin-top: 80px;
  margin-bottom: 44px;
`;

const AsctContainer = DefaultContainer.extend`
  margin-bottom: 80px;
`;

const AsctContentWrapper = styled.div`
  margin-bottom: 40px;
`;

const AsctContent = (props) => {
  const Header = styled.div`
    width: 150px;
    font-weight: bold;
    margin-right: 20px;
    line-height: 1.5;
    ${media.phone`
      width: 100%;
    `};
  `;
  const Data = styled.div`
    line-height: 1.5;
    ${media.phone`
      margin-top: 16px;
    `}
  `;
  return (
    <div className={props.className}>
      <Header>{props.header}</Header>
      <Data dangerouslySetInnerHTML={{ __html: props.data }} />
    </div>
  );
}

const StyledAsctContent = styled(AsctContent)`
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  font-size: 16px;
  border-bottom: 1px solid #DBDBDB;
`;

export default () => (
  <Fragment>
    <MainTitleContainer>
      <MainTitle>特定商取引に関する表記</MainTitle>
    </MainTitleContainer>

    <AsctContainer>
      <AsctContentWrapper>
        {[
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
            data: 'ホストの提示する見積もりにて表示する価格（サービス利用手数料を含む）となります。',
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
        ].map((v,i)=>{
          return (
            <StyledAsctContent
              key={i}
              header={v.header}
              data={v.data}
            />
          );
        })}
      </AsctContentWrapper>

      <TextWrapper>
        <Text>
          ※取引やサービスについてのお問い合わせは電話では受け付けておりません。<br />
          利用に関するお問い合わせは、ログイン後のメニュー「お問い合わせ」またはヘルプチャットよりご連絡ください。
        </Text>
      </TextWrapper>
    </AsctContainer>

    <Footer />
  </Fragment>
);
