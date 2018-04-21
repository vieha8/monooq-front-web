// @flow

import React from 'react';
import styled from 'styled-components';
import InputForm from 'components/atomic/molecules/InputForm';
import InlineText from 'components/atomic/atoms/InlineText';
import { Colors, Dimens } from 'variables';

const Text = styled.div`
  margin: ${Dimens.medium}px 0;
`;

const Error = styled.div`
  margin-top: ${Dimens.small}px 0;
`;

type PropTypes = {
  errors: Array<string>,
  onChange: Function,
  value: string,
};

export default (props: PropTypes) => (
  <div>
    <Text>
      <InlineText.Emphasis>相手の相談に応じて料金を決めましょう。</InlineText.Emphasis>
    </Text>
    <div>
      <InputForm
        label="お見積もり料金"
        placeholder="金額を入力してください。"
        unit="円"
        onChange={e => props.onChange(e.target.value)}
        value={props.value}
      />
      {(props.errors || []).map((error, i) => (
        <Error key={`estimate_input_price_error_${i}`}>
          <InlineText.Small color={Colors.error}>{error}</InlineText.Small>
        </Error>
      ))}
    </div>
    <Text>
      <InlineText.Emphasis>
        取引成立時の売上は、ユーザーがホストへお支払いするスペース利用総額からサービス手数料20%を引いた金額となります。
      </InlineText.Emphasis>
    </Text>
  </div>
);
