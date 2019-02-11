// @flow

import React from 'react';
import SelectForm from 'components/atomic/LV2/SelectForm';
import InlineText from 'components/atomic/LV1/InlineText';
import InputForm from 'components/atomic/LV2/InputForm';
import EntryButtons from 'components/atomic/LV2/EntryButtons';
import { Colors } from 'variables';
import { Section } from './Shared';

type PropTypes = {
  receive: number,
  receiveErrors: Array<string>,
  onChangeReceive: Function,
  receiveAbout: string,
  onChangeReceiveAbout: Function,
  receiveAboutErrors: Array<string>,
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
        value={props.receive}
        onChange={e => props.onChangeReceive(e.target.value)}
      />
      {displayErrors('receive_errors', props.receiveErrors)}
    </Section>
    <Section>
      <InputForm
        label="対応できる曜日や時間帯"
        placeholder="例)平日は仕事の都合で夜間のみ、土日は終日対応可など"
        multiline
        rows={4}
        value={props.receiveAbout}
        onChange={e => props.onChangeReceiveAbout(e.target.value)}
      />
      {displayErrors('receive_about_errors', props.receiveAboutErrors)}
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
