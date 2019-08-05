// @flow

import React from 'react';
import styled from 'styled-components';
import numeral from 'numeral';
import InlineText from 'components/LV1/Texts/InlineText';
import { Colors, Dimens } from 'variables';

const Container = styled.div`
  display: table;
  width: 100%;
  margin-top: ${Dimens.medium}px;
  border-top: 1px solid ${Colors.borderGray};
  padding: ${Dimens.medium}px ${Dimens.xsmall}px;
`;

const LabelContainer = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const Sales = styled(LabelContainer)`
  text-align: right;
  font-weight: bold;
  color: ${Colors.black};
`;

type PropTypes = {
  paid?: boolean,
  amount: number,
};

const salesFormat = price => {
  const fee = 0.2;
  const rate = 1 - fee;
  const priceMinusFee = Math.round(price * rate);
  return numeral(priceMinusFee).format('0,0');
};

export default ({ paid, amount }: PropTypes) => (
  <Container>
    <LabelContainer>
      <div>
        <InlineText.Base>{paid ? '料金' : '売上'}</InlineText.Base>
      </div>
      {!paid && (
        <div>
          <InlineText.EmphasisTiny>
            サービス利用手数料20%を引いた金額が表示されています。
          </InlineText.EmphasisTiny>
        </div>
      )}
    </LabelContainer>
    <Sales>
      <InlineText.Base>{`${salesFormat(amount)}円`}</InlineText.Base>
    </Sales>
  </Container>
);
