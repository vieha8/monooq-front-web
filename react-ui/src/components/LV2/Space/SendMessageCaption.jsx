import React from 'react';
import numeral from 'numeral';
import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import InlineText from 'components/LV1/Texts/InlineText';

const Wrap = styled.div`
  width: 100%;
  display: inline-block;
  margin-left: -${Dimens.medium}px;
  text-align: center;
  line-height: normal;
`;

const Price = styled.span`
  font-size: ${FontSizes.medium1}px;
  font-weight: bold;
`;

const Unit = styled.div``;

export default ({ priceTatami, priceFull }) => (
  <Wrap>
    <Price>{`${numeral(priceTatami).format('0,0')}〜${numeral(priceFull).format('0,0')}`}</Price>
    <InlineText.Base fontSize={FontSizes.small_12} bold>
      &nbsp;円/月
    </InlineText.Base>
    <Unit>
      <InlineText.EmphasisTiny>1畳あたり</InlineText.EmphasisTiny>
    </Unit>
  </Wrap>
);
