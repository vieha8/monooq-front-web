import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import InputForm from 'components/LV2/Forms/InputForm';

const Wrap = styled.div``;

const Caption = styled.div`
  font-size: ${FontSizes.small}px;
  font-weight: bold;
  line-height: normal;
`;

const List = styled.ul`
  width: 100%;
  white-space: nowrap;
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.li`
  width: calc(33.33333333333% - ${Dimens.xxsmall_4}px);
  min-width: fit-content;
  margin-top: ${Dimens.small2}px;
  margin-left: ${Dimens.xxsmall_4}px;
  font-size: ${FontSizes.small}px;
  line-height: normal;
`;

export default ({ tagList, onClickCheckTown }) => (
  <Wrap>
    <Caption>条件タグ</Caption>
    <List>
      {tagList.map((item, i) => (
        <Item key={i.toString()}>
          <InputForm
            checkbox
            labelCheckBox={`${item.text}`}
            checked={item.isChecked}
            onClickCheck={onClickCheckTown}
            options={{ code: item.code }}
          />
        </Item>
      ))}
    </List>
  </Wrap>
);
