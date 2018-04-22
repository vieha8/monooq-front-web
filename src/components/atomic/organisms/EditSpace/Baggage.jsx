// @flow

import React from 'react';
import { H1, H2 } from 'components/atomic/atoms/Headline';
import Check from 'components/atomic/atoms/Check';
import InlineText from 'components/atomic/atoms/InlineText';
import InputForm from 'components/atomic/molecules/InputForm';
import EntryButtons from 'components/atomic/molecules/EntryButtons';
import { Colors } from 'variables';
import { Section } from './Shared';

type PropTypes = {
  baggage: string,
  baggageErrors: Array<string>,
  onChangeBaggage: Function,
  checkedFurniture: boolean,
  onClickFurniture: Function,
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
    <H1>荷物の内容について</H1>
    <Section>
      <H2>どのような荷物に対応しますか？</H2>
    </Section>
    <Section>
      <InputForm
        label="このスペースに置ける荷物について"
        hint="あなたが対応できる荷物について説明しましょう。"
        placeholder="例）ダンボールなどのサイズが決まったものや、大きな荷物でも対応可能です。1人暮らしの荷物一式程度ならお受けすることができます。まずはご相談ください！"
        multiline
        rows={4}
        value={props.baggage}
        onChange={e => props.onChangeBaggage(e.target.value)}
      />
      {displayErrors('baggage_errors', props.baggageErrors)}
      <Check checked={props.checkedFurniture} onClick={props.onClickFurniture}>
        家具や家電製品に対応する
      </Check>
    </Section>
    <Section>
      <EntryButtons
        enabled
        backButton={{
          text: '戻る',
          onClick: props.onClickBack,
        }}
        enabledButton={{
          text: '次へ',
          onClick: props.onClickNext,
        }}
      />
    </Section>
  </div>
);
