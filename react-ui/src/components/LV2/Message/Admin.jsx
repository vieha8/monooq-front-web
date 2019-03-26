// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from 'components/LV1/Card';
import InlineText from 'components/LV1/InlineText';
import { Colors } from 'variables';

const DateWrapper = styled.div`
  text-align: right;
  margin-top: 8px;
`;

type PropTypes = {
  message: string,
  receivedAt: string,
  link: {
    text: string,
    url: string,
  },
};

export default (props: PropTypes) => (
  <div>
    <Card block noBorder background={Colors.lightGreen} isPadding={14}>
      <InlineText.Base fontSize={15}>{props.message}</InlineText.Base>
      <InlineText.Base fontSize={15}>
        <Link to={props.link.url || ''}>{props.link.text || ''}</Link>
      </InlineText.Base>
    </Card>
    <DateWrapper>
      <InlineText.EmphasisTiny>{props.receivedAt || ' '}</InlineText.EmphasisTiny>
    </DateWrapper>
  </div>
);
