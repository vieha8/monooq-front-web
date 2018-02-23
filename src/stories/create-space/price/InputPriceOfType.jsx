import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { Colors, FontSizes, Dimens } from '../../../variables';

const Container = styled.div`
  border: 1px solid ${Colors.borderGray};
  width: 100%;
  padding: ${Dimens.medium2}px;

  border-bottom-style: none;
  
  &:first-child {
    margin-top: ${Dimens.medium3}px;
    border-radius: 3px 3px 0 0;
  }

  &:last-child {
    border-bottom-style: solid;
    border-radius: 0 0 3px 3px;
  }
`;

const PriceContainer = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 50%;
`;

const ImageContainer = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 50%;
  text-align: center;
`;

const Title = styled.span`
  display: block;
  color: ${Colors.black};
  font-size: ${FontSizes.small}px;
`;

const Caption = styled.span`
  display: block;
  color: ${Colors.gray};
  font-size: ${FontSizes.xsmall}px;
  margin-top: ${Dimens.medium2}px;
`;

const PriceWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const Unit = styled.span`
  display: inline-block;
  color: ${Colors.black};
  font-size: ${FontSizes.small}px;
  margin-left: ${Dimens.small}px;
`;

export default props => (
  <Container>
    <PriceContainer>
      <Title>{props.title}</Title>
      <Caption>{props.caption}</Caption>
      <PriceWrapper>
        <Input
          placeholder={props.placeholder}
          size={8}
        />
        <Unit>円／30日間</Unit>
      </PriceWrapper>
    </PriceContainer>
    <ImageContainer>
      <img src="http://placehold.jp/280x120.png" alt="" />
    </ImageContainer>
  </Container>
);
