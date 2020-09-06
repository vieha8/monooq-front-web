import React, { Fragment } from 'react';
import styled from 'styled-components';
import Card from 'components/LV1/Card';
import Button from 'components/LV1/Forms/Button';
import InlineText from 'components/LV1/Texts/InlineText';
import { Colors } from 'variables';
import { formatAddComma } from 'helpers/string';

const STATUS_PAY_ESTIMATE = 'estimate';
const STATUS_PAY_WAITING = 'waiting';
const STATUS_PAY_WAITING_EXPIRRED = 'waitingExpired';
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
    let resultStatus = 'お支払い中';
    switch (status) {
      case STATUS_PAY_PAID:
        resultStatus = 'お支払い完了';
        break;
      default:
    }
    return (
      <Fragment>
        <ButtonWrap>
          <Button primary fontbold center fill={1} disabled>
            {resultStatus}
          </Button>
        </ButtonWrap>
        {payType !== 4 && (
          <Fragment>
            <br />
            以降、1ヶ月毎に料金が引き落としされます。
          </Fragment>
        )}
      </Fragment>
    );
  }

  return (
    <ButtonWrap>
      <Button onClick={onClickPayment} primary fontbold center fill={1}>
        お支払いに進む
      </Button>
    </ButtonWrap>
  );
};

const getPayInfo = (payType, status) => {
  let resultStatus = '';

  switch (status) {
    case STATUS_PAY_ESTIMATE:
    case STATUS_PAY_WAITING:
    case STATUS_PAY_WAITING_EXPIRRED:
      resultStatus = 'お支払い待ち';
      break;
    case STATUS_PAY_PAID:
      resultStatus = 'お支払い完了';
      break;
    default:
  }

  return (
    <Fragment>
      支払い状況：
      {resultStatus}
    </Fragment>
  );
};

const isPaymentLimitOver = (date, status) => {
  if (status === 'paid' || status === 'waitingExpired') {
    return false;
  }

  const limit = new Date(date);
  limit.setDate(limit.getDate() + 10);
  const now = new Date().getTime();

  return limit.getTime() < now;
};

export default ({
  id,
  beginAt,
  price,
  fee,
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
      <Text>
        <InlineText.Base fontSize={20} bold>
          {host ? '見積もりを送りました' : '見積もりが届きました'}
        </InlineText.Base>
      </Text>
      <br />
      <Text>
        見積もりID：
        {id}
      </Text>
      <Text>
        利用開始日：
        {beginAt}
      </Text>
      <Text>
        {host && 'ゲスト'}
        支払い料金：
        {`${formatAddComma(price + fee)}円/月`}
        {fee > 0 && (
          <Fragment>
            <br />
            {`(スペース料金${formatAddComma(price)}円 + ${
              host ? 'ゲスト' : ''
            }ゲスト利用料${formatAddComma(fee)}円)`}
          </Fragment>
        )}
      </Text>
      <CaptionWrapper>
        <Text>
          {!host && (
            <Fragment>
              この見積もりにお支払いすると、スペース利用契約が成立し詳細住所をお知らせします。
              <br />
              <br />
            </Fragment>
          )}
          {host && !isPaymentLimitOver(beginAt, status) && (
            <Fragment>
              {getPayInfo(payType, status)}
              {status !== STATUS_PAY_PAID && (
                <Fragment>
                  <br />
                  <br />
                </Fragment>
              )}
            </Fragment>
          )}
          {host ? (
            <Fragment>
              {isPaymentLimitOver(beginAt, status) ? (
                <Caution>
                  この見積もりは支払期限を過ぎています。もう一度見積もりを提出しましょう。
                </Caution>
              ) : (
                <Fragment>
                  {status !== STATUS_PAY_PAID &&
                    '料金を変更する場合、新しくお見積もりを発行してください。'}
                </Fragment>
              )}
            </Fragment>
          ) : (
            <Fragment>
              {isPaymentLimitOver(beginAt, status) ? (
                <Caution>
                  支払期限を過ぎています。ホストに再度見積もりを出してもらいましょう。
                </Caution>
              ) : (
                <Fragment>
                  {status !== STATUS_PAY_PAID && (
                    <Fragment>
                      見積もり内容を確認して決済しましょう。
                      <br />
                      支払いを完了すると利用契約が成立し、スペース住所が表示されます。
                      <br />
                      <br />
                    </Fragment>
                  )}
                  <ButtonPaymentWrap>
                    {buttonPayment(host, status, payType, isOpenModalError, onClickPayment)}
                  </ButtonPaymentWrap>
                  {payType === 4 && status !== STATUS_PAY_PAID && (
                    <Fragment>
                      <br />
                      下記からお支払い画面に移動し、お支払いをお願いします。
                      <br />
                      <br />
                      <PaymentUrl href={econtextUrl} target="_blank" rel="noopener noreferrer">
                        {econtextUrl}
                      </PaymentUrl>
                      <br />
                    </Fragment>
                  )}
                </Fragment>
              )}
            </Fragment>
          )}
          {status !== STATUS_PAY_PAID && (
            <Fragment>
              <br />
              <Caution>保険適応のため、必ずモノオクサービス上でお支払いください。</Caution>
              {payType === 4 && (
                <Fragment>
                  <br />
                  <Caution>
                    コンビニ支払いは、サービス内反映まで最大2時間ほどかかる場合がございます。
                  </Caution>
                </Fragment>
              )}
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
