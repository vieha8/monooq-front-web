import React, { Fragment } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Dimens, Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import { formatRemoveComma } from 'helpers/string';
import Button from 'components/LV1/Forms/Button';
import TextButton from 'components/LV1/Texts/TextButton';
import InlineText from 'components/LV1/Texts/InlineText';
import Info from 'components/LV2/Payment/Info';
import ConfirmText from 'components/LV2/Payment/ConfirmText';
import { SectionTitleSub } from 'components/LV2/Space/Section';
import InputForm from 'components/LV2/Forms/InputForm';
import Select from 'components/LV2/Forms/Select';
import ErrorList from 'components/LV2/Lists/ErrorList';

const MAX_PAY_PRICE_CONVENIENT = 49999;

const CaptionImageCp = styled.div`
  font-size: ${FontSizes.small_12}px;
  font-weight: bold;
  line-height: normal;
  color: ${Colors.brandPrimary};
`;

const Row = styled.div`
  font-size: ${FontSizes.small}px;
  line-height: normal;
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

const NoLinkText = styled.div`
  text-decoration: line-through;
  color: ${Colors.lightGray10};
`;

const Padding = styled.span`
  display: inline-block;
  padding: 0 ${Dimens.xsmall}px;
`;

const getEcontextLink = (price, onClick) => {
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
        <TextButton onClick={onClick}>コンビニ払い・Pay-easyでの決済はこちら</TextButton>
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
  onKeyDownPay,
  textSubmitButton,
}) => (
  <Fragment>
    <Info space={space} {...paymentData} />
    <Row noMarginTop>
      {isConfirm ? (
        <ConfirmText {...paymentData} paymentMethod={paymentMethod} number={number} name={name} />
      ) : (
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
                    value: dayjs().year() + i,
                    text: dayjs().year() + i,
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
              label="セキュリティコード"
              type="text"
              placeholder="3桁の半角数字"
              onChange={onChangeCvc}
              value={cvc}
              autoComplete="cc-csc"
            />
            <ErrorList keyName="cvc_errors" errors={errors.cvc} />
          </Row>
          <Row>
            <SectionTitleSub text="お支払い方法について" />
            クレジットカード
            (VISA、Mastercard)でのお支払いが可能です。契約は1ヶ月毎に自動更新されます。
            <br />
            <br />
            契約終了につき月々の自動支払いを停止する場合は、モノオクサポートLINEまでお知らせください。
            {paymentData.isExistEcontext &&
              getEcontextLink(paymentData.price, onClickSubmitConvenience)}
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
