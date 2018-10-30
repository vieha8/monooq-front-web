import React, { Fragment } from 'react';

import styled from 'styled-components';
import { FontSizes, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import DefaultContainer from 'components/atomic/containers/DefaultContainer';
import Footer from 'components/atomic/LV2/Footer';

const MainTitle = styled.div`
  font-size: ${FontSizes.xlarge}px;
  line-height: ${FontSizes.xlarge * 1.5}px;
  margin-bottom: 40px;
  ${media.phone`
    font-size: 7.5vw;
    line-height: ${7.5 * 1.5}vw;
    margin-bottom: 20px;
  `};
`;

const Text = styled.div`
  font-size: ${FontSizes.medium}px;
  line-height: ${FontSizes.medium * 2}px;
  ${media.phone`
    font-size: 5vw;
    line-height: 7.5vw;
  `};
`;

const HilightText = styled.div`
  font-size: ${FontSizes.medium1}px;
  line-height: ${FontSizes.medium1 * 1.5}px;
  margin-bottom: 20px;
  ${media.phone`
    font-size: 5vw;
    line-height: 7.5vw;
  `};
`;

const Hr = styled.hr`
  border: 0;
  height: 1px;
  width: 100%;
  background-color: ${Colors.lightGray2};
  margin: 50px 0;
  ${media.phone`
    margin: 20px 0;
  `};
`;

const MainTitleContainer = styled(DefaultContainer)`
  margin-top: 80px;
  ${media.phone`
    margin-top: 40px;
  `};
`;

const AboutCancellContainer = styled(DefaultContainer)``;

const AboutCancellHilightText = styled(HilightText)`
  margin-bottom: 50px;
`;

const AboutCancellContentWrapper = styled.div`
  margin-bottom: 30px;
`;

const AboutCancellContent = props => {
  const ContentContainer = styled.div`
    width: 100%;
    display: table;
    font-size: ${FontSizes.small}px;
    padding: 20px;
    border-right: 1px solid ${Colors.borderGray};
    border-left: 1px solid ${Colors.borderGray};
    border-bottom: 1px solid ${Colors.borderGray};
    box-sizing: border-box;
    :nth-child(odd) {
      background-color: ${Colors.lightGray1Bg};
    }
    :first-child {
      border-top: 1px solid ${Colors.borderGray};
    }
    ${media.phone`
      width: 84vw;
      padding: 16px;
      box-sizing: border-box;
    `};
  `;
  const Header = styled.div`
    width: 178.22px;
    font-weight: bold;
    margin-right: 20px;
    display: table-cell;
    ${media.phone`
      width: 100%;
      display: block;
      line-height: 2;
    `};
  `;
  const Data = styled.div`
    display: table-cell;
    ${media.phone`
      display: block;
      line-height: 2;
    `};
  `;
  return (
    <ContentContainer>
      <Header>{props.header}</Header>
      <Data>{props.data}</Data>
    </ContentContainer>
  );
};

const NoticeWrapper = styled.div`
  margin-bottom: 30px;
`;

const AboutCancellExampleWrapper = styled.div`
  padding: 20px;
  border: 1px solid #d6d6d6;
  border-radius: 7px;
`;

const ExampleTextContainer = styled.div`
  margin-top: 30px;
  display: table;
  width: 100%;
`;

const ExampleText = styled.div`
  display: table-cell;
  font-size: ${FontSizes.small}px;
  line-height: ${FontSizes.small * 2}px;
  width: 50%;
  ${media.tablet`
    &:not(:first-child) {
      margin-top: 16px;
    }
    display: block;
    width: 100%;
  `};
`;

const AboutCancellHostContainer = styled(DefaultContainer)`
  margin-bottom: 80px;
`;

export default () => (
  <Fragment>
    <MainTitleContainer>
      <MainTitle>キャンセルポリシー</MainTitle>
      <HilightText>
        キャンセルポリシーとは、モノオクが定める取引成立後のキャンセルに発生する手数料やご注意事項です。見積もりを送る前・お支払いの前に必ずご確認ください。
      </HilightText>
      <Hr />
    </MainTitleContainer>

    <AboutCancellContainer>
      <MainTitle>荷物を置く方のキャンセルについて</MainTitle>
      <AboutCancellHilightText>
        ホストはあなたのために荷物スペースや搬入の準備を整えてくれています。直前のキャンセルは迷惑となってしまいます。ホストと契約した日程の15日前からキャンセル手数料が発生します。
      </AboutCancellHilightText>

      <HilightText>利用開始日から</HilightText>

      <AboutCancellContentWrapper>
        {[
          {
            header: '15日前まで',
            data: '決済金額の0％（決済金額の100％を返金）',
          },
          {
            header: '15日前',
            data: '決済金額の25％（決済金額の75％を返金）',
          },
          {
            header: '7日前',
            data: '決済金額の50％（決済金額の50％を返金）',
          },
          {
            header: '利用開始日以降',
            data: '決済金額の100％（返金はありません）',
          },
        ].map((v, i) => {
          return <AboutCancellContent header={v.header} data={v.data} key={i} />;
        })}
      </AboutCancellContentWrapper>
      <NoticeWrapper>
        <Text>
          ※連絡がつかないなど、無断でのキャンセルも利用開始日以降の返金はありません。*1
          <br />
          ※取引成立日が利用開始日まで15日未満の場合も、同様のキャンセル手数料が発生します。
          <br />
          <br />
          *1
          無断でのスペース利用延長は荷物を引き取る意思がないとみなし、利用規約に基づき荷物の引き取り費用10万円（税別）と処分に要した費用全額を請求いたします。
        </Text>
      </NoticeWrapper>

      <AboutCancellExampleWrapper>
        <Text>支払い金額が20,000円の場合のキャンセル例</Text>
        <ExampleTextContainer>
          <ExampleText>
            開始日の15日前(00:00以降)のキャンセル
            <br />
            20000×0.75=15000円を返金
          </ExampleText>
          <ExampleText>
            開始日の7日前(00:00以降)のキャンセル
            <br />
            20000×0.5=10000円を返金
          </ExampleText>
        </ExampleTextContainer>
      </AboutCancellExampleWrapper>

      <Hr />
    </AboutCancellContainer>

    <AboutCancellHostContainer>
      <MainTitle>ホストのキャンセルについて</MainTitle>
      <AboutCancellHilightText>
        取引成立後にホスト都合のキャンセルがあると、ユーザーの予定が立たたなくなり、あなたにもサービスの信頼にも影響が出ます。スペースのキャンセルを行う場合は下記のペナルティが発生します。
      </AboutCancellHilightText>

      <AboutCancellContentWrapper>
        {[
          {
            header: 'アカウント停止',
            data:
              '1年間の間に3回以上キャンセルすると、スペース掲載が無効・アカウント停止などの対応をします。',
          },
        ].map((v, i) => {
          return <AboutCancellContent header={v.header} data={v.data} key={i} />;
        })}
      </AboutCancellContentWrapper>
      <NoticeWrapper>
        <Text>
          避けられない事故や緊急な事情により、やむを得ずキャンセルしなければならない場合など、モノオクがホストのキャンセル理由が酌量すべき事情と判断した場合には、上記のペナルティを免除される可能性があります。キャンセルをしなくてはならない場合は、すみやかにユーザーに事情を連絡してください。その上でモノオクカスタマーサポートまでスペースや荷物の状況をご連絡ください。
        </Text>
      </NoticeWrapper>
    </AboutCancellHostContainer>

    <Footer />
  </Fragment>
);
