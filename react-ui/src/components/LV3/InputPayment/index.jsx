// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Path from 'config/path';
import { Dimens, Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import { H2 } from 'components/LV1/Headline';
import TextLink from 'components/LV1/TextLink';
import InlineText from 'components/LV1/InlineText';
import Button from 'components/LV1/Button';
import HeroImage from 'components/LV1/HeroImage';
import HostInfo from 'components/LV2/Space/HostInfo';
import InputForm from 'components/LV2/InputForm';
import Payment from 'components/LV2/Payment';
import RadioList from 'components/LV2/RadioList';
import SelectForm from 'components/LV2/SelectForm';

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
  margin-top: ${Dimens.medium2}px;
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
    margin: ${Dimens.medium2}px auto;
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
`;

const Padding = styled.span`
  display: inline-block;
  padding: 0 ${Dimens.xsmall}px;
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
  onClickPay: boolean,
  onKeyDownPay: Function,
  backButton: Fucntion,
  submitButton: Fucntion,
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

function contentConfirm(paymentMethod) {
  if (paymentMethod === 0) {
    return <div>クレカ決済の確認項目が入る</div>;
  }
  return <div>コンビニ決済の確認項目が入る</div>;
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
  onClickPay,
  onKeyDownPay,
  backButton,
  submitButton,
  submitButtonText,
  confirm,
}: PropTypes) => (
  <Fragment>
    <HeadMessage>
      {confirm ? 'お支払い内容確認を確認してください' : 'お支払い方法を選択してください'}
    </HeadMessage>
    <HostInfo
      id={space.user.id}
      name={space.user.name}
      imageUrl={space.user.imageUrl}
      hostinfo
      message
    />
    <Row to={Path.space(space.id)}>
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
    <Payment {...payment} noDescription />
    <H2>お支払い方法</H2>
    {confirm ? (
      contentConfirm(paymentMethod)
    ) : (
      <RadioList
        labels={['クレジットカード', 'コンビニ払い・Pay-easy', '銀行振込']}
        contents={[
          <Fragment>
            {paidError && (
              <Row>
                <InlineText.Base color={Colors.error}>{errMsgPayment}</InlineText.Base>
              </Row>
            )}
            <Row>
              <H2>クレジットカード情報の入力</H2>
            </Row>
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
                label="クレジットカード番号(ハイフン無し16桁の半角数字)"
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
            <Row>
              <div>
                <InlineText.Small color={Colors.red}>
                  ・対応カードブランドはVisa、MasterCardとなります。
                </InlineText.Small>
              </div>
              <div>
                <InlineText.Small color={Colors.red}>
                  ・決済後にキャンセルされた場合、預ける日の15日前までは全額ご返金させていただきます。
                </InlineText.Small>
              </div>
              <div>
                <InlineText.Small color={Colors.red}>
                  ・決済後、預かり開始予定日の15日前からキャンセル手数料が発生します。
                </InlineText.Small>
              </div>
              <div>
                <InlineText.Small color={Colors.red}>
                  ・「決済する」ボタンを押すことで、お客様は当サイトの
                  <TextLink
                    fontSize={FontSizes.small_12}
                    href={Path.privacy()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    プライバシーポリシー
                  </TextLink>
                  と
                  <TextLink
                    fontSize={FontSizes.small_12}
                    href={Path.terms()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    利用規約
                  </TextLink>
                  に同意の上、モノオクサービスの予約を確定したことになります。
                </InlineText.Small>
              </div>
            </Row>
            <Row alignRight>
              <TextLink to={Path.cancellationPolicies()} target="_blank" rel="noopener noreferrer">
                キャンセルについて
              </TextLink>
            </Row>
            <Row button>
              <Button
                primary
                fill={1}
                disabled={buttonDisabled}
                loading={buttonLoading}
                onClick={onClickPay}
                onKeyDown={onKeyDownPay}
              >
                決済する
              </Button>
            </Row>
          </Fragment>,
          '',
          '',
        ]}
        onClick={onChangeIsHost}
        checkedIndex={paymentMethod}
      />
    )}
    <Row button>
      <Button
        secondary
        fill={1}
        // disabled={buttonDisabled}
        loading={buttonLoading}
        onClick={backButton}
        // onKeyDown={onKeyDownPay}
      >
        戻る
      </Button>
    </Row>
    <Row button>
      <Button
        primary
        fill={1}
        // disabled={buttonDisabled}
        loading={buttonLoading}
        onClick={submitButton}
        // onKeyDown={onKeyDownPay}
      >
        {submitButtonText}
      </Button>
    </Row>
  </Fragment>
);
