// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Collapsible from 'react-collapsible';
import ContainerDefault from 'components/LV1/ContainerDefault';
import Footer from 'components/LV2/Footer';
import WhenIUseList from 'components/LV2/Lists/WhenIUseList';
import WhenIUseCardList from 'components/LV2/Lists/WhenIUseCardList';
import moneyMetapher from 'images/money_metapher@2x.png';
import scheduleMetapher from 'images/schedule_metapher@2x.png';
import timeMetapher from 'images/time_metapher@2x.png';
import beginner from 'images/beginner@2x.png';
import guarantee from 'images/guarantee@2x.png';
import ruleManner from 'images/rule_manner@2x.png';
import howtouseEyeCatch from 'images/about_eye_catch@2x.png';

const TopWrapper = styled.div`
  position: relative;
  top: -84px;
  height: 620px;
  color: ${Colors.black};
  margin-bottom: 16px;
  &:after {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 70%;
    height: 325px
    background: ${Colors.lightGray1Bg};
    z-index: -2;
  }
  ${media.phone`
    top: -54px;
    width: 100%;
    height: 410px;
    margin-bottom: 0;
    &:after {
      content: '';
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 200px;
    }
  `};
`;

const TopEyeCatch = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 70%;
  z-index: -1;
  ${media.phone`
    width: 100%;
  `};
`;

const TopMessageContent = styled.div`
  position: absolute;
  top: 210px;
  right: 50%;
  height: 311px;
  width: 549px;
  padding: 56px 30px 40px 30px;
  background-color: ${Colors.white};
  ${media.phone`
    top: 181px;
    left: 5%;
    width: 90%;
    height: initial;
    text-align: center;
    padding: 24px;
  `};
`;

const TopSubTitle = styled.div`
  color: ${Colors.brandPrimary};
  font-size: ${FontSizes.medium_18}px;
  line-height: 27px;
  margin-bottom: 8px;
  ${media.phone`
    font-size: ${FontSizes.small}px;
    line-height: 24px;
  `}
`;

const TopTitle = styled.div`
  font-size: 40px;
  line-height: 48px;
  margin-bottom: 12px;
  ${media.phone`
    font-size: ${FontSizes.medium2}px;
    line-height: 32px;
  `}
`;

const TopDescription = styled.div`
  font-size: ${FontSizes.medium}px;
  line-height: 24px;
  ${media.phone`
    font-size: ${FontSizes.small_12}px;
    line-height: 20px;
  `}
`;

const AttentionWord = styled.div`
  font-size: ${FontSizes.medium_18}px;
  color: ${Colors.brandPrimary};
  margin-bottom: 12px;
`;

const SubTitle = styled.div`
  font-size: ${FontSizes.xxlarge}px;
  line-height: ${FontSizes.xxlarge * 1.5}px;
  margin-bottom: 45px;
  ${media.phone`
    font-size: 6vw;
    line-height: 9vw;
    text-align: center;
    margin-bottom: 20px;
  `};
`;

const MainContainer = styled.div`
  min-width: ${Dimens.fixedWidthPc + 32}px;
  ${media.phone`
    min-width: auto;
  `};
`;

const WhenIUseContainer = styled(ContainerDefault)`
  padding-top: 50px;
  text-align: center;
`;

const WhenIUseContent = styled.div`
  margin-bottom: 124px;
  ${media.phone`
    margin-bottom: 32px;
  `};
`;

const ContentContainer = styled(ContainerDefault)`
  ${props =>
    props.bottom &&
    `
    margin-bottom: 164px;
    `};
  ${media.phone`
    ${props =>
      props.bottom &&
      `
      margin-bottom: ${Dimens.large4_80}px;
      `};
  `};
`;

const ConceptVideo = styled.iframe`
  margin-bottom: 72px;
`;

const QuestionsContainer = styled.div`
  text-align: center;
`;

const QuestionRow = styled.div`
  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

const QuestionItem = styled.div`
  float: left;
  width: 48%;
  padding: 8px;
  ${media.phone`
    width: 100%;
    padding: 0px;
    margin-bottom: 12px;
  `};
`;

const Answer = styled.div``;

const HeaderContainer = ({ title, subtitle, description, eyeCatchImage }: HeaderPropTypes) => (
  <TopWrapper>
    <TopEyeCatch src={eyeCatchImage} />
    <TopMessageContent>
      <TopSubTitle>{subtitle}</TopSubTitle>
      <TopTitle>{title}</TopTitle>
      <TopDescription>{description}</TopDescription>
    </TopMessageContent>
  </TopWrapper>
);

