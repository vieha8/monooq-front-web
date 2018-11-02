// @flow

import React from 'react';
import { H1, H2 } from 'components/atomic/LV1/Headline';
import InlineText from 'components/atomic/LV1/InlineText';
import EntryButtons from 'components/atomic/LV2/EntryButtons';
import InputPriceOfType from 'components/atomic/LV2/InputPriceOfType';
import imageFurnitureFull from 'images/furniture-full.svg';
import imageFurnitureHalf from 'images/furniture-half.svg';
import imageFurnitureQuarter from 'images/furniture-quarter.svg';
import { Colors } from 'variables';
import { Section } from './Shared';

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
};

function displayErrors(key: string, errors: Array<string>) {
  return (
    Array.isArray(errors) &&
    errors.map((e, i) => (
      <div key={`${key}_${i}`}>
        <InlineText.Small color={Colors.error}>{e}</InlineText.Small>
      </div>
    ))
  );
}

export default (props: PropTypes) => (
  <div>
    <H1>料金目安を設定する</H1>
    <Section>
      <H2>あなたのスペース料金はいくら？</H2>
    </Section>
    <Section>
      <InlineText.Base>
        様々な相談に対応できるように料金目安を設定しましょう！
        <br />
        地域により多少の差はありますが、1畳あたり7,000円が相場となっています。
      </InlineText.Base>
    </Section>
    <Section>
      <InputPriceOfType
        image={imageFurnitureFull}
        title="スペースまるごと"
        caption="あなたのスペースのほとんどを使用する荷物の場合の料金"
        placeholder="20000"
        price={props.priceFull}
        onChange={props.onChangePriceFull}
        error={displayErrors('price_errors_1', props.priceFullErrors)}
      />
      <InputPriceOfType
        image={imageFurnitureHalf}
        title="スペース半分"
        caption="あなたのスペースの「半分」を使用する荷物の場合の料金"
        placeholder="12000"
        price={props.priceHalf}
        onChange={props.onChangePriceHalf}
        error={displayErrors('price_errors_2', props.priceHalfErrors)}
      />
      <InputPriceOfType
        image={imageFurnitureQuarter}
        title="スペース1/4"
        caption="あなたのスペースの「4分の1」を使用する荷物の場合の料金"
        placeholder="7000"
        price={props.priceQuarter}
        onChange={props.onChangePriceQuarter}
        error={displayErrors('price_errors_3', props.priceQuarterErrors)}
      />
    </Section>
    <Section>
      <InlineText.Base color={Colors.red} fontSize={14}>
        取引成立時、スペースを利用するユーザーが支払った金額の20%を、サービス利用手数料として徴収させていただきます。
      </InlineText.Base>
    </Section>
    <Section>
      <EntryButtons
        enabled
        loading={props.buttonLoading}
        backButton={{
          text: '戻る',
          onClick: props.onClickBack,
        }}
        enabledButton={{
          text: `${props.edit ? '編集' : '登録'}を完了する`,
          onClick: props.onClickNext,
        }}
      />
    </Section>
  </div>
);
