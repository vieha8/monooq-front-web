// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import Card from 'components/LV1/Card';
import InlineText from 'components/LV1/InlineText';
import Button from 'components/LV1/Button';
import { Colors } from 'variables';
import { formatAddComma, formatName } from 'helpers/string';

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

const ButtonPaymentWrap = styled.div`
  margin-top: 5px;
`;

const DateWrapper = styled.div`
  text-align: right;
  margin-top: 8px;
`;

const Caution = styled.span`
  color: ${Colors.error};
`;

const ButtonWrap = styled.div`
  max-width: 170px;
`;

const ButtonLinkStyled = styled.a`
  color: ${Colors.white};
  &:hover {
    color: ${Colors.white};
  }
`;

function buttonPayment(host, status, paymentLink) {
  if (host) {
    return (
      <ButtonWrap>
        <Button primary fontbold center fill={1} disabled>
          お支払い画面に進む
        </Button>
      </ButtonWrap>
    );
  }

  if (status === 'paid') {
    return (
      <Fragment>
        <ButtonWrap>
          <Button primary fontbold center fill={1} disabled>
            お支払い画面に進む
          </Button>
        </ButtonWrap>
        <Text>※お支払い済み</Text>
      </Fragment>
    );
  }

  return (
    <ButtonWrap>
      <Button primary fontbold center fill={1}>
        <ButtonLinkStyled href={paymentLink}>お支払い画面に進む</ButtonLinkStyled>
      </Button>
    </ButtonWrap>
  );
}

type PropTypes = {
  name: string,
  id: string,
  beginAt: Date,
  endAt: Date,
  price: string,
  host: boolean,
  status: string,
  paymentLink: string,
  receivedAt: string,
};

export default ({
  name,
  id,
  beginAt,
  endAt,
  price,
  host,
  status,
  paymentLink,
  receivedAt,
}: PropTypes) => (
  <div>
    <Card block noBorder background={Colors.lightGreen} isPadding={14}>
      <Text>{`${formatName(name)}さんからのお見積もり`}</Text>
      <Text>
        ID：
        {id}
      </Text>
      <Text>
        利用開始日：
        {estimateDateFormat(beginAt)}
      </Text>
      <Text>
        利用終了日：
        {estimateDateFormat(endAt)}
      </Text>
      <Text>
        料金：
        {`${formatAddComma(price)}円`}
      </Text>
      <CaptionWrapper>
        <Text>
          ＜ユーザーの方＞
          <br />
          見積もり内容に問題がなければ、決済に進みましょう。
          <br />
          クレジットカード(VISA、MasterCard)または、銀行振込での決済が可能です。
          <br />
          <br />
          ■クレジットカード決済をご希望の場合
          <br />
          お支払い画面から決済を行ってください。
          <br />
          <ButtonPaymentWrap>{buttonPayment(host, status, paymentLink)}</ButtonPaymentWrap>
          <br />
          <br />
          ■銀行振込をご希望の場合
          <br />
          下記口座にお振込後、
          <a href="mailto:support@monooq.com">support@monooq.com</a>
          まで振込明細の写真とモノオクで登録しているメールアドレスをお送りください。
          <br />
          <br />
          <InlineText.Bold>
            みずほ銀行 渋谷中央支店
            <br />
            普通 1806441 モノオク(カ
          </InlineText.Bold>
          <br />
          <br />
          <br />
          ※長期利用（2ヶ月以上）の場合は、クレジットカードでの月額自動支払いにも対応しております。ご希望の場合は、初月利用料をクレジット決済の上、
          <a href="mailto:support@monooq.com">support@monooq.com</a>
          までご連絡ください。現状の見積もりが初月分の内容でない場合は、ホストに見積もりを再発行してもらい、決済を行ってください。
          <br />
          <br />
          <br />
          ＜ホストの方＞
          <br />
          期間や料金に変更があった場合は、新しく見積りを発行してください。
          <br />
          <br />
          <Caution>モノオク上で決済を行わない場合、保険が適応されません。</Caution>
          <br />
        </Text>
      </CaptionWrapper>
    </Card>
    <DateWrapper>
      <InlineText.EmphasisTiny>{receivedAt}</InlineText.EmphasisTiny>
    </DateWrapper>
  </div>
);
