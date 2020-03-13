import React, { Fragment } from 'react';
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

const PaymentUrl = styled.a`
  word-break: break-all;
`;

const buttonPayment = (host, status, payType, isOpenModalError, onClickPayment) => {
  if (
    host ||
    (payType !== 1 && status === STATUS_PAY_WAITING) ||
    status === STATUS_PAY_PAID ||
    isOpenModalError
  ) {
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
      <Button onClick={onClickPayment} primary fontbold center fill={1}>
        お支払い画面に進む
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
          ※2ヶ月以上の長期でご利用の場合は、1ヶ月ごとに利用料を決済する「月額決済」がおすすめです。
          <br />
          月額決済をご希望の場合は、ホストに初月1ヶ月分の見積もりを発行してもらい、決済をしてください。
          <br />
          初月分の利用料をカード決済した方は、下記より月額自動決済を申請していただくと、翌月分からは自動決済ができます。
          <br />
          <a href="https://form.run/@monthly-request" target="_blank" rel="noopener noreferrer">
            ▶月額自動決済の申し込み
          </a>
          <br />
          <br />
          <Caution>
            月額自動決済の申し込みは、必ずモノオク上での決済が完了した後に行ってください。
          </Caution>
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
  receivedAt,
  payType, // 1:クレジットカード 4:イーコンテクスト
  econtextUrl,
  isOpenModalError,
  onClickPayment,
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
            isPaymentLimitOver(beginAt, status) ? (
              <Caution>
                この見積もりは支払期限を過ぎています。もう一度見積もりを提出しましょう。
              </Caution>
            ) : (
              <Fragment>
                期間や料金に変更があった場合は、新しくお見積もりを発行してください。
              </Fragment>
            )
          ) : isPaymentLimitOver(beginAt, status) ? (
            <Caution>支払期限を過ぎています。ホストに再度見積もりを出してもらいましょう。</Caution>
          ) : (
            <Fragment>
              見積もり内容を確認し、開始日までにお支払いしましょう。支払いを完了すると契約成立し、スペース住所をお知らせします。
              <br />
              <ButtonPaymentWrap>
                {buttonPayment(host, status, payType, isOpenModalError, onClickPayment)}
              </ButtonPaymentWrap>
              <br />
              {getDescriptionPay(payType, econtextUrl)}
            </Fragment>
          )}
          <br />
          <br />
          {!isPaymentLimitOver(beginAt, status) && (
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
