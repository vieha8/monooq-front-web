// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Path from 'config/path';
import { Dimens, Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import { formatRemoveComma } from 'helpers/string';
import Button from 'components/LV1/Forms/Button';
import { H2 } from 'components/LV1/Texts/Headline';
import InlineText from 'components/LV1/Texts/InlineText';
import ImageHero from 'components/LV1/Images/ImageHero';
import InfoHost from 'components/LV2/Space/InfoHost';
import ContentPayment from 'components/LV2/Texts/ContentPayment';
import InputForm from 'components/LV2/Forms/InputForm';
import RadioList from 'components/LV2/Forms/RadioList';
import Select from 'components/LV2/Forms/Select';
import ErrorList from 'components/LV2/Lists/ErrorList';
import { Height as HeaderHeight, HeightPhone as HeaderHeightPhone } from 'components/LV3/Header';
import iconBrandCredit from 'images/icon-brand-credit.png';
import iconCp from 'images/logo-cp.png';
import dummySpaceImage from 'images/dummy_space.png';

const MAX_PAY_PRICE_CONVENIENT = 49999;
const METHOD_PAYMENT_CREDIT = 0;

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
  top: ${HeaderHeight}px;
  z-index: 100;
  text-align: center;
  padding: ${Dimens.medium_17}px;
  line-height: 22px;
  font-size: ${FontSizes.small_15}px;
  font-weight: bold;
  color: ${Colors.white};
  background-color: ${Colors.brandPrimary};
  ${media.tablet`
    top: ${HeaderHeightPhone}px;
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
  line-height: normal;
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
  errors: {
    name: Array<string>,
    number: Array<string>,
    cvc: Array<string>,
  },
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
  onKeyDownBack: Function,
  onKeyDownPay: Function,
  backButton: Function,
  submitButton: Function,
  backButtonText: string,
  submitButtonText: string,
  confirm: boolean,
};

const maskify = cc => {
  return cc.slice(0, -4).replace(/./g, '*') + cc.slice(-4);
};

const contentConfirm = (paymentMethod, number, name) => {
  if (paymentMethod === METHOD_PAYMENT_CREDIT) {
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
          ・お支払い後にキャンセルされた場合、預かり開始日の15日前からキャンセル手数料が発生します。
          <br />
          ・「確定する」ボタンを押すことで、お客様は当サイトの個人情報保護方針と利用規約に同意の上、モノオクサービスの予約を確定したことになります。
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
        ・「確定する」ボタンを押すことで、お客様は当サイトの個人情報保護方針と利用規約に同意の上、モノオクサービスの予約を確定したことになります。
        <br />
        ・お支払い後、モノオクサービス上で決済完了通知が反映されるまでに2時間程度のお時間をいただきます。
        <br />
        ・48時間以内にお支払い手続きが行われない場合、自動的にキャンセルとなります。
        <br />
        ・お支払い後にキャンセルされた場合、預かり開始日の15日前からキャンセル手数料が発生します。
      </CmnWrap>
    </Fragment>
  );
};

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
  onKeyDownBack,
  onKeyDownPay,
  backButton,
  submitButton,
  backButtonText,
  submitButtonText,
  confirm,
}: PropTypes) => (
  <Fragment>
    <HeadMessage>
      {confirm ? 'お支払い内容を確認してください' : 'お支払い方法を選択してください'}
    </HeadMessage>
    <Spacer />
    <InfoHost id={space.user.id} name={space.user.name} imageUrl={space.user.imageUrl} message />
    <Row to={Path.space(space.id)} noMarginTop borderBottom>
      <ImageWrapper>
        <ImageHero
          small
          src={space.images && space.images.length > 0 ? space.images[0].imageUrl : dummySpaceImage}
        />
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
      <ContentPayment {...payment} noDescription />
    </Row>
    <Row noMarginTop borderTop borderBottom>
      <H2>お支払い方法</H2>
      {paidError && (
        <Row>
          <InlineText.Base color={Colors.error}>{errMsgPayment}</InlineText.Base>
        </Row>
      )}
      {confirm ? (
        contentConfirm(paymentMethod, number, name)
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
                <ErrorList keyName="name_errors" errors={errors.name} />
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
                <ErrorList keyName="number_errors" errors={errors.number} />
              </Row>
              <Row>
                <SelectBox>
                  <Select
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
                  <Select
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
                <ErrorList keyName="cvc_errors" errors={errors.cvc} />
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
        onKeyDown={onKeyDownBack}
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
        onKeyDown={onKeyDownPay}
      >
        {submitButtonText}
      </Button>
    </Row>
  </Fragment>
);
