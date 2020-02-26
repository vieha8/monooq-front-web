import React, { Fragment } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Dimens, Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import { formatRemoveComma } from 'helpers/string';
import Button from 'components/LV1/Forms/Button';
import { H2 } from 'components/LV1/Texts/Headline';
import InlineText from 'components/LV1/Texts/InlineText';
import ConfirmText from 'components/LV2/Payment/ConfirmText';
import ContentPayment from 'components/LV2/Texts/ContentPayment';
import InputForm from 'components/LV2/Forms/InputForm';
import RadioList from 'components/LV2/Forms/RadioList';
import Select from 'components/LV2/Forms/Select';
import ErrorList from 'components/LV2/Lists/ErrorList';
import iconBrandCredit from 'images/icon-brand-credit.png';
import iconCp from 'images/logo-cp.png';

const MAX_PAY_PRICE_CONVENIENT = 49999;

const CaptionImageCp = styled.div`
  font-size: ${FontSizes.small_12}px;
`;

const Row = styled.div`
  ${props =>
    props.borderTop &&
    `
      padding-top: ${Dimens.small2_15}px;
      border-top: 1px solid ${Colors.borderGray};
    `};
  ${props =>
    props.borderBottom &&
    `
    padding-bottom: ${Dimens.small2_15}px;
    border-bottom: 1px solid ${Colors.borderGray};
  `};
  ${props =>
    !props.noMarginTop &&
    `
    margin-top: ${Dimens.medium2}px;
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

const ImageBrandCredit = styled.img`
  max-width: 160px;
`;

const ImageCp = styled.img`
  max-width: 300px;
  ${media.phoneSmall`
    max-width: 100%;
  `};
`;

const SelectBox = styled.div`
  display: inline-block;
  width: 120px;
  ${media.phone`
    width: 109px;
  `};
`;

const Padding = styled.span`
  display: inline-block;
  padding: 0 ${Dimens.xsmall}px;
`;

export default ({
  paymentData,
  errors,
  paidError,
  errMsgPayment,
  isConfirm,
  paymentMethod,
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
  onClickPaymentMethod,
  backButton,
  onKeyDownBackButton,
  textBackButton,
  disabledPayButton,
  buttonLoading,
  onClickSubmit,
  onKeyDownPay,
  textSubmitButton,
}) => (
  <Fragment>
    <Row noMarginTop>
      <ContentPayment {...paymentData} noDescription />
    </Row>
    <Row noMarginTop borderTop borderBottom>
      <H2 as="h2">お支払い方法</H2>
      {paidError && (
        <Row>
          <InlineText.Base color={Colors.error}>{errMsgPayment}</InlineText.Base>
        </Row>
      )}
      {isConfirm ? (
        <ConfirmText paymentMethod={paymentMethod} number={number} name={name} />
      ) : (
        <RadioList
          borderTop
          labels={['クレジットカード', 'コンビニ払い・Pay-easy決済']}
          captions={[
            <ImageBrandCredit src={iconBrandCredit} alt="icon-brand-credit" />,
            <Fragment>
              <ImageCp src={iconCp} alt="icon-cp" />
              {Number(formatRemoveComma(paymentData.price)) > MAX_PAY_PRICE_CONVENIENT && (
                <CaptionImageCp>
                  ※お支払い金額が50,000円以上の場合、コンビニ払い・Pay-easy決済はご利用いただけません。
                </CaptionImageCp>
              )}
            </Fragment>,
            '',
          ]}
          contents={[
            <Fragment>
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
                  label="クレジットカード番号(ハイフン無し16桁半角数字)"
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
            </Fragment>,
            '',
          ]}
          onClick={onClickPaymentMethod}
          checkedIndex={paymentMethod}
        />
      )}
    </Row>
    <Row button>
      <Button secondary fill={1} onClick={backButton} onKeyDown={onKeyDownBackButton}>
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
