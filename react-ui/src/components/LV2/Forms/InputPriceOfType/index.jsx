import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
import InputForm from 'components/LV2/Forms/InputForm';
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
  width: 100%;
  max-width: 263px;
  float: left;
  box-sizing: border-box;
  border-radius: ${Dimens.xxsmall_4}px;
  border: 1px solid ${Colors.borderGray};
  padding: ${Dimens.medium2}px;
  text-align: center;
  ${media.phone`
    max-width: 100%;
    float: none;
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
  ${media.phone`
    float: left;
    margin: 0 ${Dimens.medium2_32}px auto 0;
  `};
`;

const TitleWrap = styled.div`
  margin-top: ${Dimens.small2}px;
  font-size: ${FontSizes.medium}px;
  font-weight: bold;
  line-height: normal;
  ${media.phone`
    font-size: ${FontSizes.small}px;
  `};
`;

const Caption = styled.div`
  width: 100%;
  margin-top: ${Dimens.small_10}px;
  ${media.phone`
    margin-top: 0;
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
`;

export default ({ detail, image, title, price, caption, error, onChange, placeholder }) =>
  detail ? (
    <Container detail>
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
