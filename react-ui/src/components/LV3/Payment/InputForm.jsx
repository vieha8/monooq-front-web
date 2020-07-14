import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
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

const ImageLogoPayCredit =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-pay-credit.svg?auto=compress';
const ImageLogoPayEcontext =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-pay-econtext.svg?auto=compress';

const MAX_PAY_PRICE_CONVENIENT = 49999;

const CaptionImageCp = styled.div`
  font-size: ${FontSizes.small_12}px;
  font-weight: bold;
  line-height: normal;
  color: ${Colors.brandPrimary};
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

const NoLinkText = styled.div`
  text-decoration: line-through;
  color: ${Colors.lightGray10};
`;

const Padding = styled.span`
  display: inline-block;
  padding: 0 ${Dimens.xsmall}px;
`;

const LinkStyled = styled.a`
  font-size: ${FontSizes.small_15}px;
  color: ${Colors.linkBlue};
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
    font-size: ${FontSizes.small_12}px;
  `};
`;

const getEcontextLink = (price, onClick, isUndecided) => {
  let isOverLimitEcontext = false;
  if (Number(formatRemoveComma(price)) > MAX_PAY_PRICE_CONVENIENT) {
    isOverLimitEcontext = true;
  }

  return (
    <div>
      {isOverLimitEcontext ? (
        <Fragment>
          <NoLinkText>コンビニ払い・Pay-easyでの決済はこちら</NoLinkText>
          <CaptionImageCp>
            ※お支払い金額が50,000円以上の場合、コンビニ払い・Pay-easy決済はご利用いただけません。
          </CaptionImageCp>
        </Fragment>
      ) : (
        isUndecided === 0 && (
          <TextButton onClick={onClick}>コンビニ払い・Pay-easyでの決済はこちら</TextButton>
        )
      )}
    </div>
  );
};

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
            月々払い（クレジットカードのみ可能）、一括払い（クレジットカード・コンビニ・Pay-easy）をご利用できます。
            一部クレジットカード・コンビニはご利用できない場合がございますので、以下の決済可能なお支払い方法をご確認ください。
            <br />
            <LinkStyled
              component={Link}
              href="https://help.monooq.com/ja/articles/2948181"
              target="_blank"
              rel="noopener noreferrer"
            >
              利用料の支払い方法について
            </LinkStyled>
            {getEcontextLink(paymentData.price, onClickSubmitConvenience, paymentData.isUndecided)}
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
  </Fragment>
);
