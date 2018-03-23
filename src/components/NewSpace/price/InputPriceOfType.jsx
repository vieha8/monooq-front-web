import React from 'react';
import styled from 'styled-components';
import Input from 'components/Shared/Input';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import ErrorText from 'components/Shared/ErrorText';

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

  &::after {
    clear: both;
    content: "";
    display: block;
  }
`;

const PriceContainer = styled.div`
  display: block;
  width: 50%;
  float: left;
  ${media.phone`
    width: 100%;
    margin-top: ${Dimens.medium}px;
    float: none;
  `}
`;

const Image = styled.img`
  width: 100%;
`;

const ImageContainer = styled.div`
  display: block;
  width: 50%;
  text-align: center;
  float: right;
  ${media.phone`
    width: 100%;
    float: none;
  `}
`;

const Title = styled.span`
  display: block;
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.small}px;
`;

const Caption = styled.span`
  display: block;
  width: 160px;
  color: ${Colors.darkGray2};
  font-size: ${FontSizes.xsmall}px;
  margin-top: ${Dimens.medium2}px;
  line-height: 1.5;
  ${media.phone`
    width: 100%;
  `}
`;

const InputWrapper = styled.div`
  display: inline-block;
  width: 120px;
`;

const PriceWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const Unit = styled.span`
  display: inline-block;
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.small}px;
  margin-left: ${Dimens.small}px;
`;

export default props => (
  <Container>
    <ImageContainer>
      <Image src={props.image} alt="" />
    </ImageContainer>
    <PriceContainer>
      <Title>{props.title}</Title>
      <Caption>{props.caption}</Caption>
      <PriceWrapper>
        <InputWrapper>
          <Input
            type="number"
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            style={{ width: '100%' }}
            invalid={(props.errors || []).length > 0}
          />
        </InputWrapper>
        <Unit>円／30日間</Unit>
      </PriceWrapper>
      {props.errors && <ErrorText errors={props.errors} />}
    </PriceContainer>
  </Container>
);
