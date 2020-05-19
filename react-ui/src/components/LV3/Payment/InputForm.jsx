import React, { Fragment } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Dimens, Colors, FontSizes } from 'variables';
import { media, mediaMin } from 'helpers/style/media-query';
import { formatRemoveComma } from 'helpers/string';
import Button from 'components/LV1/Forms/Button';
import TextButton from 'components/LV1/Texts/TextButton';
import InlineText from 'components/LV1/Texts/InlineText';
import Info from 'components/LV2/Payment/Info';
import ConfirmText from 'components/LV2/Payment/ConfirmText';
import PaymentType from 'components/LV2/Payment/PaymentType';
import ContentPayment from 'components/LV2/Texts/ContentPayment';
import { SectionTitleSub } from 'components/LV2/Space/Section';
import InputForm from 'components/LV2/Forms/InputForm';
import Select from 'components/LV2/Forms/Select';
import ErrorList from 'components/LV2/Lists/ErrorList';
import ImageLogoPayCredit from 'images/logo-pay-credit.svg';
import ImageLogoPayEcontext from 'images/logo-pay-econtext.svg';

const MAX_PAY_PRICE_CONVENIENT = 49999;

const CaptionImageCp = styled.div`
  font-size: ${FontSizes.small_12}px;
`;

const Row = styled.div`
  font-size: ${FontSizes.small2_14}px;
  line-height: normal;
  ${props =>
    props.borderBottom &&
    `
    padding-bottom: ${Dimens.medium2_32}px;
  `};
  ${props =>
    !props.noMarginTop &&
    `
    margin-top: ${Dimens.medium_20}px;
  `}
  ${props =>
    props.button &&
    `
    max-width: 240px;
    margin: ${Dimens.small2_15}px auto;
  `}
  ${media.phone`
    ${props =>
      props.button &&
      `
      max-width: 100%;
    `}
    ${props =>
      !props.noMarginTop &&
      `
      margin-top: ${Dimens.medium_20}px;
    `}
  `}
`;

const SelectBox = styled.div`
  display: inline-block;
  width: 120px;
  ${media.phone`
    width: 109px;
  `};
`;

const ImageLogoPay = styled.img`
  display: block;
  width: 100%;
  height: auto;
  ${props =>
    props.credit &&
    `
    margin: ${Dimens.medium}px ${Dimens.medium3_40}px ${Dimens.medium}px 0;
  `};
  ${props =>
    props.maxWidth &&
    `
    max-width:  ${props.maxWidth}px;
  `};
  ${media.phone`
    display: block;
    margin:  ${Dimens.small2}px 0 0;
  `};
`;

const LinkStyled = styled.a`
  margin-right: ${Dimens.medium}px;
  &:active {
    opacity: 0.8;
  }
  ${mediaMin.tablet`
    &:hover {
      opacity: 0.8;
    }
  `};
  ${media.phone`
    display: block;
    margin:  ${Dimens.xsmall}px auto 0;
  `};
`;

const StyledTextButton = styled(TextButton)``;

const Padding = styled.span`
  display: inline-block;
  padding: 0 ${Dimens.xsmall}px;
`;

