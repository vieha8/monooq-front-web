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
import mainVisual from 'images/about_main_visual@2x.jpg';
import mainVisualSP from 'images/about_main_visual_sp@2x.jpg';
import moneyMetapher from 'images/money_metapher@2x.png';
import scheduleMetapher from 'images/schedule_metapher@2x.png';
import timeMetapher from 'images/time_metapher@2x.png';
import beginner from 'images/beginner@2x.png';
import guarantee from 'images/guarantee@2x.png';
import ruleManner from 'images/rule_manner@2x.png';

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

const WhenIUseContainer = styled(ContainerDefault)`
  padding-top: 50px;
  text-align: center;
  ${media.phone`
    padding-top: 20px;
  `};
`;

const WhenIUseContent = styled.div`
  margin-top: 124px;
  margin-bottom: 124px;
  ${media.phone`
    margin-top: 32px;
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

export default () => (
  <Fragment>
    <MainContainer>
      <TopContainer>
        <TopTransparency>
          <TopTitle>はじめての方へ</TopTitle>
          <TopText>モノオクは空きスペースを活用する、物置きシェアサービスです。</TopText>
          <TopLabelWrapper>
            {['安心の料金', '面倒な手続きが不要', '拠点数が多い', '1ヶ月だけでもOK'].map((v, i) => (
              <TopLabel key={i.toString()}>{v}</TopLabel>
            ))}
          </TopLabelWrapper>
        </TopTransparency>
      </TopContainer>

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
