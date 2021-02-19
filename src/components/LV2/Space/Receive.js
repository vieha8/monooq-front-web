import React from 'react';
import styled from 'styled-components';
import { Dimens, Colors, FontSizes } from 'variables';
import { SectionTitle } from './Section';

const ImageCheckGreen =
  'https://monooq.imgix.net/img%2Fservice%2Ficon-check-circle-green.svg?auto=compress';
const ImageCheckWhite =
  'https://monooq.imgix.net/img%2Fservice%2Ficon-check-circle-gray.svg?auto=compress';

const Wrap = styled.div`
  margin: 20px auto;
`;

const ItemWrap = styled.div`
  position: relative;
  margin: ${Dimens.small2_14}px auto;
  padding-left: ${Dimens.medium2_34}px;
  font-size: ${FontSizes.small}px;
  ${props =>
    !props.isEnable &&
    `
      color: ${Colors.lightGray1};
    `};
  &::before {
    position: absolute;
    content: '';
    top: calc(50% - ${Dimens.small2}px);
    left: 0px;
    width: ${Dimens.medium1}px;
    height: ${Dimens.medium1}px;
    //background-image: url(${props => (props.isEnable ? ImageCheckGreen : ImageCheckWhite)});
    background-size: cover;
    background-position: top left;
    background-repeat: no-repeat;
  }
`;

export default ({ isDelivery, isMeeting }) => (
  <Wrap>
    <SectionTitle text="荷物の受け取り方法" />
    <ItemWrap isEnable={isDelivery}>
      配送サービスでの受け取り
      <br />
      （ヤマト運輸・佐川急便など）
    </ItemWrap>
    <ItemWrap isEnable={isMeeting}>対面での受け取り</ItemWrap>
  </Wrap>
);
