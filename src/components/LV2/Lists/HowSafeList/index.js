import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import Text from 'components/LV1/Texts/TextStatic';

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
  margin: auto;
  ${media.phone`
    margin: auto auto margin-bottom: ${Dimens.medium1}px;
  `};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 688px;
  ${media.tablet`
    max-width: 100%;
    text-align: center;
  `};
`;

const Label = styled.div`
  font-size: ${FontSizes.medium2}px;
  line-height: ${FontSizes.medium2 * 1.5}px;
  margin: ${Dimens.small_10}px auto;
`;

const StyledLabel = styled(Label)`
  ${media.phone`
    font-size: 6vw;
    line-height: ${6 * 1.5}vw;
    margin-bottom: ${Dimens.small_10}px;
  `};
`;

export default function HowSafeList({ list }) {
  return (
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
}
