import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import { formatAddComma } from 'helpers/string';
import InlineText from 'components/LV1/Texts/InlineText';

const iconBrandCredit =
  'https://monooq.imgix.net/img%2Fservice%2Ficon-brand-credit.png?auto=compress';
const iconCp = 'https://monooq.imgix.net/img%2Fservice%2Flogo-cp.png?auto=compress';

const METHOD_PAYMENT_CREDIT = 0;

const Wrap = styled.div`
  line-height: normal;
  margin: ${Dimens.medium_20}px auto;
  ${media.phone`
    margin: ${Dimens.medium_20}px auto;
  `};
`;

const PaymentPriceWrap = styled.div`
  margin: ${Dimens.medium}px auto ${Dimens.medium2_32}px;
`;

const CreditInfo = styled.div`
  margin: 0px auto ${Dimens.medium_20}px;
`;

const Item = styled.div`
  padding: ${Dimens.medium_20}px;
  border: 1px solid ${Colors.borderGray};
  border-radius: 4px;
  &:first-child {
    border-radius: 6px 6px 0px 0px;
    border-bottom: none;
  }
  &:last-child {
    border-radius: 0px 0px 6px 6px;
  }
  line-height: 1.5rem;
`;

const ImageBrandCredit = styled.img`
  max-width: 160px;
`;

const ImageCp = styled.img`
  max-width: 300px;
  ${media.phoneSmall`
    max-width: 100%;
  `};
`;

const HyperLink = styled.a`
  color: ${Colors.brandPrimary};
`;

const maskify = cc => {
  return cc.slice(0, -4).replace(/./g, '*') + cc.slice(-4);
};

const getPaymentPrice = (paymentMethod, checkedIndex, pricePlusFee, pricePlusFeeMonthly) => {
  let textPrice = `一括払い（${formatAddComma(pricePlusFee)}円の一括支払）`;
  if (paymentMethod === METHOD_PAYMENT_CREDIT) {
    if (checkedIndex === 0) {
      textPrice = `月々払い（${formatAddComma(pricePlusFeeMonthly)}円/月での自動引落）`;
    }
  }
  return textPrice;
};

export default ({
  paymentMethod,
  checkedIndex,
  pricePlusFee,
  pricePlusFeeMonthly,
  number,
  name,
}) => (
  <Wrap>
    <PaymentPriceWrap>
      <InlineText.Bold>決済方法</InlineText.Bold>
      <br />
      {getPaymentPrice(paymentMethod, checkedIndex, pricePlusFee, pricePlusFeeMonthly)}
    </PaymentPriceWrap>
    {paymentMethod === METHOD_PAYMENT_CREDIT ? (
      <Fragment>
        <InlineText.Bold>クレジットカードで決済する</InlineText.Bold>
        <br />
        <br />
        <ImageBrandCredit src={iconBrandCredit} alt="icon-brand-credit" />
        <br />
        <br />
        <CreditInfo>
          <Item>
            <InlineText.Bold>カード番号</InlineText.Bold>
            <br />
            {maskify(number)}
          </Item>
          <Item>
            <InlineText.Bold>カード名義人</InlineText.Bold>
            <br />
            {name}
          </Item>
        </CreditInfo>
        ・お支払いを完了した後、利用を開始される前にキャンセルされた場合、預かり開始日の15日前からキャンセル手数料が発生します。
        <br />
        ・「確定する」ボタンを押すことで、お客様は当サイトの
        <HyperLink href="https://monooq.com/privacy" target="_blank" rel="noopener noreferrer">
          個人情報保護方針
        </HyperLink>
        と
        <HyperLink href="https://monooq.com/terms" target="_blank" rel="noopener noreferrer">
          利用規約
        </HyperLink>
        に同意の上、モノオクサービスの予約を確定したことになります。
      </Fragment>
    ) : (
      <Fragment>
        <InlineText.Bold>コンビニ払い・Pay-easyで決済する</InlineText.Bold>
        <br />
        <br />
        <ImageCp src={iconCp} alt="icon-cp" />
        <br />
        <br />
        ・お支払い方法確定後、お支払いページのURLを発行します。
        <br />
        ・「確定する」ボタンを押すことで、お客様は当サイトの
        <HyperLink href="https://monooq.com/privacy" target="_blank" rel="noopener noreferrer">
          個人情報保護方針
        </HyperLink>
        と
        <HyperLink href="https://monooq.com/terms" target="_blank" rel="noopener noreferrer">
          利用規約
        </HyperLink>
        に同意の上、モノオクサービスの予約を確定したことになります。
        <br />
        ・お支払い後、モノオクサービス上で決済完了通知が反映されるまでに2時間程度のお時間をいただきます。
        <br />
        ・48時間以内にお支払い手続きが行われない場合、自動的にキャンセルとなります。
        <br />
        ・お支払いを完了した後、利用を開始される前にキャンセルされた場合、預かり開始日の15日前からキャンセル手数料が発生します。
      </Fragment>
    )}
  </Wrap>
);
