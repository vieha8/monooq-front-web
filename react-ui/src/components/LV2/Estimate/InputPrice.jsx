// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import InputForm from 'components/LV2/InputForm';
import InlineText from 'components/LV1/InlineText';
import { Colors, Dimens } from 'variables';

const TextWrap = styled.div`
  margin: ${Dimens.medium2}px auto;
`;

const Text = styled.div`
  margin: ${Dimens.small}px auto 0;
`;

const Error = styled.div`
  margin-top: ${Dimens.small}px 0;
`;

type PropTypes = {
  onChange: Function,
  value: string,
  errors: Array<string>,
};

export default ({ onChange, value, errors }: PropTypes) => (
  <Fragment>
    <div>
      <InputForm
        label="お見積もり料金"
        placeholder="金額を入力してください。"
        unit="円"
        onChange={e => onChange(e.target.value)}
        value={value}
      />
      {(errors || []).map((error, i) => (
        <Error key={`estimate_input_price_error_${i}`.toString()}>
          <InlineText.Small color={Colors.error}>{error}</InlineText.Small>
        </Error>
      ))}
    </div>
    <TextWrap>
      <Text>
        <InlineText.EmphasisTiny>※相手の相談に応じて料金を決めましょう。</InlineText.EmphasisTiny>
      </Text>
      <Text>
        <InlineText.EmphasisTiny>
          ※取引成立時の売上は、ユーザーがホストへお支払いするスペース利用総額からサービス手数料20%を引いた金額となります。
        </InlineText.EmphasisTiny>
      </Text>
    </TextWrap>
  </Fragment>
);
