// @flow

import React from 'react';
import DisplayErrors from 'components/LV2/DisplayErrors';
import EntryButtons from 'components/LV2/EntryButtons';
import InputForm from 'components/LV2/InputForm';
import SelectForm from 'components/LV2/SelectForm';
import { Section } from './Shared';

type PropTypes = {
  errors: Array<Array<string>>,
  receive: number,
  onChangeReceive: Function,
  receiveAbout: string,
  onChangeReceiveAbout: Function,
  onClickBack: Function,
  onKeyDownButtonBack: Function,
  onClickNext: Function,
  onKeyDownButtonNext: Function,
  buttonNextDisabled: boolean,
};

export default ({
  errors,
  receive,
  onChangeReceive,
  receiveAbout,
  onChangeReceiveAbout,
  onClickBack,
  onKeyDownButtonBack,
  onClickNext,
  onKeyDownButtonNext,
  buttonNextDisabled,
}: PropTypes) => (
  <div>
    <Section>
      <SelectForm
        label="受け取り方法"
        options={[
          {
            value: 1,
            text: '対面・配送の両方に対応する',
          },
          {
            value: 2,
            text: '対面',
          },
          {
            value: 3,
            text: '配送',
          },
        ]}
        value={receive}
        onChange={e => onChangeReceive(e.target.value)}
      />
      <DisplayErrors keyName="receive_errors" errors={errors.ReceiptType} />
    </Section>
    <Section>
      <InputForm
        label="対応できる曜日や時間帯"
        placeholder="例)平日は仕事の都合で夜間のみ、土日は終日対応可など"
        multiline
        rows={4}
        value={receiveAbout}
        onChange={e => onChangeReceiveAbout(e.target.value)}
      />
      <DisplayErrors keyName="receive_about_errors" errors={errors.receiptAbout} />
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
