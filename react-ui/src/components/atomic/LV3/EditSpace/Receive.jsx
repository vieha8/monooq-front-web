// @flow

import React from 'react';
import styled from 'styled-components';
import SelectForm from 'components/atomic/LV2/SelectForm';
import InlineText from 'components/atomic/LV1/InlineText';
import InputForm from 'components/atomic/LV2/InputForm';
import EntryButtons from 'components/atomic/LV2/EntryButtons';
import { Colors } from 'variables';
import { Section } from './Shared';
import { media } from 'helpers/style/media-query';

const EntryButtonsWrap = styled.div`
  ${media.phone`
    display: block;
    width: 100%;
    position: absolute;
    left: 0px;
    bottom: 0px;
    z-index: 1000;
    text-align: center;
    padding: 0 15px 15px;
  `};
`;

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
        label="対応できる曜日や時間帯"
        placeholder="土日"
        multiline
        rows={4}
        value={props.receiveAbout}
        onChange={e => props.onChangeReceiveAbout(e.target.value)}
      />
      {displayErrors('receive_about_errors', props.receiveAboutErrors)}
    </Section>
    <Section>
      <EntryButtonsWrap>
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
      </EntryButtonsWrap>
    </Section>
  </div>
);
