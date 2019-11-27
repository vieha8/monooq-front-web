import React from 'react';
import styled from 'styled-components';
import Button from 'components/LV1/Forms/Button';
import InlineText from 'components/LV1/Texts/InlineText';
import { Dimens, FontSizes } from 'variables';

const Wrap = styled.div`
  display: flex;
`;

const Caption = styled.div`
  width: 100%;
  display: inline-block;
  margin-top: ${Dimens.small_10}px;
  margin-left: -${Dimens.medium}px;
  text-align: center;
`;

const Price = styled.span`
  font-size: ${FontSizes.medium_18}px;
  font-weight: bold;
`;

const Unit = styled.div``;

const ButtonWrap = styled.div`
  display: inline-block;
  min-width: 200px;
`;

export default ({ priceTatami, disabled, loading, onClick, onKeyDownButtonMessage }) => (
  <Wrap>
    <Caption>
      <Price>{priceTatami}</Price>
      <InlineText.Base fontSize={FontSizes.small_12} bold>
        &nbsp;円/月
      </InlineText.Base>
      <Unit>
        <InlineText.EmphasisTiny>一畳あたり</InlineText.EmphasisTiny>
      </Unit>
    </Caption>
    <ButtonWrap>
      <Button
        center
        primary
        fontbold
        fill={1}
        disabled={disabled}
        loading={loading}
        onClick={onClick}
        onKeyDown={onKeyDownButtonMessage}
      >
        リクエストを送る
      </Button>
    </ButtonWrap>
  </Wrap>
);
