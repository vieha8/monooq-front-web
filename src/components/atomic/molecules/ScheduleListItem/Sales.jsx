// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/atoms/InlineText';
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

const Sales = LabelContainer.extend`
  text-align: right;
  font-weight: bold;
  color: ${Colors.black};
`;

type PropTypes = {
  salesAmount: string,
};

export default (props: PropTypes) => (
  <Container>
    <LabelContainer>
      <div>
        <InlineText.Base>売上</InlineText.Base>
      </div>
      <div>
        <InlineText.EmphasisTiny>
          サービス利用手数料を引いた金額が表示されています。
        </InlineText.EmphasisTiny>
      </div>
    </LabelContainer>
    <Sales>
      <InlineText.Base>{props.salesAmount} 円</InlineText.Base>
    </Sales>
  </Container>
);
