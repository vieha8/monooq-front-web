import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import { areaPrefectures } from 'helpers/prefectures';
import Meta from 'components/LV1/Meta';
import PageDefault from 'components/LV1/PageDefault';
import ButtonCaption from 'components/LV2/Forms/ButtonCaption';
import PrefectureList from 'components/LV3/PrefectureList';
import ImageBarLeft from 'images/lp123guest/icon-bar-left.png';
import ImageBarRight from 'images/lp123guest/icon-bar-right.png';
import Want from './Want';
import Merit from './Merit';
import BizModel from './BizModel';
import Pickup from './Pickup';
import Flow from './Flow';
import QaList from './Qa';

const ImageHero =
  'https://monooq.imgix.net/img%2Fservice%2Flp1guest%2Fhero.jpg?alt=media&auto=format&auto=compress';

const Wrap = styled.div`
  min-width: 320px;
  margin-top: -84px;
  font-weight: 500;
`;

const TopWrap = styled.div`
  position: relative;
  height: 600px;
  color: ${Colors.black};
  width: 100%;
  overflow: hidden;
  background-color: ${Colors.darkGray1};
  background-image: url(${ImageHero});
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  background-color: rgba(255, 255, 255, 0.2);
  background-blend-mode: lighten;
  ${media.tablet`
    height: 440px;
  `};
`;

const TopMessageContent = styled.div`
  position: relative;
  width: 100%;
  top: 190px;
  text-align: center;
  ${media.tablet`
    top: 210px;
    margin: auto;
    padding: 0 ${Dimens.medium}px;
  `};
`;

const TopTitle = styled.h1`
  font-size: ${FontSizes.medium3}px;
  line-height: ${Dimens.medium2_38}px;
  font-weight: bold;
  margin-bottom: ${Dimens.medium_20}px;
  color: ${Colors.white};
  text-shadow: 1px 1px 1px #333;
  ${media.tablet`
    font-size: ${FontSizes.medium2}px;
    line-height: ${Dimens.medium2}px;
    margin-bottom: ${Dimens.small_10}px;
  `}
  ${media.phone`
    font-size: ${FontSizes.medium1}px;
  `}
  ${media.phoneSmall`
    font-size: ${FontSizes.medium_18}px;
  `}
`;

const InitialCost = styled.span`
  display: block;
  margin-bottom: 14px;
  color: ${Colors.white};
  text-shadow: 1px 1px 1px #333;
  animation: flashCost 1s infinite;
  @keyframes flashCost {
    50% {
      opacity: 0;
    }
  }
  &::before,
  &::after {
    content: '';
    display: inline-block;
    width: 25px;
    height: 25px;
    vertical-align: bottom;
    background-repeat: no-repeat;
  }
  &::before {
    margin-right: 5px;
    background: url(${ImageBarLeft}) 0% 0% / 25px 25px no-repeat;
  }
  &:after {
    margin-left: 5px;
    background: url(${ImageBarRight}) 0% 0% / 25px 25px no-repeat;
  }
`;

const ContentsWrap = styled(PageDefault)`
  position: relative;
  margin-top: -60px;
  text-align: center;
  ${media.tablet`
    margin-top: ${Dimens.medium2_32}px;
    padding: 0px;
  `};
`;

export default ({ titleMeta, headline, titleWant, buttonLink, isViewPrefuctureList }) => (
  <Wrap>
    <Meta title={titleMeta} noindex />
    <TopWrap>
      <TopMessageContent>
        <TopTitle itemProp="headline">{headline}</TopTitle>
        <InitialCost>初期費用0円</InitialCost>
        <ButtonCaption caption="60秒で簡単登録" text="保管スペースを探す" link href={buttonLink} />
      </TopMessageContent>
    </TopWrap>
    <ContentsWrap>
      <Want titleWant={titleWant} />
      <Merit />
      <BizModel />
      {isViewPrefuctureList ? <PrefectureList list={areaPrefectures} regionId="" /> : <Pickup />}
      <Flow />
      <QaList />
    </ContentsWrap>
  </Wrap>
);
