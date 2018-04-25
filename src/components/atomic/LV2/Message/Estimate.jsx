// @flow

import React from 'react';
import styled from 'styled-components';
import Card from 'components/atomic/LV1/Card';
import InlineText from 'components/atomic/LV1/InlineText';
import TextLink from 'components/atomic/LV1/TextLink';
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
  host: boolean,
  name: string,
  beginAt: Date,
  endAt: Date,
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
      {!props.host && (
        <LinkWrapper>
          <TextLink href={props.paymentLink}>この見積もりでお支払いに進む</TextLink>
        </LinkWrapper>
      )}
    </Card>
    <DateWrapper>
      <InlineText.EmphasisTiny>{props.receivedAt}</InlineText.EmphasisTiny>
    </DateWrapper>
  </div>
);
