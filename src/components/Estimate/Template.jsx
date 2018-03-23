import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  padding: 80px 0;
  max-width: 1024px;
  margin: 0 auto;
  &::after {
    clear: both;
    display: block;
    content: "";
  }
  ${media.tablet`
    padding: ${Dimens.medium}px;
  `}
`;

const ContentContainer = styled.div`
  display: table-cell;
  width: 60%;
  vertical-align: top;
  ${media.tablet`
    display: block;
    width: 100%;
  `}
`;

const TitleContainer = styled.div`
`;

const DatePickerTitleContainer = styled.div`
  margin-top: ${Dimens.medium3}px;
`;

const DatePickerContainer = styled.div`
`;

const PriceTitleContainer = styled.div`
  margin-top: ${Dimens.medium3}px;
`;

const PriceCaptionContainer = styled.div`
  margin-top: ${Dimens.medium1}px;
`;

const PriceInputContainer = styled.div`
  margin-top: ${Dimens.medium1}px;
`;

const CaptionInputContainer = styled.div`
  margin-top: ${Dimens.medium1}px;
`;

const ButtonContainer = styled.div`
  margin-top: ${Dimens.medium1}px;
`;

const HintPopupContainer = styled.div`
  display: table-cell;
  padding-top: 100px;
  width: 30%;
  padding-left: ${Dimens.large}px;
  ${media.tablet`
    display: none;
  `}
`;

export default props => (
  <Container>
    <ContentContainer>
      <TitleContainer>
        {props.title}
      </TitleContainer>
      <DatePickerTitleContainer>
        {props.datePickerTitle}
      </DatePickerTitleContainer>
      <DatePickerContainer>
        {props.datePicker}
      </DatePickerContainer>
      <PriceTitleContainer>
        {props.priceTitle}
      </PriceTitleContainer>
      <PriceCaptionContainer>
        {props.priceCaption}
      </PriceCaptionContainer>
      <PriceInputContainer>
        {props.priceInput}
      </PriceInputContainer>
      <CaptionInputContainer>
        {props.caption}
      </CaptionInputContainer>
      <ButtonContainer>
        {props.button}
      </ButtonContainer>
    </ContentContainer>
    <HintPopupContainer>
      {props.hint}
    </HintPopupContainer>
  </Container>
);
