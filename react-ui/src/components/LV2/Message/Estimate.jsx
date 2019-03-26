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

const Caution = styled.span`
  color: ${Colors.error};
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
  status: string,
};

export default (props: PropTypes) => (
  <div>
    <Card block noBorder background={Colors.lightGreen} isPadding={14}>
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
          期間や料金に変更があった場合は、ホストが新しく見積りを発行してください。
          <br />
          <br />
          現在はクレジットカード(VISA、MasterCard)のみ決済可能です。
          <br />
          下記をご希望の場合は
          <a href="mailto:support@monooq.com">support@monooq.com</a>
          までご連絡ください。
          <br />
          ・銀行振込
          <br />
          ・クレジットカードで1ヶ月ごとの月額自動引き落とし(長期利用の方、または1ヶ月あたりの料金が高額な方向け)
          <br />
          <br />
          <Caution>モノオク上で決済を行わない場合、保険が適応されません。</Caution>
          <br />
        </Text>
      </CaptionWrapper>
      {!props.host && (
        <LinkWrapper>
          {props.status !== 'paid' ? (
            <TextLink href={props.paymentLink}>この見積もりでお支払いに進む</TextLink>
          ) : (
            <Text>お支払い済み</Text>
          )}
        </LinkWrapper>
      )}
    </Card>
    <DateWrapper>
      <InlineText.EmphasisTiny>{props.receivedAt}</InlineText.EmphasisTiny>
    </DateWrapper>
  </div>
);
