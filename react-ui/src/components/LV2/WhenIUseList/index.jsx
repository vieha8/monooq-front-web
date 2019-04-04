// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import Text from 'components/LV1/StaticText';

const WhenIUseContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const WhenIUseWrap = styled.div`
  width: 330px;
  margin-bottom: ${Dimens.medium_20}px;
  ${media.phone`
    width: 100%;
  `};
`;

const ContentImage = styled.img`
  width: 100%;
  margin-bottom: ${Dimens.small_10}px;
`;

type PropTypes = {
  list: Array<{
    image: string,
    text: string,
  }>,
};

export default ({ list }: PropTypes) => (
  <WhenIUseContentWrapper>
    {list.map((item, i) => (
      <WhenIUseWrap key={i.toString()}>
        <ContentImage src={item.image} />
        <Text>{item.text}</Text>
      </WhenIUseWrap>
    ))}
  </WhenIUseContentWrapper>
);
