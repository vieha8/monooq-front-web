import React from 'react';
import numeral from 'numeral';
import styled from 'styled-components';
import Button from 'components/LV1/Forms/Button';
import InlineText from 'components/LV1/Texts/InlineText';
import { Dimens, FontSizes } from 'variables';

const Wrap = styled.div`
  display: flex;
  max-width: 320px;
  margin: auto;
`;

const Caption = styled.div`
  width: 100%;
  display: inline-block;
  margin-left: -${Dimens.medium}px;
  text-align: center;
  line-height: ${Dimens.medium4}px;
  ${props =>
    props.isRoom &&
    `
      line-height: normal;
    `};
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

export default ({
  isRoom,
  priceFull,
  priceTatami,
  disabled,
  loading,
  onClick,
  onKeyDownButtonMessage,
}) => (
  <Wrap>
    <Caption isRoom={isRoom}>
      <Price>
        {isRoom ? numeral(priceTatami).format('0,0') : `〜${numeral(priceFull).format('0,0')}`}
      </Price>
      <InlineText.Base fontSize={FontSizes.small_12} bold>
        &nbsp;円/月
      </InlineText.Base>
      {isRoom && (
        <Unit>
          <InlineText.EmphasisTiny>一畳あたり</InlineText.EmphasisTiny>
        </Unit>
      )}
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
