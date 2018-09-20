import React, { Fragment } from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import DefaultContainer from 'components/atomic/containers/DefaultContainer';
import Footer from 'components/atomic/LV2/Footer';

import mainVisual from 'images/about_main_visual@2x.jpg';
import mainVisualSP from 'images/about_main_visual_sp@2x.jpg';
import useImage1 from 'images/about_use1@2x.jpg';
import useImage2 from 'images/about_use2@2x.jpg';
import useImage3 from 'images/about_use3@2x.jpg';
import useImage4 from 'images/about_use4@2x.jpg';
import useImage5 from 'images/about_use5@2x.jpg';
import useImage6 from 'images/about_use6@2x.jpg';

const SubTitle = styled.div`
  font-size: ${FontSizes.large}px;
  line-height: ${FontSizes.large * 1.5}px;
  margin-bottom: 45px;
  ${media.phone`
    font-size: 6vw;
    line-height: 9vw;
    text-align: center;
    margin-bottom: 20px;
  `};
`;

const Text = styled.div`
  font-size: ${FontSizes.medium}px;
  line-height: ${FontSizes.medium * 2}px;
`;

const Hr = styled.hr`
  border: 0;
  height: 1px;
  width: 100%;
  background-color: ${Colors.borderGray};
  margin: 50px 0;
  ${media.phone`
    margin: 20px 0;
  `};
`;

const MainContainer = styled.div`
  min-width: ${Dimens.fixedWidthPc + 32}px;
  ${media.phone`
    min-width: auto;
  `};
`;

const TopContainer = styled.div`
  height: 500px;
  background-image: url(${mainVisual});
  background-size: cover;
  color: ${Colors.white};
  text-align: center;
  ${media.phone`
    height: 100%;
    background-position: 60% 0;
    background-image: url(${mainVisualSP});
  `};
`;

const TopTransparency = styled.div`
  height: 500px;
  padding: 100px 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${media.phone`
    padding: 40px 8vw 80px;
  `};
`;

const TopTitle = styled.div`
  font-size: ${FontSizes.xlarge}px;
  line-height: ${FontSizes.xlarge * 1.5}px;
  margin-bottom: 20px;
  ${media.phone`
    font-size: 8vw;
    line-height: 16vw;
  `};
`;

const TopText = styled.div`
  font-size: ${FontSizes.medium3}px;
  line-height: ${FontSizes.medium3 * 1.75}px;
  margin-bottom: 30px;
  width: 480px;
  ${media.phone`
    font-size: 5vw;
    line-height: 10vw;
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
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    font-size: ${FontSizes.medium}px;
    margin-right: 10px;
  }
  height: 40px;
  width: 212px;
  border-radius: 2px;
  background-color: ${Colors.brandTerciary};
  font-size: ${FontSizes.medium}px;
  line-height: 40px;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  ${media.phone`
    width: 100%;
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
  const ContentContainer = styled.div`
    width: 330px;
    margin-bottom: 20px;
  `;
  const ContentImage = styled.img`
    width: 100%;
    margin-bottom: 10px;
  `;
  return (
    <ContentContainer>
      <ContentImage src={props.image} />
      <Text>{props.text}</Text>
    </ContentContainer>
  );
};

const HowIFindContainer = DefaultContainer.extend``;

const IfIFindContainer = DefaultContainer.extend``;

const IfIFindContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const IfIFindContent = props => {
  const ContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 524px;
    margin-bottom: 20px;
    ${media.phone`
      width: 100%;
      flex-direction: column;
      align-items: center;
    `};
  `;

  const Oval = styled.div`
    height: 100px;
    width: 100px;
    border: 2px solid ${Colors.brandPrimary};
    border-radius: 50%;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
    text-align: center;
    color: ${Colors.brandPrimary};
    padding: 30px 0;
    margin-right: 20px;
    box-sizing: border-box;
    ${media.phone`
      margin: 0 0 10px;
    `};
  `;

  const LabelNumber = styled.div`
    font-size: ${FontSizes.xsmall}px;
    font-weight: bold;
    margin-bottom: 10px;
  `;

  const LabelText = styled.div`
    font-size: ${FontSizes.medium}px;
    font-weight: bold;
  `;

  const IfIFindContentText = Text.extend`
    width: 374px;
    margin-right: 30px;
    ${media.phone`
      width: 100%;
      margin-right: 0;
    `};
  `;

  return (
    <ContentContainer>
      <Oval>
        <LabelNumber>
          Step.
          {props.number}
        </LabelNumber>
        <LabelText>{props.label}</LabelText>
      </Oval>
      <IfIFindContentText>{props.text}</IfIFindContentText>
    </ContentContainer>
  );
};

