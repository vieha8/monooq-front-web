// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import Text from 'components/atomic/LV1/StaticText';

const WhySafeContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const WhySafeWrap = styled.div`
  width: 32%;
  ${media.phone`
    width: 100%;
    margin-bottom: ${Dimens.medium3_40}px;
  `};
`;

const Label = styled.div`
  height: ${Dimens.large_60}px;
  font-size: ${FontSizes.medium2}px;
  margin-bottom: ${Dimens.small_10}px;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.span`
  && {
    margin-left: -${Dimens.small_10}px;
    margin-right: ${Dimens.small_10}px;
    font-size: ${FontSizes.custom2large}px;
  }
  ${media.phone`
    && {
      margin-left: -6px;
      margin-right: 4px;
      font-size: ${FontSizes.custom1large}px;
    }
  `};
`;

const CircleIcon = styled.i`
  && {
    color: ${Colors.brandPrimary};
  }
`;

const BookmarkIcon = styled.i`
  && {
    color: ${Colors.white};
  }
`;

const LabelText = styled.span`
  ${media.phone`
    font-size: 6vw;
    line-height: ${6 * 1.5}vw;
  `};
`;

type PropTypes = {
  list: Array<{
    label: string,
    text: string,
  }>,
};

export default ({ list }: PropTypes) => (
  <WhySafeContentWrapper>
    {list.map((item, i) => (
      <WhySafeWrap key={i.toString()}>
        <Label>
          <IconWrapper className="fa-layers fa-fw fa-2x">
            <CircleIcon className="fas fa-circle" />
            <BookmarkIcon className="far fa-bookmark" data-fa-transform="shrink-6" />
          </IconWrapper>
          <LabelText>{item.label}</LabelText>
        </Label>
        <Text>{item.text}</Text>
      </WhySafeWrap>
    ))}
  </WhySafeContentWrapper>
);
