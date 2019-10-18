// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes, Colors } from 'variables';
import Hr from 'components/LV1/HorizontalRule';
import AreaAroundList from 'components/LV2/Lists/AreaAroundList';
import TownAreaCheckboxList from 'components/LV2/Lists/TownAreaCheckboxList';
import IconAreaGray from 'images/icon-area-gray.png';

const Wrap = styled.div``;

const Caption = styled.div`
  font-size: ${FontSizes.medium2}px;
  font-weight: bold;
  line-height: ${Dimens.medium1}px;
  color: ${Colors.black2};
  ${media.tablet`
    margin: auto ${Dimens.medium}px 0; 
  `};
`;

const CityTownAreaList = styled.ul``;

const Item = styled.li`
  margin-top: ${Dimens.medium1}px;
  padding: ${Dimens.medium2_32}px;
  box-shadow: 0px 0px ${Dimens.xsmall}px rgba(0, 0, 0, 0.1);
`;

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
  padding: ${Dimens.small2}px ${Dimens.xxsmall}px ${Dimens.small2_15}px;
`;

export type PropTypes = {
  cityTownAreaList: Array<{
    cityName: string,
    areaAroundList: Array<{
      text: string,
      link: string,
    }>,
    townAreaList: Array<{
      text: string,
      link: string,
    }>,
  }>,
  prefecture?: string,
  onChangeCheckCity: Function,
  onChangeCheckTownArea: Function,
};

export default ({
  cityTownAreaList,
  prefecture,
  onChangeCheckCity,
  onChangeCheckTownArea,
}: PropTypes) => (
  <Wrap>
    <Caption>
      {prefecture}
      の市区町村一覧
    </Caption>
    <CityTownAreaList>
      {cityTownAreaList.map((item, i) => (
        <Item key={i.toString()}>
          <CityWrap>
            <ImageAreaPin src={IconAreaGray} alt="icon-area" />
            {item.cityName}
          </CityWrap>
          {item.areaAroundList.length > 0 && (
            <AreaPinList>
              <AreaAroundList
                caption="人気のエリアから選ぶ"
                captionColor={Colors.lightGray3}
                areaAroundList={item.areaAroundList}
              />
            </AreaPinList>
          )}
          <Hr margin="10px 0 20px" />
          <TownAreaCheckboxList
            caption="地域から選ぶ"
            captionColor={Colors.lightGray3}
            cityName={item.cityName}
            townAreaList={item.townAreaList}
            onChangeCheckCity={onChangeCheckCity}
            onChangeCheckTownArea={onChangeCheckTownArea}
          />
        </Item>
      ))}
    </CityTownAreaList>
  </Wrap>
);
