// @flow

import React from 'react';
import styled from 'styled-components';
import CheckBox from 'components/LV1/Forms/CheckBox';
import DisplayErrors from 'components/LV2/DisplayErrors';
import EntryButtons from 'components/LV2/EntryButtons';
import InputForm from 'components/LV2/InputForm';
import { Dimens } from 'variables';
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
      <DisplayErrors keyName="baggage_errors" errors={errors.about} />
      <CheckWrapper>
        <CheckBox
          checked={checkedFurniture}
          onClick={onClickFurniture}
          onKeyDown={onKeyDownFurniture}
        >
          家具や家電製品に対応する
        </CheckBox>
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
