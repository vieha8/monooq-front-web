// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import EntryButtons from 'components/atomic/LV2/EntryButtons';
import InputPriceOfType from 'components/atomic/LV2/InputPriceOfType';
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
    <Section marginTopSp={20}>
      <CaptionWrap>
        <InlineText.Base>様々なご相談に対応できるように料金目安を設定しましょう。</InlineText.Base>
      </CaptionWrap>
      <CaptionWrap sub>
        <InlineText.Tiny>
          お客様によって荷物の内容が異なるので、スペースの広さに対する料金を設定してください。
        </InlineText.Tiny>
      </CaptionWrap>
    </Section>
    <Section marginTop={20}>
      <InputPriceOfType
        image={imageFurnitureFull}
        title="全てのスペースの月額料金"
        caption="あなたのすべてのスペースを使用するほどの荷物の場合"
        placeholder="20000"
        price={props.priceFull}
        onChange={props.onChangePriceFull}
        error={displayErrors('price_errors_1', props.priceFullErrors)}
      />
      <InputPriceOfType
        image={imageFurnitureHalf}
        title="半分のスペースの月額料金"
        caption="あなたの半分のスペースを使用するほどの荷物の場合"
        placeholder="12000"
        price={props.priceHalf}
        onChange={props.onChangePriceHalf}
        error={displayErrors('price_errors_2', props.priceHalfErrors)}
      />
      <InputPriceOfType
        image={imageFurnitureQuarter}
        title="1/4程度のスペースの月額料金"
        caption="あなたの1/4程度のスペースを使用するほどの荷物の場合"
        placeholder="7000"
        price={props.priceQuarter}
        onChange={props.onChangePriceQuarter}
        error={displayErrors('price_errors_3', props.priceQuarterErrors)}
      />
    </Section>
    <Section marginTop={20}>
      <CommissionWrap>
        <InlineText.Base>
          取引成立時の売り上げは、お客様があなたへお支払いするスペース利用額から20%をご利用料金として引かせていただきます。
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
          text: `登録する`,
          onClick: props.onClickNext,
        }}
      />
    </Section>
  </div>
);
