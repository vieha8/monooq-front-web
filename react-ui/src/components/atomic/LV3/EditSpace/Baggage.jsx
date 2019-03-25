// @flow

import React from 'react';
import styled from 'styled-components';
import Check from 'components/atomic/LV1/Check';
import InlineText from 'components/atomic/LV1/InlineText';
import InputForm from 'components/atomic/LV2/InputForm';
import EntryButtons from 'components/atomic/LV2/EntryButtons';
import { Colors, Dimens } from 'variables';
import { Section } from './Shared';

const CheckWrapper = styled.div`
  margin-top: ${Dimens.small}px;
`;

type PropTypes = {
  baggage: string,
  baggageErrors: Array<string>,
  onChangeBaggage: Function,
  checkedFurniture: boolean,
  onClickFurniture: Function,
  onKeyDownFurniture: Function,
  onClickBack: Function,
  onClickNext: Function,
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
    <Section>
      <InputForm
        label="このスペースで預かれる荷物"
        placeholder="例)ダンボール、衣類、家具、家電など"
        multiline
        rows={4}
        value={props.baggage}
        onChange={e => props.onChangeBaggage(e.target.value)}
      />
      {displayErrors('baggage_errors', props.baggageErrors)}
      <CheckWrapper>
        <Check
          checked={props.checkedFurniture}
          onClick={props.onClickFurniture}
          onKeyDown={props.onKeyDownFurniture}
        >
          家具や家電製品に対応する
        </Check>
      </CheckWrapper>
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
