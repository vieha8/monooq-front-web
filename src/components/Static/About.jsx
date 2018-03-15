import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Footer } from 'components/Shared';
import { FontSizes, Colors } from 'variables';

import mainVisual from 'images/about_main_visual@2x.png';

const DefaultContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
  ${media.phone`
    padding: 0 8vw;
    width: 100vw;
  `};
`;

const SubTitle = styled.div`
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 45px;
  ${media.phone`
    font-size: 1.25em;
    line-height: 1.5em;
    text-align: center;
    margin-bottom: 20px;
  `};
`;

const Text = styled.div`
  font-size: 16px;
  line-height: 32px;
`;

const Hr = styled.hr`
  border: 0;
  height: 1px;
  width: 100%;
  background-color: #dbdbdb;
  margin: 50px 0;
  ${media.phone`
    margin: 20px 0;
  `};
`;

const MainContainer = styled.div`
  min-width: 1048px;
  ${media.phone`
    min-width: 0;
  `};
`;

const TopContainer = styled.div`
  height: 500px;
  background-image: url(${mainVisual});
  background-size: cover;
  color: #ffffff;
  text-align: center;
  ${media.phone`
    height: 100%;
    background-position: 50% 0;
  `};
`;

const TopTransparency = styled.div`
  padding: 100px 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${media.phone`
    padding: 80px 8vw;
  `};
`;

const TopTitle = styled.div`
  font-size: 34px;
  line-height: 48px;
  margin-bottom: 20px;
  ${media.phone`
    font-size: 1.5em;
    line-height: 3.0em;
    margin-bottom: 0;
  `};
`;

const TopText = styled.div`
  font-size: 28px;
  line-height: 48px;
  margin-bottom: 30px;
  width: 480px;
  ${media.phone`
    font-size: 1.0em;
    line-height: 2.0em;
    width: 84vw;
  `};
`;

const TopLabelWrapper = styled.div`
  width: 434px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${media.phone`
    width: 100%;
  `};
`;

const TopLabel = styled.div`
  :before {
    content: '\f00c';
    font-family: 'Font Awesome 5 Pro';
    font-weight: 100;
    font-size: 16px;
    margin-right: 10px;
  }
  height: 40px;
  width: 212px;
  border-radius: 2px;
  background-color: #f1979b;
  font-size: 18px;
  font-weight: bold;
  line-height: 18px;
  text-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
  padding: 9px 0 8px 0;
  margin-bottom: 10px;
  ${media.phone`
    width: 100%;
    margin-bottom: 20px;
  `};
`;

const WhenIUseContainer = DefaultContainer.extend`
  padding-top: 50px;
  ${media.phone`
    padding-top: 20px;
  `};
`;

const WhenIUseContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const WhenIUseContent = props => {
  const ContentImage = styled.img`
    width: 100%;
    height: 217px;
    margin-bottom: 7px;
  `;
  return (
    <div className={props.className}>
      <ContentImage src={props.image} />
      <Text>{props.text}</Text>
    </div>
  );
};

const StyledWhenIUseContent = styled(WhenIUseContent)`
  width: 327px;
  margin-bottom: 15px;
`;

const HowIFindContainer = DefaultContainer.extend``;

const IfIFindContainer = DefaultContainer.extend``;

const IfIFindContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const IfIFindContent = props => {
  const Oval = styled.div`
    height: 100px;
    width: 100px;
    border: 2px solid #e85258;
    border-radius: 50px;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
    text-align: center;
    color: #e85258;
    padding: 30px 0;
    margin-right: 30px;
    ${media.phone`
      margin-right: 30px;
    `};
  `;

  const LabelNumber = styled.div`
    font-size: 12px;
    font-weight: bold;
    line-height: 12px;
    text-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 5px;
  `;

  const LabelText = styled.div`
    font-size: 16px;
    font-weight: bold;
    line-height: 16px;
    text-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
  `;

  const IfIFindContentText = Text.extend`
    ${media.phone`
      width: 50%;
    `};
  `;

  return (
    <div className={props.className}>
      <Oval>
        <LabelNumber>Step.{props.number}</LabelNumber>
        <LabelText>{props.label}</LabelText>
      </Oval>
      <IfIFindContentText>{props.text}</IfIFindContentText>
    </div>
  );
};

const StyledIfIFindContent = styled(IfIFindContent)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 500px;
  margin-bottom: 20px;
  ${media.phone`
    width: 100%;
  `};
`;

