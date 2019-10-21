// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';
import InlineText from 'components/LV1/Texts/InlineText';
import IconAreaRed from 'images/icon-area-red.png';

const Wrap = styled.div``;

const TitleOuter = styled.div`
  margin-bottom: ${Dimens.medium}px;
`;

const ConditionList = styled.ul`
  display: flex;
  ${props =>
    !props.modal &&
    `
      width: ${props.width ? `${props.width}px` : '100%'};
  `};
`;

const ImageIconAreaRed = styled.img`
  width: ${Dimens.medium_18}px;
  height: auto;
  vertical-align: middle;
  margin-right: ${Dimens.small2}px;
`;

const Item = styled.li`
  width: 100%;
  margin-right: ${Dimens.small}px;
  ${props =>
    props.modal &&
    `
      text-align: left;
      &:first-child {
        white-space: nowrap;
        margin-right: ${Dimens.medium4}px;
      }
  `};
`;

const Title = styled.div`
  margin-bottom: ${Dimens.small}px;
  font-size: ${FontSizes.small_12}px;
  color: ${Colors.lightGray3};
  font-weight: normal;
`;

const Value = styled.div``;

export type PropTypes = {
  searchConditionCurrentList: Array<{
    title: string,
    value: string,
  }>,
  modal?: boolean,
  width?: number,
};

export default ({ searchConditionCurrentList, modal, width }: PropTypes) => (
  <Wrap>
    {!modal && (
      <TitleOuter>
        <ImageIconAreaRed src={IconAreaRed} alt="icon-area" />
        現在の検索条件
      </TitleOuter>
    )}
    <ConditionList modal={modal} width={width}>
      {modal && (
        <Item modal>
          <ImageIconAreaRed src={IconAreaRed} alt="icon-area" />
          現在の検索条件
        </Item>
      )}
      {searchConditionCurrentList.map((item, i) => (
        <Item key={i.toString()} modal={modal}>
          <Title>{item.title}</Title>
          <Value>
            <InlineText.Base fontSize={14} lineClamp={2}>
              {item.value || '指定なし'}
            </InlineText.Base>
          </Value>
        </Item>
      ))}
    </ConditionList>
  </Wrap>
);
