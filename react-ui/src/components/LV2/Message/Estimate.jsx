import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import Card from 'components/LV1/Card';
import Button from 'components/LV1/Forms/Button';
import InlineText from 'components/LV1/Texts/InlineText';
import { Dimens, Colors } from 'variables';
import { formatAddComma, formatName } from 'helpers/string';

const PAYTYPE_CREDITCARD = 1;
const PAYTYPE_BANK = 2;
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
    case PAYTYPE_BANK:
      resultPayType = '銀行振込';
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
        case PAYTYPE_BANK:
          messagePayInfo =
            '※入金確認後にステータスが反映されます。土日祝日または銀行営業時間外にお振込みの場合、翌銀行営業日に入金確認を行います。';
          break;
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
}) => (
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
          <InlineText.Base fontSize={17} bold>
            ■お支払い情報
          </InlineText.Base>
          <br />
          {getPayInfo(payType, status)}
          <br />
          <br />
          <InlineText.Base fontSize={17} bold>
            ■ゲストの方
          </InlineText.Base>
          <br />
          お見積もり内容に問題がなければ料金を支払いましょう。
          <br />
          <ButtonPaymentWrap>{buttonPayment(host, status, payType, paymentLink)}</ButtonPaymentWrap>
          <br />
          {getDescriptionPay(payType, econtextUrl)}
          <br />
          <br />
          <InlineText.Base fontSize={17} bold>
            ■ホストの方
          </InlineText.Base>
          <br />
          期間や料金に変更があった場合は、新しくお見積もりを発行してください。
          <br />
          <br />
          <Caution>モノオク上でお支払い手続きを行わない場合、保険が適応されません。</Caution>
          <br />
          <br />
          <Caution bold>
            【お知らせ】
            <br />
            2019年12月15日(日)をもって、銀行振込による決済を終了いたします。
            <br />
            2019年12月16日(月)以降、新規で契約される方は、クレジットカード決済およびコンビニ・Pay-easy決済にてお支払いいただきますよう、よろしくお願いいたします。
            <br />
            ※現在契約中で銀行振込にてお支払いの方は、取引完了まで銀行振込にてお支払いいただけます。
          </Caution>
        </Text>
      </CaptionWrapper>
    </Card>
    <DateWrapper>
      <InlineText.EmphasisTiny>{receivedAt}</InlineText.EmphasisTiny>
    </DateWrapper>
  </Fragment>
);
