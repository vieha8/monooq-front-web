// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import InputForm from 'components/atomic/LV2/InputForm';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  width: 100%;
  padding: ${Dimens.medium}px;

  border-bottom-style: none;
  ${media.phone`
    padding: ${Dimens.medium}px 0px;
  `};

  &:first-child {
    border-radius: 3px 3px 0 0;
  }

  &:last-child {
    border-bottom-style: solid;
    border-radius: 0 0 3px 3px;
  }

  &::after {
    clear: both;
    content: '';
    display: block;
  }
`;

const PriceContainer = styled.div`
  display: block;
  width: 60%;
  float: left;
  ${media.phone`
    width: 100%;
    margin-top: ${Dimens.medium}px;
    float: none;
  `};
`;

const Image = styled.img`
  width: 100%;
`;

const ImageContainer = styled.div`
  display: block;
  width: 40%;
  max-width: 240px;
  text-align: center;
  float: right;
  margin-top: ${Dimens.medium}px;
  ${media.phone`
    width: 100%;
    float: none;
    margin: ${Dimens.medium}px auto;
  `};
`;

const Caption = styled.div`
  width: 100%;
  margin: 5px auto;
  ${media.phone`
    width: 100%;
  `};
`;

const InputWrapper = styled.div`
  display: inline-block;
  ${media.phone`
    width: 100%;
  `};
`;

const PriceWrapper = styled.div``;

const OnlyPC = styled.span`
  display: block;
  ${media.phone`
    display: none;
  `};
`;

const OnlyPhone = styled.span`
  display: none;
  ${media.phone`
    display: block;
  `};
`;

type PropTypes = {
  image: any,
  title: string,
  caption: string,
  placeholder: string,
  price: string,
  onChange: Function,
  error: React.Element<*>,
};

export default (props: PropTypes) => (
  <Container>
    <OnlyPC>
      <ImageContainer>
        <Image src={props.image} alt="" />
      </ImageContainer>
    </OnlyPC>
    <PriceContainer>
      <div>
        <InlineText.Strong>{props.title}</InlineText.Strong>
      </div>
      <Caption>
        <InlineText.Base color={Colors.darkGray2} fontSize={FontSizes.small_12}>
          {props.caption}
        </InlineText.Base>
      </Caption>
      <OnlyPhone>
        <ImageContainer>
          <Image src={props.image} alt="" />
        </ImageContainer>
      </OnlyPhone>
      <PriceWrapper>
        <InputWrapper>
          <InputForm
            type="number"
            unit="円"
            value={props.price}
            onChange={e => props.onChange(e.target.value)}
            placeholder={props.placeholder}
          />
        </InputWrapper>
      </PriceWrapper>
      {props.error}
    </PriceContainer>
  </Container>
);
