import React, { Fragment } from 'react';

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

const HilightText = styled.div`
  font-size: 22px;
  line-height: 32px;
  margin-bottom: 21px;
`;

const Hr = styled.hr`
  border: 0;
  height: 1px;
  width: 100%;
  background-color: #DBDBDB;
  margin: 50px 0;
  ${media.phone`
    margin: 20px 0;
  `};
`;

const MainTitleContainer = DefaultContainer.extend`
  margin-top: 80px;
  ${media.phone`
    margin-top: 40px;
  `};
`;

const AboutCancellContainer = DefaultContainer.extend`
`;

const AboutCancellHilightText = HilightText.extend`
  margin-bottom: 50px;
`;

const AboutCancellContentWrapper = styled.div`
  margin-bottom: 30px;
`;

const AboutCancellContent = (props) => {
  const Header = styled.div`
    width: 178.22px;
    font-weight: bold;
    margin-right: 20px;
    ${media.phone`
      width: 100%;
    `};
  `;
  const Data = styled.div`
    ${media.phone`
      line-height: 30px;
    `};
  `;
  return (
    <div className={props.className}>
      <Header>{props.header}</Header>
      <Data>{props.data}</Data>
    </div>
  );
}

const StyledAboutCancellContent = styled(AboutCancellContent)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  line-height: 60px;
  font-size: 14px;
  padding: 0 20px;
  border-right: 1px solid #DBDBDB;
  border-left: 1px solid #DBDBDB;
  border-bottom: 1px solid #DBDBDB;
  :nth-child(odd){
      background-color: #F9FAFB;
  }
  :first-child{
    border-top: 1px solid #DBDBDB;
  }
`;

const NoticeWrapper = styled.div`
  margin-bottom: 30px;
`;

const AboutCancellExampleWrapper = styled.div`
  padding: 30px;
  border: 1px solid #D6D6D6;
  border-radius: 7px;
`;

const ExampleText = styled.div`
  font-size: 14px;
  line-height: 28px;
  width: 50%;
`;

const FlexWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const AboutCancellHostContainer = DefaultContainer.extend`
  margin-bottom: 80px;
`;

export default () => (
  <Fragment>
    <MainTitleContainer>
      <MainTitle>キャンセルポリシー</MainTitle>
      <HilightText>キャンセルポリシーとは、モノオクが定める取引成立後のキャンセルに発生する手数料やご注意事項です。見積もりを送る前・お支払いの前に必ずご確認ください。</HilightText>

      <Hr />
    </MainTitleContainer>

    <AboutCancellContainer>
      <MainTitle>荷物を預ける方のキャンセルについて</MainTitle>
      <AboutCancellHilightText>ホストはあなたのために荷物スペースや搬入の準備を整えてくれています。準備や確認不足による直前のキャンセルはとても迷惑です。ホストと契約した日程の15日前からキャンセル手数料が発生します。</AboutCancellHilightText>

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
        ].map((v,i)=>{
          return (
            <StyledAboutCancellContent
              header={v.header}
              data={v.data}
              key={i}
            />
          );
        })}
      </AboutCancellContentWrapper>
      <NoticeWrapper>
        <Text>
          ※連絡がつかないなど、無断でのキャンセルも利用開始日以降の返金はありません。<br />
          ※取引成立日が利用開始日まで15日を切っている場合も、同様のキャンセル手数料が発生します。<br />
          ※現在はサービス利用手数料0%のキャンペーン中となります。キャンペーンが終了し次第、手数料を差し引いた料金を返金いたします。
        </Text>
      </NoticeWrapper>

      <AboutCancellExampleWrapper>
        <Text>支払い金額が20,000円の場合のキャンセル例</Text>
        <FlexWrapper>
          <ExampleText>開始日の15日前(00:00以降)のキャンセル<br />20000×0.75=15000円を返金</ExampleText>
          <ExampleText>開始日の7日前(00:00以降)のキャンセル<br />20000×0.5=10000円を返金</ExampleText>
        </FlexWrapper>
      </AboutCancellExampleWrapper>

      <Hr />
    </AboutCancellContainer>


    <AboutCancellHostContainer>
      <MainTitle>ホストのキャンセルについて</MainTitle>
      <AboutCancellHilightText>取引成立後にホスト都合のキャンセルがあると、ユーザーの予定が立たたなくなり、あなたにもサービスの信頼にも影響が出ます。スペースのキャンセルを行う場合は下記のペナルティが発生します。</AboutCancellHilightText>

      <AboutCancellContentWrapper>
        {[
          {
            header: 'マイナスレビューの投稿',
            data: 'ホスト都合によるキャンセルはシステムにより自動的にマイナスのレビューが付きます。',
          },
          {
            header: 'ユーザーによるレビュー',
            data: 'ユーザーからレビュー投稿があります。',
          },
          {
            header: 'アカウント停止',
            data: '1年間の間に3回以上キャンセルすると、スペース掲載が無効・アカウント停止などの対応をします。',
          },
        ].map((v,i)=>{
          return (
            <StyledAboutCancellContent
              header={v.header}
              data={v.data}
              key={i}
            />
          );
        })}
      </AboutCancellContentWrapper>
      <NoticeWrapper>
        <Text>
          避けられない事故や緊急な事情により、やむを得ずキャンセルしなければならない場合が発生することもあるかと思います。モノオクがホストのキャンセル理由が酌量すべき事情と判断した場合には、上記のペナルティを免除する配慮を行っています。キャンセルをしなくてはならない場合は、すみやかにユーザーに事情を連絡してください。その上でモノオクカスタマーサポートまでスペースや荷物の状況をご連絡くださいませ。
        </Text>
      </NoticeWrapper>

    </AboutCancellHostContainer>

    <Footer />
  </Fragment>
);
