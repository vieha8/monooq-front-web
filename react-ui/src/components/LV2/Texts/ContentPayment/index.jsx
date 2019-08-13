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
    `};
  ${props =>
    props.borderBottom &&
    `
    border-bottom: 1px solid ${Colors.borderGray};
  `};
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
  noDescription?: boolean,
};

export default ({ beginAt, endAt, duration, price, noDescription }: PropTypes) => (
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
      <Text>お支払い金額</Text>
      <Text>
        {price}
        円（税込）
      </Text>
    </Row>
    {!noDescription && (
      <Row>
        <InlineText.EmphasisTiny>
          ※無断でのスペース利用延長は荷物を引き取る意思がないとみなし、利用規約に基づき荷物の引き取り費用5万円と処分に要した費用全額を請求いたします。
        </InlineText.EmphasisTiny>
      </Row>
    )}
  </div>
);
