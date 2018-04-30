// @flow

import React from 'react';
import styled from 'styled-components';
import Card from 'components/atomic/LV1/Card';
import InlineText from 'components/atomic/LV1/InlineText';
import { Colors } from 'variables';

const DateWrapper = styled.div`
  text-align: right;
  margin-top: 8px;
`;

type PropTypes = {
  message: string,
  receivedAt: string,
};

export default (props: PropTypes) => (
  <div>
    <Card block noBorder background={Colors.lightGreen}>
      <InlineText.Base fontSize={14}>{props.message}</InlineText.Base>
    </Card>
    <DateWrapper>
      <InlineText.EmphasisTiny>{props.receivedAt || ' '}</InlineText.EmphasisTiny>
    </DateWrapper>
  </div>
);
