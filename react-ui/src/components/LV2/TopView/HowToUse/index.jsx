import React from 'react';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes, ZIndexes } from 'variables';
import { media } from 'helpers/style/media-query';

const howtouseEyeCatch =
  'https://monooq.imgix.net/img%2Fservice%2Fhowtouse_eye_catch%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';

const Wrap = styled.div`
  position: relative;
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
  }
  ${media.tablet`
    top: 0px;
    width: 100%;
    height: 410px;
    margin-bottom: 0;
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
    }
  `};
  ${media.phone`
    height: 374px;
    }
  `};
`;

const EyeCatch = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 70%;
  z-index: ${ZIndexes.child_1};
  ${media.giant`
    width: 90%;
  `};
  ${media.tablet`
    width: 100%;
  `};
`;

const ContentWrap = styled.div`
  position: absolute;
  top: 190px;
  right: 5%;
  height: 310px;
  width: 550px;
  padding: ${Dimens.medium4_50}px ${Dimens.medium2}px;
  background-color: ${Colors.white};
  z-index: ${ZIndexes.child_2};
  ${media.tablet`
    top: 230px;
    left: 0;
    right: 0;
    width: 100%;
    max-width: 500px;
    height: initial;
    margin: auto;
    text-align: center;
    padding: ${Dimens.medium1}px;
  `};
  ${media.tablet`
    width: calc(100% - 32px);
  `};
  ${media.phone`
    top: 180px;
  `};
`;

const SubTitle = styled.div`
  color: ${Colors.brandPrimary};
  font-size: ${FontSizes.medium_18}px;
  line-height: ${Dimens.medium1_28}px;
  margin-bottom: ${Dimens.small}px;
  ${media.tablet`
    display: none;
  `}
`;

const MainTitle = styled.div`
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

const Description = styled.div`
  font-size: ${FontSizes.medium}px;
  line-height: ${Dimens.medium1}px;
  ${media.tablet`
    font-size: ${FontSizes.small_12}px;
    line-height: ${Dimens.medium_20}px;
  `}
`;

export default () => (
  <Wrap>
    <EyeCatch src={howtouseEyeCatch} />
    <ContentWrap>
      <SubTitle>利用の流れ</SubTitle>
      <MainTitle>
        使い方はとっても簡単！
        <br />
        モノオクはじめてガイド。
      </MainTitle>
      <Description>
        登録から荷物の搬入・搬出まで簡単4ステップでご利用いただけるので、急な引越しやリフォームなどお急ぎの際にも最適です！
      </Description>
    </ContentWrap>
  </Wrap>
);
