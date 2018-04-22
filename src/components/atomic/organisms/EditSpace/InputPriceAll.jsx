// @flow

import React from 'react';
import { H1, H2 } from 'components/atomic/atoms/Headline';
import InlineText from 'components/atomic/atoms/InlineText';
import EntryButtons from 'components/atomic/molecules/EntryButtons';
import InputForm from 'components/atomic/molecules/InputForm';
import { Colors } from 'variables';
import { Section } from './Shared';

type PropTypes = {
  price: number,
  priceErrors: Array<string>,
  onChangePrice: Function,
  onClickBack: Function,
  onClickNext: Function,
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
      <InputForm
        label="料金目安（スペースまるごと）"
        hint="スペースの全体を使用する荷物の場合の料金"
        placeholder="20000"
        unit="円"
        value={props.price}
        onChange={e => props.onChangePrice(e.target.value)}
      />
      {displayErrors('price_errors', props.priceErrors)}
    </Section>
    <Section>
      <EntryButtons
        enabled
        backButton={{
          text: '戻る',
          onClick: props.onClickBack,
        }}
        enabledButton={{
          text: '登録を完了する',
          onClick: props.onClickNext,
        }}
      />
    </Section>
  </div>
);
