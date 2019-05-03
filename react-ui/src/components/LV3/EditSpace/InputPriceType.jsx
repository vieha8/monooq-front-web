// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/InlineText';
import EntryButtons from 'components/LV2/EntryButtons';
import InputPriceOfType from 'components/LV2/InputPriceOfType';
import imageFurnitureFull from 'images/furniture-full.svg';
import imageFurnitureHalf from 'images/furniture-half.svg';
import imageFurnitureQuarter from 'images/furniture-quarter.svg';
import { Colors, Dimens } from 'variables';
import { Section } from './Shared';

const CommissionWrap = styled.div`
  margin-bottom: ${Dimens.medium1}px;
`;

const CaptionWrap = styled.div`
  ${props =>
    props.sub &&
    `
      margin-top: ${Dimens.xsmall}px;
    `};
`;

const UnderLine = styled.span`
  text-decoration: underline;
`;

type PropTypes = {
  priceQuarter: number,
  priceQuarterErrors: Array<string>,
  onChangePriceQuarter: Function,
  priceHalf: number,
  priceHalfErrors: Array<string>,
  onChangePriceHalf: Function,
  priceFull: number,
  priceFullErrors: Array<string>,
  onChangePriceFull: Function,
  onClickBack: Function,
  onClickNext: Function,
  buttonLoading: boolean,
  buttonDisabled: boolean,
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
  <div>
    <Section marginTopSp={20}>
      <CaptionWrap>
        <InlineText.Base>様々なご相談に対応できるように料金目安を設定しましょう。</InlineText.Base>
      </CaptionWrap>
      <CaptionWrap sub>
        <InlineText.Tiny>
          お客様によって荷物の内容が異なるので、スペースの広さに対する料金を設定してください。
          <br />
          <InlineText.Bold>
            エリアや条件にもよりますが、目安は<UnderLine>1畳あたり約5,000〜7,000円/月</UnderLine>
            です。
          </InlineText.Bold>
        </InlineText.Tiny>
      </CaptionWrap>
    </Section>
    <Section marginTop={20}>
      <InputPriceOfType
        image={imageFurnitureFull}
        title="全てのスペースの月額料金"
        caption="このスペースすべてを使用する場合"
        placeholder="30000"
        price={props.priceFull}
        onChange={props.onChangePriceFull}
        error={displayErrors('price_errors_1', props.priceFullErrors)}
      />
      <InputPriceOfType
        image={imageFurnitureHalf}
        title="半分のスペースの月額料金"
        caption="このスペースの半分を使用する場合"
        placeholder="16000"
        price={props.priceHalf}
        onChange={props.onChangePriceHalf}
        error={displayErrors('price_errors_2', props.priceHalfErrors)}
      />
      <InputPriceOfType
        image={imageFurnitureQuarter}
        title="1/4程度のスペースの月額料金"
        caption="このスペースの1/4程度を使用する場合"
        placeholder="9000"
        price={props.priceQuarter}
        onChange={props.onChangePriceQuarter}
        error={displayErrors('price_errors_3', props.priceQuarterErrors)}
      />
    </Section>
    <Section marginTop={20}>
      <CommissionWrap>
        <InlineText.Base>
          取引成立時の売り上げは、お客様があなたへお支払いするスペース利用額から20%をご利用料金として引かせていただきます。
          20%にはサービス利用手数料と、保管荷物の保険料が含まれています。
        </InlineText.Base>
      </CommissionWrap>
    </Section>
    <Section>
      <EntryButtons
        rerative
        enabled
        loading={props.buttonLoading}
        backButton={{
          text: '戻る',
          onClick: props.onClickBack,
        }}
        enabledButton={{
          text: `確認画面へ`,
          disabled: props.buttonDisabled,
          onClick: props.onClickNext,
        }}
      />
    </Section>
  </div>
);
