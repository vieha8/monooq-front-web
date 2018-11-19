// @flow

import React from 'react';
import InlineText from 'components/atomic/LV1/InlineText';
import EntryButtons from 'components/atomic/LV2/EntryButtons';
import InputForm from 'components/atomic/LV2/InputForm';
import { Colors } from 'variables';
import { Section } from './Shared';

type PropTypes = {
  price: number,
  priceErrors: Array<string>,
  onChangePrice: Function,
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
    <Section>
      <InputForm
        label="月額料金"
        placeholder="20,000"
        unit="円"
        value={props.price}
        onChange={e => props.onChangePrice(e.target.value)}
      />
      {displayErrors('price_errors', props.priceErrors)}
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
          text: `確認画面へ`,
          onClick: props.onClickNext,
        }}
      />
    </Section>
  </div>
);
