// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import InputForm from 'components/atomic/LV2/InputForm';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  width: 100%;
  padding: ${Dimens.small2_14}px 0 ${Dimens.medium}px;

  border-bottom-style: none;
  ${media.phone`
    padding: ${Dimens.xsmall}px 0px;
    ${props =>
      !props.detail &&
      `
        padding: ${Dimens.xsmall}px 0px ${Dimens.medium1}px;
      `};
  `};

  &:first-child {
    border-radius: 3px 3px 0 0;
  }

  &:last-child {
    border-bottom-style: solid;
    border-radius: 0 0 3px 3px;
    padding: ${Dimens.small2_14}px 0 ${Dimens.small_10}px;
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
    float: none;
  `};
`;

const Image = styled.img`
  width: 100%;
`;

const ImageContainer = styled.div`
  display: block;
  width: 40%;
  max-width: 190px;
  text-align: center;
  float: right;
  ${media.phone`
    width: 100%;
    max-width: 240px;
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

const PriceWrapper = styled.div`
  color: ${Colors.brandPrimary};
  font-size: ${FontSizes.medium_18}px;
  font-weight: bold;
  margin-top: ${Dimens.small2}px;
`;

const PriceTitleWrapper = styled.span`
  font-size: ${FontSizes.small_15}px;
  font-weight: bold;
  line-height: normal;
`;

const PriceWrapperPhone = styled.span`
  display: none;
  color: ${Colors.brandPrimary};
  font-size: ${FontSizes.medium_18}px;
  font-weight: bold;
  line-height: normal;
  float: right;
  ${media.phone`
    display: inline-block;
    line-height: 1;
  `};
`;

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

export default (props: PropTypes) =>
  props.detail ? (
    <Container detail>
      <OnlyPC>
        <ImageContainer>
          <Image src={props.image} alt="" />
        </ImageContainer>
      </OnlyPC>
      <PriceContainer>
        <Fragment>
          <PriceTitleWrapper>{props.title}</PriceTitleWrapper>
          <PriceWrapperPhone>
            {props.price}
            {'円'}
          </PriceWrapperPhone>
        </Fragment>
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
        <OnlyPC>
          <PriceWrapper>{props.price}円</PriceWrapper>
        </OnlyPC>
        {props.error}
      </PriceContainer>
    </Container>
  ) : (
    <Container>
      <OnlyPC>
        <ImageContainer>
          <Image src={props.image} alt="" />
        </ImageContainer>
      </OnlyPC>
      <PriceContainer>
        <Fragment>
          <InlineText.Strong>{props.title}</InlineText.Strong>
        </Fragment>
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
        <InputWrapper>
          <InputForm
            type="text"
            unit="円"
            value={props.price}
            onChange={e => props.onChange(e.target.value)}
            placeholder={props.placeholder}
          />
        </InputWrapper>
        {props.error}
      </PriceContainer>
    </Container>
  );
