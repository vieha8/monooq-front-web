import React from 'react';
import styled from 'styled-components';
import ButtonEntry from 'components/LV2/Forms/ButtonEntry';
import InputForm from 'components/LV2/Forms/InputForm';
import ErrorList from 'components/LV2/Lists/ErrorList';
import { Dimens } from 'variables';
import { Section } from './Shared';

const CheckWrapper = styled.div`
  margin-top: ${Dimens.small}px;
`;

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
}) => (
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
      <ErrorList keyName="baggage_errors" errors={errors.about} />
      <CheckWrapper>
        <InputForm
          checkbox
          labelCheckBox="家具や家電製品に対応する"
          checked={checkedFurniture}
          onClickCheck={onClickFurniture}
          onKeyDown={onKeyDownFurniture}
        />
      </CheckWrapper>
    </Section>
    <Section>
      <ButtonEntry
        relative
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
