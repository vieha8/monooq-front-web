// @flow

import React from 'react';
import styled from 'styled-components';
import { H1, H2 } from 'components/atomic/LV1/Headline';
import InlineText from 'components/atomic/LV1/InlineText';
import EntryButtons from 'components/atomic/LV2/EntryButtons';
import InputForm from 'components/atomic/LV2/InputForm';
import { Colors } from 'variables';
import { Section } from './Shared';
import imageFurnitureQuarter from 'images/furniture-quarter.svg';

type PropTypes = {
  edit: boolean,
  price: number,
  priceErrors: Array<string>,
  onChangePrice: Function,
  onClickBack: Function,
  onClickNext: Function,
  buttonLoading: boolean,
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

const Image = styled.img`
  margin-top: 30px;
`;

export default (props: PropTypes) => (
  <div>
    <H1>料金目安を設定する</H1>
    <Section>
      <H2>あなたのスペース料金はいくら？</H2>
    </Section>
    <Section>
      <InlineText.Base>
        様々な相談に対応できるように料金目安を設定しましょう！
        <br />
        地域により多少の差はありますが、1畳あたり7,000円が相場となっています。
      </InlineText.Base>
    </Section>
    <Section>
      <InputForm
        label="料金目安（スペースまるごと）"
        hint="スペースの全体を使用する荷物の場合の料金"
        placeholder="20000"
        unit="円"
        value={props.price}
        onChange={e => props.onChangePrice(e.target.value)}
      />
      {displayErrors('price_errors', props.priceErrors)}
    </Section>
    <Image src={imageFurnitureQuarter} alt="" />
    <Section>
      <InlineText.Base color={Colors.red} fontSize={14}>
        取引成立時、スペースを利用するユーザーが支払った金額の20%を、サービス利用手数料として徴収させていただきます。
      </InlineText.Base>
    </Section>
    <Section>
      <EntryButtons
        enabled
        loading={props.buttonLoading}
        backButton={{
          text: '戻る',
          onClick: props.onClickBack,
        }}
        enabledButton={{
          text: `${props.edit ? '編集' : '登録'}を完了する`,
          onClick: props.onClickNext,
        }}
      />
    </Section>
  </div>
);