export default () => (
  <Fragment>
    <MainContainer>
      <HeaderContainer
        title="スキマ空間を活用する　　スペースシェアサービス"
        subtitle="モノオクとは？"
        description="「手頃な物置がない。来月には引越しなのに...」 モノオクは、置き場所に困った荷物と持て余した空き部屋を繋ぐスペースシェアサービスです。"
        eyeCatchImage={howtouseEyeCatch}
      />

      <WhenIUseContainer>
        <WhenIUseContent>
          <AttentionWord>「荷物の置き場所に困った…」を解決！</AttentionWord>
          <SubTitle>こんなときにはモノオク！</SubTitle>
          <WhenIUseList
            list={[
              {
                image: moneyMetapher,
                title: '手頃な価格で荷物を置きたい',
                text:
                  '費用はホストから提示される料金だけ。余計な出費なしで荷物を置くことができます。※配送は別途',
              },
              {
                image: scheduleMetapher,
                title: '利用期間はまだ未定',
                text:
                  '１ヶ月、半年、１年でも。ホストとの相談次第で、利用期間の延長も柔軟に対応できます。',
              },
              {
                image: timeMetapher,
                title: '緊急で今すぐ物置が必要',
                text:
                  '急な引っ越しや用事など、できるだけすぐに物を置く場所が必要になったような緊急時にも。',
              },
            ]}
          />
        </WhenIUseContent>
        <WhenIUseContent>
          <AttentionWord>モノオクのことをもっと詳しく</AttentionWord>
          <SubTitle>ご利用にあたって</SubTitle>
          <WhenIUseCardList
            list={[
              {
                image: beginner,
                subTitle: 'モノオクを利用する前に',
                title: '初めてのご利用ガイド',
                text:
                  '「モノオクの利用が初めてで使い方がよく分からない...」そんな初めての方に、使い方とかんたんな利用の流れをご紹介。',
                buttonText: '初めてのご利用ガイド',
                buttonLink: '/howtouse',
              },
              {
                image: guarantee,
                subTitle: '荷物の紛失・破損時に',
                title: 'モノオクあんしん補償',
                text:
                  '取引が確認できるお荷物に対して最大10万円までの補償が適応できます。ホスト時にも同様の補償が適応されるのでご安心ください。',
                buttonText: 'モノオクあんしん補償について',
                buttonLink: '/insurance',
              },
              {
                image: ruleManner,
                subTitle: 'より快適にご利用いただくために',
                title: 'ルールとマナー',
                text:
                  'モノオクは個人間の取引で成立しています。誰もが気持ちよく安心して使えるよう、ルールとマナーを守ってご利用ください。',
                buttonText: 'ルールとマナーについて',
                buttonLink: '/rule',
              },
            ]}
          />
        </WhenIUseContent>
      </WhenIUseContainer>

      <ContentContainer>
        <ConceptVideo
          title="about"
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/t0t50WBDwzc"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </ContentContainer>

      <ContentContainer>
        <QuestionsContainer>
          <AttentionWord>困った時にはFAQ</AttentionWord>
          <SubTitle>よくある質問</SubTitle>
          <QuestionRow>
            <QuestionItem>
              <Collapsible trigger="Q. 初期費用はかかりますか？">
                <Answer>blablabla</Answer>
              </Collapsible>
            </QuestionItem>
            <QuestionItem>
              <Collapsible trigger="Q. 国内のどこでも利用できますか？">
                <Answer>blablabla</Answer>
              </Collapsible>
            </QuestionItem>
          </QuestionRow>
          <QuestionRow>
            <QuestionItem>
              <Collapsible trigger="Q. 補償の適応条件はありますか？">
                <Answer>blablabla</Answer>
              </Collapsible>
            </QuestionItem>
            <QuestionItem>
              <Collapsible trigger="Q. 支払い方法は？">
                <Answer>blablabla</Answer>
              </Collapsible>
            </QuestionItem>
          </QuestionRow>
          <QuestionRow>
            <QuestionItem>
              <Collapsible trigger="Q. 預けられないものはありますか？">
                <Answer>blablabla</Answer>
              </Collapsible>
            </QuestionItem>
            <QuestionItem>
              <Collapsible trigger="Q. 配送の手配はどうしたらいいですか？">
                <Answer>blablabla</Answer>
              </Collapsible>
            </QuestionItem>
          </QuestionRow>
        </QuestionsContainer>
      </ContentContainer>
    </MainContainer>

    <Footer />
  </Fragment>
);
