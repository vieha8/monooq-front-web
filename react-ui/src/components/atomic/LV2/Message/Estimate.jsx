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

const Text = styled(InlineText.Base)`
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
  id: string,
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
      <Text>
        ID：
        {props.id}
      </Text>
      <Text>
        利用開始日：
        {estimateDateFormat(props.beginAt)}
      </Text>
      <Text>
        利用終了日：
        {estimateDateFormat(props.endAt)}
      </Text>
      <Text>
        料金：
        {props.price} 円
      </Text>
      <CaptionWrapper>
        <Text>
          もしも期間や料金に変更があった場合は、ホストが新しいお見積りの発行をしてください。
          モノオクでの決済履歴がない場合は保険が適応されません。※現在はクレジットカード(VISA、MasterCard)のみお支払い可能です。
          それ以外の方法をご希望の場合は
          <a href="mailto:info@monooq.com">info@monooq.com</a>
          までご連絡ください。
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
