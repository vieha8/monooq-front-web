import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';
import InputForm from 'components/LV2/Forms/InputForm';

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

export default ({
  caption,
  cityName,
  cityCode,
  isChecked,
  captionColor,
  townAreaList,
  onClickCheckCity,
  onClickCheckTown,
}) => (
  <Wrap>
    <Caption captionColor={captionColor}>{caption}</Caption>
    <CheckBoxCityAllWrap>
      <InputForm
        checkbox
        checked={isChecked}
        labelCheckBox={`${cityName}すべて`}
        onClickCheck={onClickCheckCity}
        options={{ code: cityCode }}
      />
    </CheckBoxCityAllWrap>
    <AreaPinList>
      {townAreaList.map((item, i) => (
        <Item key={i.toString()}>
          <InputForm
            checkbox
            labelCheckBox={`${item.text}(${item.count})`}
            checked={item.isChecked}
            onClickCheck={onClickCheckTown}
            options={{ code: item.code }}
          />
        </Item>
      ))}
    </AreaPinList>
  </Wrap>
);
