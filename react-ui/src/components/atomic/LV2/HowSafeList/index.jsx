// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import Text from 'components/atomic/LV1/StaticText';

const HowSafeContentWrapper = styled.div``;

const HowSafeWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 50px;
  ${media.phone`
    justify-content: center;
  `};
`;

const Image = styled.img`
  width: 246px;
  border-radius: 50%;
  ${media.phone`
    margin-bottom: ${Dimens.medium1}px;
  `};
`;

const Wrapper = styled.div`
  width: 688px;
`;

const Label = styled.div`
  font-size: ${FontSizes.medium2}px;
  line-height: ${FontSizes.medium2 * 1.5}px;
  margin-bottom: ${Dimens.medium_20}px;
`;

const StyledLabel = styled(Label)`
  ${media.phone`
    font-size: 6vw;
    line-height: ${6 * 1.5}vw;
    margin-bottom: ${Dimens.small_10}px;
  `};
`;

type PropTypes = {
  list: Array<{
    image: string,
    label: string,
    text: string,
  }>,
};

export default ({ list }: PropTypes) => (
  <HowSafeContentWrapper>
    {list.map((item, i) => (
      <HowSafeWrap key={i.toString()}>
        <Image src={item.image} />
        <Wrapper>
          <StyledLabel>{item.label}</StyledLabel>
          <Text>{item.text}</Text>
        </Wrapper>
      </HowSafeWrap>
    ))}
  </HowSafeContentWrapper>
);
