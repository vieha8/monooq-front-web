import React from 'react';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes, ZIndexes } from 'variables';
import { media } from 'helpers/style/media-query';

const Wrap = styled.div`
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
    max-width: 500px;
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

const Image = styled.img`
  position: absolute;
  left: ${Dimens.medium_18}px;
  height: 280px;
  z-index: ${ZIndexes.child_1};
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
  z-index: ${ZIndexes.child_3};
  ${media.tablet`
    top: -${Dimens.medium2_38}px;
    left: ${Dimens.small2_14}px;
    font-size: 72px;
  `};
`;

const TextWrap = styled.div`
  ${media.tablet`
    position: relative;
    &:after {
      content: '';
      position: absolute;
      left: -50%;
      top: 86px
      width: 200%;
      height: 250px;
      background: ${Colors.lightGray1Bg};
    }
  `}
`;

const Text = styled.div`
  position: absolute;
  top: 252px;
  left: ${Dimens.medium3_40}px;
  padding: ${Dimens.medium1}px ${Dimens.medium2_36}px ${Dimens.medium1}px ${Dimens.large4_80}px;
  width: 477px;
  height: 170px;
  text-align: left;
  background-color: ${Colors.white};
  z-index: ${ZIndexes.child_2};
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

const Title = styled.div`
  font-size: ${FontSizes.medium1}px;
  font-weight: bold;
  color: ${Colors.brandPrimary};
  margin-bottom: ${Dimens.small2}px;
`;

const Detail = styled.div`
  font-size: ${FontSizes.small}px;
  line-height: ${Dimens.medium_22}px;
`;

export default ({ image, contentNo, title, detail }) => (
  <Wrap>
    <Image src={image} />
    <TextWrap>
      <Text>
        <ContentNo>{contentNo}</ContentNo>
        <Title>{title}</Title>
        <Detail>{detail}</Detail>
      </Text>
    </TextWrap>
  </Wrap>
);