const NeedToHelpContainer = DefaultContainer.extend`
  margin-bottom: 164px;
  ${media.phone`
    margin-bottom: 80px;
  `};
`;

export default props => (
  <Fragment>
    <MainContainer>
      <TopContainer>
        <TopTransparency>
          <TopTitle>はじめての方へ</TopTitle>
          <TopText>モノオクは空きスペースを活用する、物置きシェアサービスです。</TopText>
          <TopLabelWrapper>
            {['安心の料金', '面倒な手続きが不要', '拠点数が多い', '1ヶ月だけでもOK'].map(v => {
              return <TopLabel>{v}</TopLabel>;
            })}
          </TopLabelWrapper>
        </TopTransparency>
      </TopContainer>

      <WhenIUseContainer>
        <SubTitle>こんな時にモノオクを使おう！</SubTitle>
        <WhenIUseContentWrapper>
          {[
            {
              image: 'https://picsum.photos/600?image=45',
              text: '引越しで一時的に荷物を置きたい。',
            },
            {
              image: 'https://picsum.photos/600?image=55',
              text: '自宅リフォーム中の家具を置く場所がない。',
            },
            {
              image: 'https://picsum.photos/600?image=60',
              text: '引越しで一時的に荷物を置きたい。',
            },
            {
              image: 'https://picsum.photos/600?image=70',
              text: '引越しで一時的に荷物を置きたい。',
            },
            {
              image: 'https://picsum.photos/600?image=80',
              text: 'トランクルームの代わりに。',
            },
            {
              image: 'https://picsum.photos/600?image=90',
              text: '引越しで一時的に荷物を置きたい。',
            },
          ].map(v => {
            return <StyledWhenIUseContent image={v.image} text={v.text} />;
          })}
        </WhenIUseContentWrapper>

        <Hr />
      </WhenIUseContainer>

      <HowIFindContainer>
        <SubTitle>物置きスペースの探し方。</SubTitle>
        <Text>お住まいの地域・引っ越し予定エリア・・・</Text>

        <Hr />
      </HowIFindContainer>

      <IfIFindContainer>
        <SubTitle>物置きスペースが見つかったら。</SubTitle>
        <IfIFindContentWrapper>
          {[
            {
              label: '相談',
              text: 'スペースがみつかったら・・・。',
            },
            {
              label: '見積もり',
              text: 'スペースがみつかったら・・・。',
            },
            {
              label: 'お支払い',
              text: 'スペースがみつかったら・・・。',
            },
            {
              label: '取引成立',
              text: 'スペースがみつかったら・・・。',
            },
            {
              label: '利用開始',
              text: 'スペースがみつかったら・・・。',
            },
            {
              label: '利用終了',
              text: 'スペースがみつかったら・・・。',
            },
            {
              label: 'レビュー',
              text: 'スペースがみつかったら・・・。',
            },
          ].map((v, i) => {
            return <StyledIfIFindContent number={i + 1} label={v.label} text={v.text} />;
          })}
        </IfIFindContentWrapper>

        <Hr />
      </IfIFindContainer>

      <NeedToHelpContainer>
        <SubTitle>お困りの際はモノオクカスタマーサポートまで。</SubTitle>
        <Text>
          「こんな場合はどうするの？」「ホスト登録について教えて！」お困りの時はヘルプチャットや専用の問い合わせフォームよりご連絡ください。
        </Text>
      </NeedToHelpContainer>
    </MainContainer>
    <Footer />
  </Fragment>
);
