// @flow

import React from 'react';
import styled from 'styled-components';
import InputForm from 'components/atomic/molecules/InputForm';
import InlineText from 'components/atomic/atoms/InlineText';
import { Colors, Dimens } from 'variables';

const Text = styled.div`
  margin: ${Dimens.medium}px 0;
`;

type PropTypes = {
  error: string,
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
        onChange={props.onChange}
        value={props.value}
      />
    </div>
    <Text>
      <InlineText.Emphasis>
        取引成立時の売上は、ユーザーがホストへお支払いするスペース利用総額からサービス手数料20%を引いた金額となります。
      </InlineText.Emphasis>
    </Text>
    {props.error && (
      <Text>
        <InlineText.Small color={Colors.error}>{props.error}</InlineText.Small>
      </Text>
    )}
  </div>
);
