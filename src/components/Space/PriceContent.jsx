import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from 'variables';

const Container = styled.div`
  padding: ${Dimens.medium2}px 0;
  &:not(:first-child) {
    border-top: 1px solid ${Colors.borderGray};
  }
`;

const PriceContainer = styled.div`
  &::after {
    clear: both;
    content: "";
    display: block;
  }
`;

const TextContainer = styled.div`
  float: left;
`;

const Image = styled.img`
  display: block;
  float: right;
  width: 115px;
  height: 56px;
`;

const Text = styled.span`
  display: block;
  font-size: ${FontSizes.medium}px;
  color: ${Colors.darkGray1};
`;

const Price = styled.span`
  display: block;
  font-size: ${FontSizes.medium}px;
  color: ${Colors.darkGray1};
  margin-top: ${Dimens.medium}px;
`;

const Caption = styled.span`
  display: block;
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.darkGray2};
  margin-top: ${Dimens.medium}px;
`;

export default props => (
  <Container>
    <PriceContainer>
      <TextContainer>
        <Text>{props.title}</Text>
        <Price>{props.price}円</Price>
      </TextContainer>
      <Image src={props.image} alt={props.title} />
    </PriceContainer>
    <Caption>{props.caption}</Caption>
  </Container>
);
