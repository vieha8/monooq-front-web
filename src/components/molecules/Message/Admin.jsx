// @flow

import React from 'react';
import styled from 'styled-components';
import Card from 'components/atoms/Card';
import InlineText from 'components/atoms/InlineText';
import { Colors } from 'variables';

const DateWrapper = styled.div`
  text-align: right;
  margin-top: 8px;
`;

type PropTypes = {
  message: string,
  receivedAt: string,
}

export default (props: PropTypes) => (
  <div>
    <Card block noBorder background={Colors.lightGreen}>
      <InlineText.Base fontSize={14}>{props.message}</InlineText.Base>
    </Card>
    <DateWrapper>
      <InlineText.Emphasis>{props.receivedAt}</InlineText.Emphasis>
    </DateWrapper>
  </div>
);