const HotToPayContainer = DefaultContainer.extend``;

const List = styled.ul`
  margin: ${Dimens.medium}px 0;
  list-style-type: disc;
  list-style-position: inside;
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
            {['安心の料金', '面倒な手続きが不要', '拠点数が多い', '1ヶ月だけでもOK'].map((v, i) => {
              return <TopLabel key={i}>{v}</TopLabel>;
            })}
          </TopLabelWrapper>
        </TopTransparency>
      </TopContainer>

      <WhenIUseContainer>
        <SubTitle>こんな時にモノオクを使おう！</SubTitle>
        <WhenIUseContentWrapper>
          {[
            {
              image: useImage1,
              text: '引越しで一時的に荷物を置きたい。',
            },
            {
              image: useImage2,
              text: '自宅リフォーム中の家具を置く場所がない。',
            },
            {
              image: useImage3,
              text: '出張・転勤・留学で荷物の保管をしたい。',
            },
            {
              image: useImage4,
              text: '仕事場をもっと広く使いたい。',
            },
            {
              image: useImage5,
              text: 'トランクルームの代わりに。',
            },
            {
              image: useImage6,
              text: '生活空間を広げるため。',
            },
          ].map((v, i) => {
            return <WhenIUseContent key={i} image={v.image} text={v.text} />;
          })}
        </WhenIUseContentWrapper>

        <Hr />
      </WhenIUseContainer>

      <HowIFindContainer>
        <SubTitle>物置きスペースの探し方。</SubTitle>
        <Text>
          お住まいの地域・引っ越し予定エリアなどを入力するだけです。あなたにとって便利な物置きスペースを探しましょう！
        </Text>

        <Hr />
      </HowIFindContainer>

      <IfIFindContainer>
        <SubTitle>物置きスペースが見つかったら。</SubTitle>
        <IfIFindContentWrapper>
          {[
            {
              label: '相談',
              text:
                'スペースが見つかったら、まずはホストに内容と期間をメッセージで相談。事前におおよその料金目安がわかるので気軽に連絡してみましょう。',
            },
            {
              label: '見積もり',
              text: 'あなたの荷物内容と利用期間に応じて、ホストから見積もりが送られてきます。',
            },
            {
              label: 'お支払い',
              text:
                '提示された見積もりに納得したらお支払いへ進みます。ホストが困らないように支払い前までに荷物の詳細はすべて伝えておきましょう。',
            },
            {
              label: '取引成立',
              text:
                'お支払いが完了したら取り引き成立です！直前に慌ただしくならないように荷物の準備はお早めに。',
            },
            {
              label: '利用開始',
              text:
                'ホストのスペースへ荷物を置かせてもらいます。事前に連絡がない荷物は受けてもらえないこともあるので約束通り誠実な対応を。',
            },
            {
              label: '利用終了',
              text:
                'スペース利用終了日はお忘れなく！無断での延長・あなたと連絡がとれない時は、規約に基づいた対応やペナルティ料金が発生する場合があります。',
            },
            // {
            //   label: 'レビュー',
            //   text: '親切に預かってくれたホストに感謝の気持ちをこめてレビューを送りましょう！',
            // },
          ].map((v, i) => {
            return <IfIFindContent key={i} number={i + 1} label={v.label} text={v.text} />;
          })}
        </IfIFindContentWrapper>

        <Hr />
      </IfIFindContainer>

      <HotToPayContainer>
        <SubTitle>お支払い方法の追加</SubTitle>
        <Text>
          <p>現在はクレジットカード決済・銀行振り込み*に対応しております。</p>
          <p>取引成立時のお支払いに使用可能なクレジットカードは下記となります。</p>
          <List>
            <li>VISA</li>
            <li>MasterCard</li>
            {/*<li>JCB</li>*/}
            {/*<li>Diners Club</li>*/}
            {/*<li>American Express</li>*/}
          </List>
          <p>
            *銀行振り込みをご希望の場合は、ホストの発行する見積もりを確認した後にinfo@monooq.comまでご連絡ください。
          </p>
        </Text>
        <Hr />
      </HotToPayContainer>

      <NeedToHelpContainer>
        <SubTitle>お困りの際はモノオクカスタマーサポートまで。</SubTitle>
        <Text>
          「こんな場合はどうするの？」「ホスト登録について教えて！」お困りの時は画面右下のボタンよりご連絡ください。
        </Text>
      </NeedToHelpContainer>
    </MainContainer>
    <Footer />
  </Fragment>
);
