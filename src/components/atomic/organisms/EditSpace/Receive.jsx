// @flow

import React from 'react';
import { H1, H2 } from 'components/atomic/atoms/Headline';
import SelectForm from 'components/atomic/molecules/SelectForm';
import InlineText from 'components/atomic/atoms/InlineText';
import InputForm from 'components/atomic/molecules/InputForm';
import EntryButtons from 'components/atomic/molecules/EntryButtons';
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
      <div key={`${key}_${i}`}>
        <InlineText.Small color={Colors.error}>{e}</InlineText.Small>
      </div>
    ))
  );
}

export default (props: PropTypes) => (
  <div>
    <H1>荷物の受け取りについて</H1>
    <Section>
      <H2>どのように荷物を受け取りますか？</H2>
    </Section>
    <Section>
      <SelectForm
        label="受け取り方法"
        options={[
          {
            value: 0,
            text: '選択してください',
          },
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
        label="対応できる曜日や時間帯はいつですか？"
        hint="ユーザーが予定を立てる目安となります。"
        placeholder="例）普段は会社勤めですので、基本的には平日の夜の対応となります。土日でも対応できる時がありますので、事前にチャットでおしらせください！"
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