export default ({
  space,
  paymentData,
  errors,
  isConfirm,
  paymentMethod,
  paymentType,
  number,
  name,
  month,
  year,
  cvc,
  onChangeName,
  onChangeNumber,
  onChangeMonth,
  onChangeYear,
  onChangeCvc,
  backButton,
  onKeyDownBackButton,
  textBackButton,
  disabledPayButton,
  buttonLoading,
  onClickSubmit,
  onClickSubmitConvenience,
  onClickPaymentType,
  onKeyDownPay,
  textSubmitButton,
}) => (
  <Fragment>
    <Info space={space} {...paymentData} />
    <Row noMarginTop>
      <ContentPayment {...paymentData} />
    </Row>
    <Row noMarginTop borderBottom>
      {isConfirm ? (
        <ConfirmText
          {...paymentData}
          paymentMethod={paymentMethod}
          checkedIndex={paymentType}
          number={number}
          name={name}
        />
      ) : (
        <Fragment>
          <Row>
            <PaymentType {...paymentData} checkedIndex={paymentType} onClick={onClickPaymentType} />
          </Row>
          <Row>
            <InputForm
              label="カード名義（半角ローマ字）"
              placeholder="TARO YAMADA"
              autoComplete="cc-name"
              onChange={onChangeName}
              value={name}
            />
            <ErrorList keyName="name_errors" errors={errors.name} />
          </Row>
          <Row>
            <InputForm
              label="カード番号(ハイフン無し16桁半角数字)"
              type="text"
              autoComplete="cc-number"
              placeholder="1234567812345678"
              onChange={onChangeNumber}
              value={number}
            />
            <ErrorList keyName="number_errors" errors={errors.number} />
          </Row>
          <Row>
            <SelectBox>
              <Select
                label="有効期限"
                options={Array(12)
                  .fill(0)
                  .map((_, i) => ({ key: i, value: i + 1, text: i + 1 }))}
                onChange={onChangeMonth}
                value={month}
                autoComplete="cc-exp-year"
              />
            </SelectBox>
            <InlineText.Base>
              <Padding>月</Padding>
            </InlineText.Base>
            <InlineText.Base>
              <Padding>/</Padding>
            </InlineText.Base>
            <SelectBox>
              <Select
                options={Array(10)
                  .fill(0)
                  .map((_, i) => ({
                    key: i,
                    value: moment().year() + i,
                    text: moment().year() + i,
                  }))}
                onChange={onChangeYear}
                value={year}
                autoComplete="cc-exp-month"
              />
            </SelectBox>
            <InlineText.Base>
              <Padding>年</Padding>
            </InlineText.Base>
          </Row>
          <Row>
            <InputForm
              label="セキュリティコード(3桁の半角数字)"
              type="text"
              placeholder="3桁の数字"
              onChange={onChangeCvc}
              value={cvc}
              autoComplete="cc-csc"
            />
            <ErrorList keyName="cvc_errors" errors={errors.cvc} />
          </Row>
          <Row>
            <SectionTitleSub text="お支払い方法について" />
            クレジットカード決済、コンビニ・Pay-easy決済がご利用できます。
            <br />
            一部クレジットカード・コンビニはご利用できない場合がございますので、以下の決済可能なお支払い方法をご確認ください。
            <br />
            <StyledTextButton onClick={onClickSubmitConvenience}>
              コンビニ払い・Pay-easyでの決済はこちら
            </StyledTextButton>
          </Row>
          <Row>
            <SectionTitleSub text="決済可能なお支払い方法" />
            <ImageLogoPay src={ImageLogoPayCredit} maxWidth={110} credit alt="icon-logo-credit" />
            <ImageLogoPay src={ImageLogoPayEcontext} maxWidth={240} alt="icon-logo-econtext" />
          </Row>
        </Fragment>
      )}
    </Row>
    <Row button>
      <Button
        secondary
        fill={1}
        disabled={buttonLoading}
        onClick={backButton}
        onKeyDown={onKeyDownBackButton}
      >
        {textBackButton}
      </Button>
    </Row>
    <Row button>
      <Button
        primary
        fill={1}
        disabled={disabledPayButton}
        loading={buttonLoading}
        onClick={onClickSubmit}
        onKeyDown={onKeyDownPay}
      >
        {textSubmitButton}
      </Button>
    </Row>
    {Number(formatRemoveComma(paymentData.price)) > MAX_PAY_PRICE_CONVENIENT && (
      <CaptionImageCp>
        ※お支払い金額が50,000円以上の場合、コンビニ払い・Pay-easy決済はご利用いただけません。
      </CaptionImageCp>
    )}
  </Fragment>
);
