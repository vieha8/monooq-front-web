import React, { Fragment } from 'react';
import styled from 'styled-components';
import Card from 'components/LV1/Card';
import Button from 'components/LV1/Forms/Button';
import InlineText from 'components/LV1/Texts/InlineText';
import { Colors } from 'variables';
import { formatAddComma, formatName } from 'helpers/string';

const IS_UNDECIDED_TRUE = 1;
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

const getPayInfo = (payType, status, isMonthly) => {
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
      {status === STATUS_PAY_PAID && (
        <Fragment>
          <br />
          お支払い回数：
          {isMonthly === 1 ? '月額払い' : '一括払い'}
        </Fragment>
      )}
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
          ※お支払い画面では「月々自動払い」「一括払い」のいずれかを選択できます。
          <br />
          <br />
          ※月々自動払いを選択された場合、翌月以降の利用料は更新日に自動決済されます。月々自動払いはクレジットカード決済のみ対応しております。
          <br />
          <br />
          ※利用終了日が未定の場合は、一括決済を選択した場合でもひと月分のお支払いとなります。翌月以降もスペースを利用する場合は、再度ホストからお見積もりをもらいお支払い手続きを行なってください。
          <br />
          <br />
          ※ご都合により予定していた利用期間を短縮することになった場合、月々自動払いでお支払いのお取引のみ引き取りを早めた日数分の返金が可能です。一括払いの取引では返金でき兼ねますので、長期利用や予定が確定されていない方は月々自動払いをおすすめいたします。
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
  isUndecided,
  usagePeriod,
  price,
  fee,
  host,
  status,
  receivedAt,
  payType, // 1:クレジットカード 4:イーコンテクスト
  isMonthly, // 0:一括 1:月額
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
        {isUndecided === IS_UNDECIDED_TRUE ? '未定' : `${endAt}`}
      </Text>
      {usagePeriod && (
        <Text>
          ご利用の期間：
          {isUndecided === IS_UNDECIDED_TRUE ? '未定' : `${usagePeriod}ヶ月`}
        </Text>
      )}
      <Text>
        お支払い金額合計：
        {`${formatAddComma(price + fee)}円`}
        {usagePeriod > 0 && (
          <Fragment>
            <br />
            ひと月あたりの金額：
            {`${formatAddComma(String(Math.floor((price + fee) / usagePeriod)))}円`}
          </Fragment>
        )}
        {fee > 0 && (
          <Fragment>
            <br />
            (スペース利用料
            {formatAddComma(price)}円 + サービス利用料{formatAddComma(fee)}円)
          </Fragment>
        )}
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
              見積もり内容を確認し、お支払いに進みましょう。支払いを完了すると利用契約が成立し、スペース住所が表示されます。
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
              {getPayInfo(payType, status, isMonthly)}
              <br />
              <br />
              <Caution>保険適応のため、必ずモノオクサービス上でお支払いください。</Caution>
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
