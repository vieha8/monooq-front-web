import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from 'components/LV1/Card';
import Button from 'components/LV1/Forms/Button';
import InlineText from 'components/LV1/Texts/InlineText';
import { Colors } from 'variables';
import { formatAddComma, formatName } from 'helpers/string';

const PAYTYPE_CREDITCARD = 1;
const PAYTYPE_ECONTEXT = 4;
const STATUS_PAY_ESTIMATE = 'estimate';
const STATUS_PAY_WAITING = 'waiting';
const STATUS_PAY_PAID = 'paid';

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
  ${props =>
    props.bold &&
    `
      font-weight: bold;
    `};
`;

const ButtonWrap = styled.div`
  max-width: 170px;
`;

const ButtonLinkStyled = styled(Link)`
  color: ${Colors.white};
  &:hover,
  &:active {
    color: ${Colors.white};
  }
`;

const PaymentUrl = styled.a`
  word-break: break-all;
`;

const buttonPayment = (host, status, payType, paymentLink) => {
  if (host || (payType !== 1 && status === STATUS_PAY_WAITING) || status === STATUS_PAY_PAID) {
    return (
      <ButtonWrap>
        <Button primary fontbold center fill={1} disabled>
          お支払い画面に進む
        </Button>
      </ButtonWrap>
    );
  }

  return (
    <ButtonWrap>
      <Button primary fontbold center fill={1}>
        <ButtonLinkStyled to={paymentLink}>お支払い画面に進む</ButtonLinkStyled>
      </Button>
    </ButtonWrap>
  );
};

const getPayInfo = (payType, status) => {
  let resultPayType = '';
  let resultStatus = '';
  let messagePayInfo = '※最新のステータスが反映されるまで時間がかかる場合があります。';

  switch (payType) {
    case PAYTYPE_CREDITCARD:
      if (status === STATUS_PAY_PAID) {
        resultPayType = 'クレジットカード決済';
      } else {
        resultPayType = '未選択';
      }
      break;
    case PAYTYPE_ECONTEXT:
      resultPayType = 'コンビニ払い・Pay-easy決済';
      break;
    default:
      resultPayType = '未選択';
  }

  switch (status) {
    case STATUS_PAY_ESTIMATE:
    case STATUS_PAY_WAITING:
      resultStatus = 'お支払い待ち';
      break;
    case STATUS_PAY_PAID:
      resultStatus = 'お支払い完了';

      switch (payType) {
        case PAYTYPE_ECONTEXT:
          messagePayInfo =
            '※お支払い後、モノオクサービス上で決済完了通知が反映されるまでに2時間程度のお時間をいただきます。';
          break;
        default:
      }

      break;
    default:
  }

  return (
    <Fragment>
      お支払い方法：
      {resultPayType}
      <br />
      お支払いステータス：
      {resultStatus}
      <br />
      {messagePayInfo}
    </Fragment>
  );
};

const getDescriptionPay = (payType, econtextUrl) => {
  let result;
  switch (payType) {
    case 1:
      result = (
        <Fragment>
          ※2ヶ月以上ご利用の場合は、毎月の利用料をクレジットカードで自動的にお支払いいただくことが可能です。
          <br />
          ご希望の場合は、ひと月分の利用料をクレジットカードでお支払いの上、
          <a href="mailto:support@monooq.com">support@monooq.com</a>
          までご連絡ください。
          <br />
          このお見積もりがひと月分でない場合は、ホストにお見積もりを再発行してもらい、お支払いいただくようお願いいたします。
        </Fragment>
      );
      break;
    case 4:
      result = (
        <Fragment>
          下記からお支払い画面に移動し、お支払いをお願いします。
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
};

const isPaymentLimitOver = (date, status) => {
  if (status === 'paid') {
    return false;
  }

  const limit = new Date(date);
  limit.setDate(limit.getDate() + 10);
  const now = new Date().getTime();

  return limit.getTime() < now;
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
  payType, // 1:クレジットカード 4:イーコンテクスト
  econtextUrl,
  createdAt,
}) => (
  <Fragment>
    <Card block borderColor={Colors.brandPrimary} padding={24} paddingSp={14}>
      <Text>{host ? '【見積もりを送りました】' : '【見積もりが届きました】'}</Text>
      {!host && <Text>{`${formatName(name)}さんからのお見積もり`}</Text>}
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
          {host ? (
            isPaymentLimitOver(createdAt, status) ? (
              <Caution>
                この見積もりは支払期限を過ぎています。もう一度見積もりを提出しましょう。
              </Caution>
            ) : (
              <Fragment>
                期間や料金に変更があった場合は、新しくお見積もりを発行してください。
              </Fragment>
            )
          ) : isPaymentLimitOver(createdAt, status) ? (
            <Caution>支払期限を過ぎています。ホストに再度見積もりを出してもらいましょう。</Caution>
          ) : (
            <Fragment>
              見積もり内容を確認し、開始日までにお支払いしましょう。支払いを完了すると契約成立し、スペース住所をお知らせします。
              <br />
              <ButtonPaymentWrap>
                {buttonPayment(host, status, payType, paymentLink)}
              </ButtonPaymentWrap>
              <br />
              {getDescriptionPay(payType, econtextUrl)}
            </Fragment>
          )}
          <br />
          <br />
          {!isPaymentLimitOver(createdAt, status) && (
            <Fragment>
              <InlineText.Base fontSize={17} bold>
                ■お支払い情報
              </InlineText.Base>
              <br />
              {getPayInfo(payType, status)}
              <br />
              <br />
              <Caution>モノオク上でお支払い手続きを行わない場合、保険が適応されません。</Caution>
            </Fragment>
          )}
        </Text>
      </CaptionWrapper>
    </Card>
    <DateWrapper>
      <InlineText.EmphasisTiny>{receivedAt}</InlineText.EmphasisTiny>
    </DateWrapper>
  </Fragment>
);
