// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/atoms/InlineText';
import InputForm from 'components/atomic/molecules/InputForm';
import { Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

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
    content: '';
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
  `};
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
  `};
`;

const Caption = styled.div`
  width: 160px;
  margin-top: ${Dimens.medium2}px;
  ${media.phone`
    width: 100%;
  `};
`;

const InputWrapper = styled.div`
  display: inline-block;
  width: 120px;
`;

const PriceWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
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
    <ImageContainer>
      <Image src={props.image} alt="" />
    </ImageContainer>
    <PriceContainer>
      <div>
        <InlineText.Base>{props.title}</InlineText.Base>
      </div>
      <Caption>
        <InlineText.Base>{props.caption}</InlineText.Base>
      </Caption>
      <PriceWrapper>
        <InputWrapper>
          <InputForm
            type="number"
            value={props.price}
            onChange={e => props.onChange(e.target.value)}
            placeholder={props.placeholder}
          />
        </InputWrapper>
        <span>&nbsp;</span>
        <InlineText.Base>円／30日間</InlineText.Base>
      </PriceWrapper>
      {props.error}
    </PriceContainer>
  </Container>
);
