import React from 'react';
import ButtonEntry from 'components/LV2/Forms/ButtonEntry';
import InputForm from 'components/LV2/Forms/InputForm';
import Select from 'components/LV2/Forms/Select';
import ErrorList from 'components/LV2/Lists/ErrorList';
import { Section } from './Shared';

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
}) => (
  <div>
    <Section>
      <Select
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
      <ErrorList keyName="receive_errors" errors={errors.ReceiptType} />
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
      <ErrorList keyName="receive_about_errors" errors={errors.receiptAbout} />
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
