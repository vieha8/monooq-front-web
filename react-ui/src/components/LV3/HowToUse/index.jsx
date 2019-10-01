// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import Footer from 'components/LV2/Footer';
import howtouseEyeCatch from 'images/howtouse_eye_catch@2x.png';
import howtouse01 from 'images/howtouse_01@2x.png';
import howtouse02 from 'images/howtouse_02@2x.png';
import howtouse03 from 'images/howtouse_03@2x.png';
import howtouse04 from 'images/howtouse_04@2x.png';

const TopWrapper = styled.div`
  position: relative;
  top: -84px;
  height: 600px;
  color: ${Colors.black};
  margin-bottom: 16px;
  &:after {
    content: '';
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 70%;
    height: 325px
    background: ${Colors.lightGray1Bg};
    z-index: -2;
  }
  ${media.phone`
    top: -54px;
    width: 100%;
    height: 440px;
    margin-bottom: 0;
    &:after {
      content: '';
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 104px;
    }
  `};
`;

const TopEyeCatch = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 70%;
  z-index: -1;
  ${media.phone`
    width: 100%;
  `};
`;

const TopMessageContent = styled.div`
  position: absolute;
  top: 190px;
  left: 50%;
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

const MainContainer = styled.div`
  min-width: ${Dimens.fixedWidthPc + 32}px;
  text-align: center;
  margin-bottom: 80px;
  ${media.phone`
    min-width: auto;
    margin-bottom: 48px;
  `};
`;

const Attention = styled.div`
  color: ${Colors.brandPrimary};
  font-size: ${FontSizes.medium_18}px;
  margin-bottom: 12px;
  ${media.phone`
    font-size: ${FontSizes.small}px;
    margin-bottom: 8px;
  `};
`;

const Headline = styled.div`
  font-size: 40px;
  margin-bottom: 48px;
  ${media.phone`
    font-size: ${FontSizes.medium2}px;
    margin-bottom: 44px;
  `};
`;

const HowToUseContentRow = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  &:after {
    content: '';
    position: absolute;
    bottom: 0px;
    width: 90%;
    height: 319px;
    background: ${Colors.lightGray1Bg};
  }
  &:nth-child(3):after {
    left: 0px;
  }
  &:nth-child(4):after {
    right: 0px;
  }
  ${media.phone`
    display: block;
  `};
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 523px;
  height: 422px;
  margin: ${Dimens.medium_18}px 10px;
  padding-left: 24px;
  &:nth-child(2) {
    margin-top: 64px;
  }
  ${media.phone`
    width: 100%;
    margin: initial;
    &:nth-child(2) {
      margin-top: initial;
    }
  `}
`;

const ContentImage = styled.img`
  position: absolute;
  left: 24px;
  height: 280px;
  z-index: 1;
  ${media.phone`
    width: 100%;
    height: initial;
    left: 0px;
  `}
`;

const ContentNo = styled.div`
  position: absolute;
  top: 206px;
  left: -5px;
  font-size: 100px;
  font-weight: bold;
  color: rgba(232, 82, 88, 0.9);
  z-index: 3 ${media.phone`
    font-size: 72px;
    left: 10px;
    top: 190px;
  `};
`;

const ContentText = styled.div`
  position: absolute;
  top: 252px;
  left: 40px;
  padding: 25px 36px 24px 81px;
  width: 477px;
  height: 150px;
  text-align: left;
  background-color: ${Colors.white};
  z-index: 2;
  ${media.phone`
    width: 100%;
    left: 0px;
    padding: 20px 10px;
  `}
`;

const ContentTitle = styled.div`
  font-size: ${FontSizes.medium1}px;
  color: #e85258;
  margin-bottom: 12px;
`;

const ContentDetail = styled.div`
  font-size: 14px;
`;

type HeaderPropTypes = {
  title: string,
  subtitle: string,
  description: string,
  eyeCatchImage: string,
};

type ContentPropTypes = {
  contentNo: string,
  title: string,
  detail: string,
  image: string,
};

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

const HowToUseContent = ({ contentNo, title, detail, image }: ContentPropTypes) => (
  <ContentWrapper>
    <ContentImage src={image} />
    <ContentNo>{contentNo}</ContentNo>
    <ContentText>
      <ContentTitle>{title}</ContentTitle>
      <ContentDetail>{detail}</ContentDetail>
    </ContentText>
  </ContentWrapper>
);

export default () => (
  <Fragment>
    <HeaderContainer
      title="使い方はとっても簡単！ モノオクの楽チンガイド。"
      subtitle="利用の流れ"
      description="使い方がわからない方向けのご利用ガイド。登録から搬出まで簡単4ステップでご利用できるので、急な引越しやリフォームなどにも最適です！"
      eyeCatchImage={howtouseEyeCatch}
    />

    <MainContainer>
      <Attention>登録から搬出完了までかんたん４ステップ！</Attention>
      <Headline>荷物を預ける利用手順</Headline>
      <HowToUseContentRow>
        <HowToUseContent
          contentNo="01"
          title="登録・相談"
          detail="候補のスペースを見つけたら、詳細画面の「このホストに相談する」ボタンからホストに連絡してみましょう。 荷物の種類や量・日程を調整して、ホストとの条件に合えば無事契約成立です。"
          image={howtouse01}
        />
        <HowToUseContent
          contentNo="02"
          title="見積もり・お支払い"
          detail="ホストから提示された金額でお互いの合意が取れたら支払いへ進みましょう。荷物の内容次第で利用料は変動するため、支払い日までに荷物の詳細について伝えておくと追加料金が発生せずスムーズに済みます。"
          image={howtouse02}
        />
      </HowToUseContentRow>
      <HowToUseContentRow>
        <HowToUseContent
          contentNo="03"
          title="荷物の搬入"
          detail="ホストのスペースへ荷物を運び入れましょう。当日の遅刻や無断キャンセルはトラブルの原因となるため、搬入当日はルールやマナーを守り、こまめな連絡を入れるなど誠実な対応を心がけることが大切です。"
          image={howtouse03}
        />
        <HowToUseContent
          contentNo="04"
          title="荷物の搬出"
          detail="気持ちよく撤収するため、余裕のある搬出準備を！ 無断での延長や音信不通時には、運営側から規約に基づいた対応やペナルティ料金が発生する場合があるのでご注意ください。"
          image={howtouse04}
        />
      </HowToUseContentRow>
    </MainContainer>
    <Footer />
  </Fragment>
);
