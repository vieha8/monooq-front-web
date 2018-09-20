// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import { Colors } from 'variables';

const Row = styled.div`
  ${props =>
    props.borderTop &&
    `
    border-top: 1px solid ${Colors.borderGray};
  `} ${props =>
    props.borderBottom &&
    `
    border-bottom: 1px solid ${Colors.borderGray};
  `}
  padding: 8px 0;
`;

const Text = InlineText.Base.extend`
  display: block;
  line-height: 2;
`;

type PropTypes = {
  beginAt: string,
  endAt: string,
  duration: string,
  price: string,
};

export default (props: PropTypes) => (
  <div>
    <Row>
      <Text>利用スケジュール</Text>
      <Text>
        {props.beginAt}〜{props.endAt}
      </Text>
    </Row>
    <Row borderTop borderBottom>
      <Text>期間</Text>
      <Text>{props.duration}日間</Text>
    </Row>
    <Row>
      <Text>見積もり金額</Text>
      <Text>{props.price}円（税込）</Text>
    </Row>
  </div>
);
