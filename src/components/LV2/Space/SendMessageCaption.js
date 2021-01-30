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

const Unit = styled.div`
  ${props =>
    props.tatami &&
    `
    margin-bottom: ${Dimens.small}px;
  `};
`;

export default ({ priceTatami, priceFull }) => (
  <Wrap>
    {priceTatami !== null && priceTatami > 0 && priceFull > priceTatami && (
      <Unit tatami>
        <InlineText.EmphasisTiny>1畳あたり</InlineText.EmphasisTiny>
        <br />
        <Price>{`${numeral(priceTatami).format('0,0')}`}</Price>
        <InlineText.Base fontSize={FontSizes.small_12} bold>
          &nbsp;円/月
        </InlineText.Base>
      </Unit>
    )}
    <Unit>
      <InlineText.EmphasisTiny>全て利用</InlineText.EmphasisTiny>
      <br />
      <Price>{`${numeral(priceFull).format('0,0')}`}</Price>
      <InlineText.Base fontSize={FontSizes.small_12} bold>
        &nbsp;円/月
      </InlineText.Base>
    </Unit>
  </Wrap>
);
