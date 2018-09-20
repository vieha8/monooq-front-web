// @flow

import React from 'react';
import { H1, H2 } from 'components/atomic/LV1/Headline';
import ClearfixContainer from 'components/atomic/LV1/ClearfixContainer';
import SpaceSizeCriterion from 'components/atomic/LV2/SpaceSizeCriterion';
import InlineText from 'components/atomic/LV1/InlineText';
import EntryButtons from 'components/atomic/LV2/EntryButtons';
import { Colors } from 'variables';

import imageFurnitureQuarter from 'images/furniture-quarter.svg';
import imageFurnitureFull from 'images/furniture-full.svg';

import { Section } from './Shared';

type PropTypes = {
  size: number,
  sizeErrors: Array<string>,
  onChangeSize: Function,
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
    <H1>料金目安を設定する</H1>
    <Section>
      <H2>あなたのスペースはどちらの大きさですか？</H2>
    </Section>
    <Section>
      <ClearfixContainer>
        <SpaceSizeCriterion
          selected={props.size === 1}
          position="left"
          text="単一料金の設定／1人用ソファが入るくらい、またはそれ以下"
          onClick={() => props.onChangeSize(1)}
          image={imageFurnitureQuarter}
        />
        <SpaceSizeCriterion
          selected={props.size === 2}
          position="right"
          text="複数料金の設定／1人分の生活用品が入るくらい、またはそれ以上"
          onClick={() => props.onChangeSize(2)}
          image={imageFurnitureFull}
        />
      </ClearfixContainer>
      {displayErrors('size_errors', props.sizeErrors)}
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
