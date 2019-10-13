// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';
import Hr from 'components/LV1/HorizontalRule';
import AreaAroundList from 'components/LV2/Lists/AreaAroundList';
import IconAreaGray from 'images/icon-area-gray.png';

const Wrap = styled.div``;

const CityWrap = styled.div`
  font-size: ${FontSizes.medium2}px;
  font-weight: bold;
  line-height: normal;
`;

const ImageAreaPin = styled.img`
  width: ${Dimens.medium_18}px;
  margin-right: ${Dimens.small2}px;
  margin-bottom: ${Dimens.xxsmall_4}px;
  vertical-align: middle;
`;

const AreaPinList = styled.ul`
  width: 100%;
  white-space: nowrap;
  overflow-x: scroll;
  padding: ${Dimens.small2}px ${Dimens.xxsmall}px ${Dimens.small2_15}px;
  ::-webkit-scrollbar-track {
    background-color: ${Colors.lightGray7};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${Colors.lightGray6};
  }
`;

export type PropTypes = {
  cityName: string,
  areaAroundList: Array<{
    text: string,
    link: string,
  }>,
};

export default ({ cityName, areaAroundList }: PropTypes) => (
  <Wrap>
    <CityWrap>
      <ImageAreaPin src={IconAreaGray} alt="icon-area" />
      {cityName}
    </CityWrap>
    <AreaPinList>
      <AreaAroundList
        caption="人気のエリアから選ぶ"
        captionColor={Colors.lightGray3}
        areaAroundList={areaAroundList}
      />
    </AreaPinList>
    <Hr />
  </Wrap>
);
