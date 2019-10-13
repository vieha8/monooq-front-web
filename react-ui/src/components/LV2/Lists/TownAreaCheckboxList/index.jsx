// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';
import CheckBox from 'components/LV1/Forms/CheckBox';

const Wrap = styled.div``;

const Caption = styled.div`
  font-size: ${FontSizes.small}px;
  font-weight: bold;
  line-height: normal;
  ${props =>
    props.captionColor &&
    `
      color: ${props.captionColor};    
  `};
`;

const CheckBoxCityAllWrap = styled.div`
  margin: ${Dimens.medium}px auto 0;
`;

const AreaPinList = styled.ul`
  width: 100%;
  white-space: nowrap;
  display: flex;
  flex-wrap: wrap;
  margin-left: ${Dimens.medium1_25}px;
`;

const Item = styled.li`
  width: calc(16.666666666% - ${Dimens.xxsmall_4}px);
  min-width: fit-content;
  margin-top: ${Dimens.small2}px;
  margin-left: ${Dimens.xxsmall_4}px;
  font-size: ${FontSizes.small}px;
  line-height: normal;
  color: ${Colors.black2};
`;

export type PropTypes = {
  caption: string,
  cityName: string,
  captionColor?: string,
  townAreaList: Array<{
    text: string,
    link: string,
  }>,
};

export default ({ caption, cityName, captionColor, townAreaList }: PropTypes) => (
  <Wrap>
    <Caption captionColor={captionColor}>{caption}</Caption>
    <CheckBoxCityAllWrap>
      <CheckBox
      // TODO: あとで実装
      // checked={isNoticeEmail}
      // onClick={onChangeNoticeEmail}
      // onKeyDown={onKeyDownNoticeEmail}
      >
        {cityName}
        から選ぶ
      </CheckBox>
    </CheckBoxCityAllWrap>
    <AreaPinList>
      {townAreaList.map((item, i) => (
        <Item key={i.toString()}>
          <CheckBox
          // TODO: あとで実装
          // checked={isNoticeEmail}
          // onClick={onChangeNoticeEmail}
          // onKeyDown={onKeyDownNoticeEmail}
          >
            {item.text}
          </CheckBox>
        </Item>
      ))}
    </AreaPinList>
  </Wrap>
);
