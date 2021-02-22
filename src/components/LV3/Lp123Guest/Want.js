import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import SectionTitle from './SectionTitle';
import Image from 'next/image'

const ImageWantFile = '/images/img_service_lp123guest_icon-want-file.png';
const ImageWantGolf = '/images/img_service_lp123guest_icon-want-golf.png'
const ImageWantHome = '/images/img_service_lp123guest_icon-want-home.png'
const ImageWantSnowboard = '/images/img_service_lp123guest_icon-want-snowboard.png'
const ImageWantTruck = '/images/img_service_lp123guest_icon-want-truck.png'
const ImageWantWear = '/images/img_service_lp123guest_icon-want-wear.png'

const WantWrap = styled.div`
  max-width: 960px;
  position: relative;
  background: ${Colors.white};
  padding: ${Dimens.medium1_25}px;
  border-radius: 6px;
  box-shadow: 0.5px 0px 3px #333;
  margin: ${Dimens.small_10}px auto ${Dimens.medium4_50}px;
  ${media.tablet`
    box-shadow: unset;
    padding: ${Dimens.medium1_25}px ${Dimens.medium}px;
  `};
  ${media.phone`
    padding: ${Dimens.medium}px ${Dimens.medium}px;
  `};
`;

const WantUl = styled.ul`
  width: 100%;
  box-sizing: border-box;
  text-align: center;
`;

const WantLi = styled.li`
  border: solid 1px ${Colors.lightGray2};
  border-radius: 6px;
  display: inline-block;
  width: calc(33.333333% - 6px);
  margin: 0 auto ${Dimens.small_10}px;
  &:nth-child(2),
  &:nth-child(5) {
    margin: 0 ${Dimens.small_9}px ${Dimens.small_10}px;
  }
  ${media.phone`
    width: calc(50% - 5px);
    &:nth-child(2),
    &:nth-child(5) {
      margin: 0 auto ${Dimens.small_10}px;
    }
    &:nth-child(2n) {
      margin: 0 auto ${Dimens.small_10}px ${Dimens.small_10}px;
    }
  `};
`;

const WantLiFigure = styled.figure`
  padding: 10px 5px;
  ${media.tablet`
    font-size: ${FontSizes.small}px;
  `};
  ${media.phone`
    font-size: ${FontSizes.small_12}px;
  `};
`;

const WantLiImg = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 0;
`;

const getLi = (imageSrc, imageAlt, text) => {
  return (
    <WantLi>
      <WantLiFigure>
        <Image width={100} objectFit='contain' src={imageSrc} alt={imageAlt} />
        <figcaption>{text}</figcaption>
      </WantLiFigure>
    </WantLi>
  );
};

export default function Want({ titleWant }) {
  return (
    <WantWrap>
      <SectionTitle text={titleWant} />
      <WantUl>
        {getLi(ImageWantTruck, 'img-truck', '引越し時の荷物')}
        {getLi(ImageWantHome, 'img-home', 'リフォーム中の荷物')}
        {getLi(ImageWantSnowboard, 'img-snowboard', '季節のレジャー用品')}
        {getLi(ImageWantFile, 'img-file', '仕事道具・書類')}
        {getLi(ImageWantWear, 'img-wear', '衣替え時の衣類')}
        {getLi(ImageWantGolf, 'img-golf', '趣味の道具')}
      </WantUl>
    </WantWrap>
  );
}
