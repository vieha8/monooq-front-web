// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import Card from 'components/LV1/Card';
import InlineText from 'components/LV1/InlineText';
import Button from 'components/LV1/Button';
import { Dimens, Colors } from 'variables';
import { formatAddComma, formatName } from 'helpers/string';

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

const CmnWrap = styled.div`
  margin: ${Dimens.medium_20}px auto 0px;
  ${props =>
    props.noMarginSide &&
    `
    margin: ${Dimens.medium_20}px auto 0px;
  `}
  ${media.phone`
    margin: ${Dimens.medium_20}px auto 0px;
  `};
`;

const AccountNumber = styled.div`
  max-width: 250px;
  background-color: ${Colors.lightYellow};
  border-radius: ${Dimens.xsmall}px;
  margin: 0px auto;
  padding: ${Dimens.medium_20}px;
  text-align: center;
  line-height: 1.5rem;
  letter-spacing: 0.05em;
  font-weight: bold;
  border: 1px solid ${Colors.yellow};
`;

const PaymentUrl = styled.a`
  word-break: break-all;
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

  if (status === 'waiting' || status === 'paid') {
    return (
      <Fragment>
        <ButtonWrap>
          <Button primary fontbold center fill={1} disabled>
            お支払い画面に進む
          </Button>
        </ButtonWrap>
        <Text>{status === 'waiting' ? '※決済処理中' : '※お支払い済み'}</Text>
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

function getDescriptionPay(payType, econtextUrl) {
  let result;
  switch (payType) {
    case 1:
      result = (
        <Fragment>
          ※2ヶ月以上ご利用の場合は、毎月の利用料をクレジットカードで自動的にお支払いすることが可能です。
          <br />
          ご希望の場合は、ひと月分の利用料をクレジットカードでお支払いの上、
          <a href="mailto:support@monooq.com">support@monooq.com</a>
          までご連絡ください。
          <br />
          このお見積もりがひと月分でない場合は、ホストにお見積もりを再発行してもらい、決済を行いましょう。
        </Fragment>
      );
      break;
    case 2:
      result = (
        <Fragment>
          下記口座にお振込後、
          <a href="mailto:support@monooq.com?subject=銀行振込が完了しました&amp;body=こちらのメールに振込明細のお写真と、モノオクに登録しているメールアドレスをお送りください。">
            support@monooq.com
          </a>
          まで振込明細の写真とモノオクで登録しているメールアドレスをお送りください。
          <CmnWrap>
            <AccountNumber>
              みずほ銀行 渋谷中央支店
              <br />
              普通 1806441 モノオク(カ
            </AccountNumber>
          </CmnWrap>
        </Fragment>
      );
      break;
    case 4:
      result = (
        <Fragment>
          下記から決済画面に移動し、お支払いをお願いします。
          <br />
          <br />
          <PaymentUrl href={econtextUrl} target="_blank" rel="noopener noreferrer">
            {econtextUrl}
          </PaymentUrl>
        </Fragment>
      );
      break;
    default:
  }
  return result;
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
  payType?: number,
  econtextUrl?: string,
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
  payType, // 1:クレジットカード 2:銀行振込 4:イーコンテクスト
  econtextUrl,
}: PropTypes) => (
  <Fragment>
    <Card block noBorder background={Colors.lightGreen} isPadding={14}>
      <Text>{`${formatName(name)}さんからのお見積もり`}</Text>
      <Text>
        ID：
        {id}
      </Text>
      <Text>
        利用開始日：
        {beginAt}
      </Text>
      <Text>
        利用終了日：
        {endAt}
      </Text>
      <Text>
        料金：
        {`${formatAddComma(price)}円`}
      </Text>
      <CaptionWrapper>
        <Text>
          ■ユーザーの方
          <br />
          お見積もり内容に問題がなければ決済に進みましょう。
          <br />
          <ButtonPaymentWrap>{buttonPayment(host, status, paymentLink)}</ButtonPaymentWrap>
          <br />
          <br />
          {getDescriptionPay(payType, econtextUrl)}
          <br />
          <br />
          ■ホストの方
          <br />
          期間や料金に変更があった場合は、新しくお見積りを発行してください。
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
  </Fragment>
);
