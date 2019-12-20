import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import InputForm from 'components/LV2/Forms/InputForm';
import { media } from 'helpers/style/media-query';

const Wrap = styled.div`
  margin-bottom: ${Dimens.small2}px;
`;

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
  ${media.tablet`
    width: calc(50% - ${Dimens.xxsmall_4}px);
  `};
  ${media.phoneSmall`
    &:nth-child(odd){
      margin-left: 0;
      width: calc(44% - ${Dimens.xxsmall_4}px);
    }
  `}
`;

export default ({ tagList, onClickTag, onKeyDownTag }) => (
  <Wrap>
    <Caption>設備・条件</Caption>
    <List>
      {tagList.map((item, i) => (
        <Item key={i.toString()}>
          <InputForm
            checkbox
            labelCheckBox={`${item.text}`}
            checked={item.isChecked}
            onClickCheck={onClickTag}
            options={{ code: item.options.code }}
            onKeyDown={onKeyDownTag}
          />
        </Item>
      ))}
    </List>
  </Wrap>
);
