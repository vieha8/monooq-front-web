import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
import InputForm from 'components/LV2/Forms/InputForm';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  width: 100%;
  border: 1px solid ${Colors.borderGray};
  border-radius: ${Dimens.xxsmall_4}px;
  ${media.tablet`
    padding: ${Dimens.small}px 0px;
  `};
  ${props =>
    props.marginLeft &&
    `
      margin-left: 5%;
  `};
  &::after {
    clear: both;
    content: '';
    display: block;
  }
  ${media.tablet`
    border: none;
    ${props =>
      props.marginLeft &&
      `
        margin-left: auto;
    `};
  `};
`;

const PriceContainer = styled.div`
  display: block;
  width: 100%;
  max-width: 263px;
  box-sizing: border-box;
  padding: 10%;
  text-align: center;
  margin: auto;

  ${media.tablet`
    max-width: 100%;
    padding: 0;
    border: none;
    text-align: left;
  `};
`;

const Image = styled.img`
  width: 100%;
`;

const ImageWrap = styled.div`
  display: block;
  width: 100%;
  max-width: 108px;
  text-align: center;
  margin: auto;
  ${media.tablet`
    float: left;
    margin: 0 ${Dimens.medium2_32}px auto 0;
  `};
  ${media.phone`
    float: left;
    margin: 0 ${Dimens.medium}px auto 0;
  `};
  ${media.phoneSmall`
    max-width: 95px;
  `};
`;

const TitleWrap = styled.div`
  margin-top: ${Dimens.small2}px;
  font-size: ${FontSizes.medium}px;
  font-weight: bold;
  line-height: normal;
  ${media.tablet`
    margin-top: 0;
    font-size: ${FontSizes.small}px;
  `};
`;

const Caption = styled.div`
  width: 100%;
  margin-top: ${Dimens.small_10}px;
  ${media.tablet`
    margin-top: ${Dimens.xxsmall_5}px;
    font-size: ${FontSizes.small_12}px;
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
  margin-top: ${Dimens.small_10}px;
  ${media.tablet`
    margin-top: ${Dimens.xxsmall_5}px;
  `};
`;

export default ({
  detail,
  image,
  title,
  price,
  caption,
  error,
  onChange,
  placeholder,
  marginLeft,
}) =>
  detail ? (
    <Container detail marginLeft={marginLeft}>
      <PriceContainer>
        <ImageWrap>
          <Image src={image} alt="img-space-price" />
        </ImageWrap>
        <TitleWrap>{title}</TitleWrap>
        <Caption>
          <InlineText.Base
            color={Colors.darkGray2}
            fontSize={FontSizes.small}
            fontSizeSp={FontSizes.small_12}
          >
            {caption}
          </InlineText.Base>
          <PriceWrapper>{`${price}円`}</PriceWrapper>
        </Caption>
      </PriceContainer>
    </Container>
  ) : (
    <Container>
      <PriceContainer>
        <ImageWrap>
          <Image src={image} alt="img-space-price" />
        </ImageWrap>
        <TitleWrap>{title}</TitleWrap>
        <Caption>
          <InlineText.Base color={Colors.darkGray2} fontSize={FontSizes.small}>
            {caption}
          </InlineText.Base>
          <PriceWrapper>{`${price}円`}</PriceWrapper>
        </Caption>
        <InputWrapper>
          <InputForm
            type="tel"
            unit="円"
            value={price}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
          />
        </InputWrapper>
        {error}
      </PriceContainer>
    </Container>
  );
