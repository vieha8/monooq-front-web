// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import howtouseEyeCatch from 'images/howtouse_eye_catch@2x.png';
import howtouse01 from 'images/howtouse_01@2x.png';
import howtouse02 from 'images/howtouse_02@2x.png';
import howtouse03 from 'images/howtouse_03@2x.png';
import howtouse04 from 'images/howtouse_04@2x.png';

const TopWrapper = styled.div`
  position: relative;
  top: -84px;
  height: 620px;
  color: ${Colors.black};
  margin-bottom: ${Dimens.medium}px;
  width: 100%;
  overflow: hidden;
  &:after {
    content: '';
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 70%;
    height: 324px;
    background: ${Colors.lightGray1Bg};
    z-index: -2;
  }
  ${media.tablet`
    top: -54px;
    width: 100%;
    height: 410px;
    margin-bottom: 0;
    &:after {
      content: '';
      position: absolute;
      bottom: ${Dimens.medium1_28}px;
      width: 100%;
      height: 200px;
    }
  `};
`;

const TopEyeCatch = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 70%;
  z-index: -1;
  ${media.giant`
    width: 90%;
  `};
  ${media.tablet`
    width: 100%;
  `};
`;

const TopMessageContent = styled.div`
  position: absolute;
  top: 190px;
  right: 5%;
  height: 310px;
  width: 550px;
  padding: ${Dimens.medium4_50}px ${Dimens.medium2}px;
  background-color: ${Colors.white};
  ${media.tablet`
    top: 180px;
    left: 5%;
    width: 90%;
    height: initial;
    text-align: center;
    padding: ${Dimens.medium1}px;
  `};
`;

const TopSubTitle = styled.div`
  color: ${Colors.brandPrimary};
  font-size: ${FontSizes.medium_18}px;
  line-height: ${Dimens.medium1_28}px;
  margin-bottom: ${Dimens.small}px;
  ${media.tablet`
    display: none;
  `}
`;

const TopTitle = styled.div`
  font-size: ${FontSizes.xxlarge_40}px;
  line-height: ${Dimens.medium4}px;
  font-weight: bold;
  margin-bottom: ${Dimens.small2}px;
  ${media.tablet`
    font-size: ${FontSizes.medium2}px;
    line-height: ${Dimens.medium2}px;
    margin-bottom: ${Dimens.xsmall}px;
  `}
  ${media.phoneSmall`
    font-size: ${FontSizes.medium1}px;
  `}
`;

const TopDescription = styled.div`
  font-size: ${FontSizes.medium}px;
  line-height: ${Dimens.medium1}px;
  ${media.tablet`
    font-size: ${FontSizes.small_12}px;
    line-height: ${Dimens.medium_20}px;
  `}
`;

const MainContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const Attention = styled.div`
  font-size: ${FontSizes.medium_18}px;
  color: ${Colors.brandPrimary};
  margin-bottom: ${Dimens.small2}px;
  ${media.tablet`
    margin-bottom: ${Dimens.small}px;
  `};
  ${media.phone`
    font-size: ${FontSizes.medium}px;
  `};
`;

const Headline = styled.div`
  font-size: ${FontSizes.xxlarge}px;
  line-height: ${Dimens.medium2_38}px;
  font-weight: bold;
  margin-bottom: ${Dimens.medium_20}px;
  ${media.phone`
    font-size: ${FontSizes.medium2}px;
    line-height: ${Dimens.medium1}px;
    margin-bottom: ${Dimens.xxsmall_5}px;
  `};
`;

const HowToUseContentRow = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 0 ${Dimens.medium}px;
  &:after {
    content: '';
    position: absolute;
    bottom: -${Dimens.medium_20}px;
    width: 90%;
    height: 320px;
    background: ${Colors.lightGray1Bg};
  }
  &:last-child {
    margin: ${Dimens.medium4_50}px auto ${Dimens.large4_80}px;
  }
  &:nth-child(3):after {
    left: 0;
  }
  &:nth-child(4):after {
    right: 0;
  }
  ${media.desktop`
    display: block;
  `};
  ${media.tablet`
    padding: 0 ${Dimens.medium}px;
    &:last-child {
      margin: auto;
    }
    &:after {
      display: none;
    }
  `};
  ${media.phone`
    padding: 0;
  `};
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 523px;
  height: 422px;
  margin: ${Dimens.medium_18}px ${Dimens.small_10}px;
  padding-left: ${Dimens.medium1}px;
  &:nth-child(2) {
    margin-top: ${Dimens.large2}px;
  }
  ${media.desktop`
    margin: ${Dimens.medium_18}px auto;
  `}
  ${media.tablet`
    width: 100%;
    height: auto;
    padding-left: 0px;
    &:nth-child(2) {
      margin-top: auto;
    }
  `}
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
    margin-top: ${Dimens.medium1}px;
  `}
