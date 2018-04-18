// @flow

import React from 'react';
import styled from 'styled-components';
import Card from 'components/atomic/atoms/Card';
import InlineText from 'components/atomic/atoms/InlineText';
import TextLink from 'components/atomic/atoms/TextLink';
import { Colors } from 'variables';

function estimateDateFormat(date) {
  return date.toLocaleDateString('ja-JP-u-ca-japanese', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const Text = InlineText.Base.extend`
  display: block;
  font-size: 14px;
`;

const CaptionWrapper = styled.div`
  margin-top: 24px;
`;

const LinkWrapper = styled.div`
  text-align: right;
  margin-top: 24px;
`;

const DateWrapper = styled.div`
  text-align: right;
  margin-top: 8px;
`;

type PropTypes = {
  name: string,
  beginAt: string,
  endAt: string,
  price: string,
  paymentLink: string,
  receivedAt: string,
};

export default (props: PropTypes) => (
  <div>
    <Card block noBorder background={Colors.lightGreen}>
      <Text>{props.name} さんからのお見積もり</Text>
      <Text>利用開始日：{estimateDateFormat(props.beginAt)}</Text>
      <Text>利用終了日：{estimateDateFormat(props.endAt)}</Text>
      <Text>料金：{props.price}</Text>
      <CaptionWrapper>
        <Text>
          お支払い期限は見積もり発行後より24時間です。もし24時間が経過してしまった場合は、ホストへ再度お見積もり送付を依頼してください。
        </Text>
      </CaptionWrapper>
      <LinkWrapper>
        <TextLink href={props.paymentLink}>この見積もりでお支払いに進む</TextLink>
      </LinkWrapper>
    </Card>
    <DateWrapper>
      <InlineText.Emphasis>{props.receivedAt}</InlineText.Emphasis>
    </DateWrapper>
  </div>
);
