// @flow

import React from 'react';
import styled from 'styled-components';
import Check from 'components/LV1/Check';
import InlineText from 'components/LV1/InlineText';
import InputForm from 'components/LV2/InputForm';
import EntryButtons from 'components/LV2/EntryButtons';
import { Colors, Dimens } from 'variables';
import { Section } from './Shared';

const CheckWrapper = styled.div`
  margin-top: ${Dimens.small}px;
`;

type PropTypes = {
  errors: Array<Array<string>>,
  baggage: string,
  onChangeBaggage: Function,
  checkedFurniture: boolean,
  onClickFurniture: Function,
  onKeyDownFurniture: Function,
  onClickBack: Function,
  onKeyDownButtonBack: Function,
  onClickNext: Function,
  onKeyDownButtonNext: Function,
  buttonNextDisabled: boolean,
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

export default ({
  errors,
  baggage,
  onChangeBaggage,
  checkedFurniture,
  onClickFurniture,
  onKeyDownFurniture,
  onClickBack,
  onKeyDownButtonBack,
  onClickNext,
  onKeyDownButtonNext,
  buttonNextDisabled,
}: PropTypes) => (
  <div>
    <Section>
      <InputForm
        label="このスペースで預かれる荷物"
        placeholder="例)ダンボール、衣類、家具、家電など"
        multiline
        rows={4}
        value={baggage}
        onChange={e => onChangeBaggage(e.target.value)}
      />
      {displayErrors('baggage_errors', errors.about)}
      <CheckWrapper>
        <Check checked={checkedFurniture} onClick={onClickFurniture} onKeyDown={onKeyDownFurniture}>
          家具や家電製品に対応する
        </Check>
      </CheckWrapper>
    </Section>
    <Section>
      <EntryButtons
        enabled
        backButton={{
          text: '戻る',
          onClick: onClickBack,
          onKeyDown: onKeyDownButtonBack,
        }}
        enabledButton={{
          text: '次へ',
          onClick: onClickNext,
          onKeyDown: onKeyDownButtonNext,
          disabled: buttonNextDisabled,
        }}
      />
    </Section>
  </div>
);
