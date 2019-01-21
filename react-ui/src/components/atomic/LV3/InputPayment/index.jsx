// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Path from 'config/path';
import { Dimens, Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import { H1, H2 } from 'components/atomic/LV1/Headline';
import TextLink from 'components/atomic/LV1/TextLink';
import InlineText from 'components/atomic/LV1/InlineText';
import Button from 'components/atomic/LV1/Button';
import InputForm from 'components/atomic/LV2/InputForm';
import SelectForm from 'components/atomic/LV2/SelectForm';

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

const SelectBox = styled.div`
  display: inline-block;
  width: 120px;
`;

const Padding = styled.span`
  display: inline-block;
  padding: 0 ${Dimens.xsmall}px;
`;

type PropTypes = {
  paidError: string,
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

export default (props: PropTypes) => (
  <Fragment>
    <H1>支払いを行う</H1>
    {props.paidError && (
      <Row>
        <InlineText.Base color={Colors.error}>
          カード情報の認証に失敗しました。カード名義・カード番号・有効期限・セキュリティコードをお確かめください。
        </InlineText.Base>
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
        onChange={e => props.onChangeName(e.target.value)}
        value={props.name}
      />
      {displayErrors('name_errors', props.errors.name)}
    </Row>
    <Row>
      <InputForm
        label="クレジットカード番号(ハイフン無し16桁の半角数字)"
        type="text"
        autoComplete="cc-number"
        placeholder="1234567812345678"
        onChange={e => props.onChangeNumber(e.target.value)}
        value={props.number}
      />
      {displayErrors('number_errors', props.errors.number)}
    </Row>
    <Row>
      <SelectBox>
        <SelectForm
          label="有効期限"
          options={Array(12)
            .fill(0)
            .map((_, i) => ({ key: i, value: i + 1, text: i + 1 }))}
          onChange={e => props.onChangeMonth(e.target.value)}
          value={props.month}
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
            .map((_, i) => ({ key: i, value: moment().year() + i, text: moment().year() + i }))}
          onChange={e => props.onChangeYear(e.target.value)}
          value={props.year}
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
        onChange={e => props.onChangeCvc(e.target.value)}
        value={props.cvc}
        autoComplete="cc-csc"
      />
      {displayErrors('cvc_errors', props.errors.cvc)}
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
          <TextLink fontSize={FontSizes.small_12} href={Path.privacy()} target="_blank">
            プライバシーポリシー
          </TextLink>
          と
          <TextLink fontSize={FontSizes.small_12} href={Path.terms()} target="_blank">
            利用規約
          </TextLink>
          に同意の上、モノオクサービスの予約を確定したことになります。
        </InlineText.Small>
      </div>
    </Row>
    <Row alignRight>
      <TextLink to={Path.cancellationPolicies()} target="_blank">
        キャンセルについて
      </TextLink>
    </Row>
    <Row button>
      <Button
        primary
        fill={1}
        disabled={props.buttonDisabled}
        loading={props.buttonLoading}
        onClick={props.onClickPay}
      >
        決済する
      </Button>
    </Row>
  </Fragment>
);
