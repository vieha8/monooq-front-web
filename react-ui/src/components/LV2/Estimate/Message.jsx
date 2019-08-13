// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
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

const Text = styled(InlineText.Base)`
  display: block;
  line-height: 2;
`;

type PropTypes = {
  beginAt: string,
  endAt: string,
  duration: string,
  price: string,
};

export default ({ beginAt, endAt, duration, price }: PropTypes) => (
  <div>
    <Row>
      <Text>利用スケジュール</Text>
      <Text>{`${beginAt}〜${endAt}`}</Text>
    </Row>
    <Row borderTop borderBottom>
      <Text>期間</Text>
      <Text>
        {duration}
        日間
      </Text>
    </Row>
    <Row>
      <Text>見積もり金額</Text>
      <Text>
        {price}
        円（税込）
      </Text>
    </Row>
  </div>
);