`;

const ContentImage = styled.img`
  position: absolute;
  left: ${Dimens.medium_18}px;
  height: 280px;
  z-index: 1;
  ${media.tablet`
    position: relative;
    width: 100%;
    height: auto;
    left: 0;
  `}
`;

const ContentNo = styled.div`
  position: absolute;
  top: -${Dimens.medium3_46}px;
  left: -${Dimens.medium3_46}px;
  font-size: 100px;
  font-weight: bold;
  color: rgba(232, 82, 88, 0.9);
  z-index: 3;
  ${media.tablet`
    top: -${Dimens.medium2_38}px;
    left: ${Dimens.small2_14}px;
    font-size: 72px;
  `};
`;

const ContentTextWrap = styled.div`
  ${media.tablet`
    position: relative;
    &:after {
      content: '';
      position: absolute;
      left: -${Dimens.medium}px;
      top: 86px
      width: calc(100% + ${Dimens.medium2_32}px);
      height: 250px;
      background: ${Colors.lightGray1Bg};
    }
  `}
`;

const ContentText = styled.div`
  position: absolute;
  top: 252px;
  left: ${Dimens.medium3_40}px;
  padding: ${Dimens.medium1}px ${Dimens.medium2_36}px ${Dimens.medium1}px ${Dimens.large4_80}px;
  width: 477px;
  height: 170px;
  text-align: left;
  background-color: ${Colors.white};
  z-index: 2;
  ${media.tablet`
    position: relative;
    width: 100%;
    height: auto;
    top: unset;
    left: 0;
    margin-top: -2px;
    padding: ${Dimens.medium4_50}px ${Dimens.medium_20}px ${Dimens.medium_20}px;
  `}
`;

const ContentTitle = styled.div`
  font-size: ${FontSizes.medium1}px;
  font-weight: bold;
  color: ${Colors.brandPrimary};
  margin-bottom: ${Dimens.small2}px;
`;

const ContentDetail = styled.div`
  font-size: ${FontSizes.small}px;
  line-height: ${Dimens.medium_22}px;
`;

type ContentPropTypes = {
  contentNo: string,
  title: string,
  detail: string,
  image: string,
};

const HowToUseContent = ({ contentNo, title, detail, image }: ContentPropTypes) => (
  <ContentWrapper>
    <ContentImage src={image} />
    <ContentTextWrap>
      <ContentText>
        <ContentNo>{contentNo}</ContentNo>
        <ContentTitle>{title}</ContentTitle>
        <ContentDetail>{detail}</ContentDetail>
      </ContentText>
    </ContentTextWrap>
  </ContentWrapper>
);

export default () => (
  <Fragment>
    <TopWrapper>
      <TopEyeCatch src={howtouseEyeCatch} />
      <TopMessageContent>
        <TopSubTitle>利用の流れ</TopSubTitle>
        <TopTitle>
          使い方はとっても簡単！
          <br />
          モノオクはじめてガイド。
        </TopTitle>
        <TopDescription>
          登録から荷物の搬入・搬出まで簡単4ステップでご利用いただけるので、急な引越しやリフォームなどお急ぎの際にも最適です！
        </TopDescription>
      </TopMessageContent>
    </TopWrapper>
    <MainContainer>
      <Attention>登録から搬入出までかんたん４ステップ！</Attention>
      <Headline>荷物を預ける利用手順</Headline>
      <HowToUseContentRow>
        <HowToUseContent
          contentNo="01"
          title="登録・相談"
          detail="ユーザー登録をしてスペースを検索！気になるスペースを見つけたら、ホストに預けたい荷物の内容や利用期間を伝え、相談を開始しましょう。 荷物の種類や量・日程を調整して、ホストとの条件に合えば無事契約成立です。"
          image={howtouse01}
        />
        <HowToUseContent
          contentNo="02"
          title="見積もり確認・お支払い"
          detail="ホストと相談し利用が確定したら、ホストから見積りが届きます。見積もり内容に問題がなければ、お支払いをして取り引き成立です！WEB上で決済できるので、面倒な手続きはありません。"
          image={howtouse02}
        />
      </HowToUseContentRow>
      <HowToUseContentRow>
        <HowToUseContent
          contentNo="03"
          title="荷物の搬入"
          detail="利用開始日になったらホストのスペースへ荷物を運び入れます。ご自身での搬入、または配送業者の手配を行いましょう。"
          image={howtouse03}
        />
        <HowToUseContent
          contentNo="04"
          title="荷物の搬出"
          detail="利用終了日になったら荷物を引き取ります。もし延長を希望する場合は、ホストに相談し延長契約を結ぶことができます。"
          image={howtouse04}
        />
      </HowToUseContentRow>
    </MainContainer>
  </Fragment>
);
