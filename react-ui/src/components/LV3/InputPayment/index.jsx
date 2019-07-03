// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Path from 'config/path';
import { Dimens, Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import { formatRemoveComma } from 'helpers/string';
import { H2 } from 'components/LV1/Headline';
import InlineText from 'components/LV1/InlineText';
import Button from 'components/LV1/Button';
import HeroImage from 'components/LV1/HeroImage';
import HostInfo from 'components/LV2/Space/HostInfo';
import InputForm from 'components/LV2/InputForm';
import Payment from 'components/LV2/Payment';
import RadioList from 'components/LV2/RadioList';
import SelectForm from 'components/LV2/SelectForm';
import iconBrandCredit from 'images/icon-brand-credit.png';
import iconCp from 'images/logo-cp.png';

const MAX_PAY_PRICE_CONVENIENT = 49999;

const Spacer = styled.div`
  margin: 40px auto 0;
  ${media.tablet`
  `};
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

const CaptionImageCp = styled.div`
  font-size: ${FontSizes.small_12}px;
`;

const HeadMessage = styled.div`
  width: 100%;
  height: 54px;
  display: block;
  position: fixed;
  left: 0px;
  top: 64px;
  z-index: 100;
  text-align: center;
  padding: ${Dimens.medium_17}px;
  line-height: 22px;
  font-size: ${FontSizes.small_15}px;
  font-weight: bold;
  color: ${Colors.white};
  background-color: ${Colors.brandPrimary};
  ${media.tablet`
    top: 54px;
  `};
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
    props.alignRight &&
    `
    text-align: right;
  `}
  ${props =>
    props.mobile &&
    `
    display: none;
  `}
  ${props =>
    props.button &&
    `
    max-width: 240px;
    margin: ${Dimens.small2_15}px auto;
  `}
  ${media.tablet`
    ${props =>
      props.mobile &&
      `
      display: block;
    `}
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

const ImageWrapper = styled.div`
  display: table-cell;
  vertical-align: top;
  width: 100px;
`;

const ContentWrapper = styled.div`
  display: table-cell;
  vertical-align: middle;
  padding-left: 16px;
`;

const AddressText = styled(InlineText.Base)`
  display: block;
  color: ${Colors.brandPrimary};
`;

const TitleText = styled(InlineText.Small)`
  display: block;
  ${media.phone`
    font-size: ${FontSizes.small_12}px;
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

const CmnWrap = styled.div`
  margin: ${Dimens.medium_20}px;
  padding-top: ${Dimens.medium_20}px;
  border-top: 1px solid ${Colors.borderGray};
  ${props =>
    props.noMarginSide &&
    `
    margin: ${Dimens.medium_20}px auto;
  `}
  ${props =>
    props.noPaddingTop &&
    `
    padding-top: 0px;
  `}
  ${props =>
    props.noBorderTop &&
    `
    border-top: none;
  `}
  ${media.phone`
    margin: ${Dimens.medium_20}px auto;
  `};
`;

const ConfirmCreditInfo = styled.div`
  margin: 0px auto ${Dimens.medium_20}px;
`;

const Item = styled.div`
  padding: ${Dimens.medium_20}px;
  border: 1px solid ${Colors.borderGray};
  border-radius: 6px;
  &:first-child {
    border-radius: 6px 6px 0px 0px;
    border-bottom: none;
  }
  &:last-child {
    border-radius: 0px 0px 6px 6px;
  }
  line-height: 1.5rem;
`;

const AccountNumber = styled.div`
  max-width: 250px;
  background-color: ${Colors.lightYellow};
  border-radius: ${Dimens.xsmall}px;
  margin: 0px auto ${Dimens.medium_20}px;
  padding: ${Dimens.medium_20}px;
  text-align: center;
  line-height: 1.5rem;
  letter-spacing: 0.05em;
  font-weight: bold;
  border: 1px solid ${Colors.yellow};
`;

type PropTypes = {
  space: any,
  payment: {
    beginAt: string,
    endAt: string,
    duration: string,
    price: string,
  },
  onChangeIsHost: Function,
  paymentMethod: number,
  errors: Array<Array<string>>,
  paidError: string,
  errMsgPayment: string,
  onChangeName: Function,
  name: string,
  onChangeNumber: Function,
  number: string,
  onChangeMonth: Function,
  month: number,
  onChangeYear: Function,
  year: number,
  onChangeCvc: Function,
  cvc: string,
  buttonDisabled: boolean,
  buttonLoading: boolean,
  // onKeyDownPay: Function,
  backButton: Function,
  submitButton: Function,
  backButtonText: string,
  submitButtonText: string,
  confirm: boolean,
};

function displayErrors(key: string, errors: Array<string>) {
  return (
    Array.isArray(errors) &&
    errors.map((e, i) => (
      <div key={`${key}_${i}`.toString()}>
        <InlineText.Small color={Colors.error}>{e}</InlineText.Small>
      </div>
    ))
  );
}

function maskify(cc) {
  return cc.slice(0, -4).replace(/./g, '*') + cc.slice(-4);
}

function contentConfirm(paymentMethod, number, name, paidError, errMsgPayment) {
  if (paymentMethod === 0) {
    return (
      <Fragment>
        <CmnWrap noMarginSide>
          <InlineText.Bold>クレジットカードで決済する</InlineText.Bold>
          <br />
          <br />
          <ImageBrandCredit src={iconBrandCredit} alt="icon-brand-credit" />
          <br />
          <br />
          <ConfirmCreditInfo>
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
          </ConfirmCreditInfo>
          ・決済後にキャンセルされた場合、預かり開始日の15日前からキャンセル手数料が発生します。
          <br />
          ・「決済する」ボタンを押すことで、お客様は当サイトのプライバシーポリシーと利用規約に同意の上、モノオクサービスの予約を確定したことになります。
          <br />
          ・無断でのスペース利用延長は荷物を引き取る意思がないとみなし、利用規約に基づき荷物の引き取り費用5万円と処分に要した費用全額を請求いたします。
        </CmnWrap>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <CmnWrap noMarginSide>
        <InlineText.Bold>コンビニ払い・Pay-easyで決済する</InlineText.Bold>
        <br />
        <br />
        <ImageCp src={iconCp} alt="icon-cp" />
        <br />
        <br />
        ・お支払い方法確定後、お支払いページのURLを発行します。
        <br />
        ・48時間以内にお支払い手続きが行われない場合自動的にキャンセルとなります。
        <br />
        ・決済後にキャンセルされた場合、預かり開始日の15日前からキャンセル手数料が発生します。
        <br />
        ・「決済する」ボタンを押すことで、お客様は当サイトのプライバシーポリシーと利用規約に同意の上、モノオクサービスの予約を確定したことになります。
        <br />
        ・無断でのスペース利用延長は荷物を引き取る意思がないとみなし、利用規約に基づき荷物の引き取り費用5万円と処分に要した費用全額を請求いたします。
      </CmnWrap>
    </Fragment>
  );
}

export default ({
  space,
  payment,
  onChangeIsHost,
  paymentMethod,
  errors,
  paidError,
  errMsgPayment,
  onChangeName,
  name,
  onChangeNumber,
  number,
  onChangeMonth,
  month,
  onChangeYear,
  year,
  onChangeCvc,
  cvc,
  buttonDisabled,
  buttonLoading,
  // onKeyDownPay,
  backButton,
  submitButton,
  backButtonText,
  submitButtonText,
  confirm,
}: PropTypes) => (
  <Fragment>
    <HeadMessage>
      {confirm ? 'お支払い内容確認を確認してください' : 'お支払い方法を選択してください'}
    </HeadMessage>
    <Spacer />
    <HostInfo id={space.user.id} name={space.user.name} imageUrl={space.user.imageUrl} message />
    <Row to={Path.space(space.id)} noMarginTop borderBottom>
      <ImageWrapper>
        <HeroImage small src={space.images[0].imageUrl} />
      </ImageWrapper>
      <ContentWrapper>
        <AddressText>
          {space.addressPref}
          {space.addressCity}
          {space.addressTown}
        </AddressText>
        <TitleText>{space.title}</TitleText>
      </ContentWrapper>
    </Row>
    <Row noMarginTop>
      <Payment {...payment} noDescription />
    </Row>
    <Row noMarginTop borderTop borderBottom>
      <H2>お支払い方法</H2>
      {paidError && (
        <Row>
          <InlineText.Base color={Colors.error}>{errMsgPayment}</InlineText.Base>
        </Row>
      )}
      {confirm ? (
        contentConfirm(paymentMethod, number, name, paidError, errMsgPayment)
      ) : (
        <RadioList
          borderTop
          labels={['クレジットカード', 'コンビニ払い・Pay-easy決済', '銀行振込']}
          captions={[
            <ImageBrandCredit src={iconBrandCredit} alt="icon-brand-credit" />,
            <Fragment>
              <ImageCp src={iconCp} alt="icon-cp" />
              {Number(formatRemoveComma(payment.price)) > MAX_PAY_PRICE_CONVENIENT && (
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
                  onChange={e => onChangeName(e.target.value)}
                  value={name}
                />
                {displayErrors('name_errors', errors.name)}
              </Row>
              <Row>
                <InputForm
                  label="クレジットカード番号(ハイフン無し16桁半角数字)"
                  type="text"
                  autoComplete="cc-number"
                  placeholder="1234567812345678"
                  onChange={e => onChangeNumber(e.target.value)}
                  value={number}
                />
                {displayErrors('number_errors', errors.number)}
              </Row>
              <Row>
                <SelectBox>
                  <SelectForm
                    label="有効期限"
                    options={Array(12)
                      .fill(0)
                      .map((_, i) => ({ key: i, value: i + 1, text: i + 1 }))}
                    onChange={e => onChangeMonth(e.target.value)}
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
                  <SelectForm
                    options={Array(10)
                      .fill(0)
                      .map((_, i) => ({
                        key: i,
                        value: moment().year() + i,
                        text: moment().year() + i,
                      }))}
                    onChange={e => onChangeYear(e.target.value)}
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
                  onChange={e => onChangeCvc(e.target.value)}
                  value={cvc}
                  autoComplete="cc-csc"
                />
                {displayErrors('cvc_errors', errors.cvc)}
              </Row>
            </Fragment>,
            '',
            <CmnWrap noPaddingTop noBorderTop>
              <AccountNumber>
                みずほ銀行 渋谷中央支店
                <br />
                普通 1806441 モノオク(カ
              </AccountNumber>
              ・振込手数料はお客様にてご負担願います。
              <br />
              ・土日祝日または、銀行営業時間外にお振込みの場合、翌銀行営業日に順次入金確認を行います。
            </CmnWrap>,
          ]}
          onClick={onChangeIsHost}
          checkedIndex={paymentMethod}
        />
      )}
    </Row>
    <Row button>
      <Button
        secondary
        fill={1}
        loading={buttonLoading}
        onClick={backButton}
        // onKeyDown={onKeyDownPay}
      >
        {backButtonText}
      </Button>
    </Row>
    <Row button>
      <Button
        primary
        fill={1}
        disabled={buttonDisabled}
        loading={buttonLoading}
        onClick={submitButton}
        // onKeyDown={onKeyDownPay}
      >
        {submitButtonText}
      </Button>
    </Row>
  </Fragment>
);
