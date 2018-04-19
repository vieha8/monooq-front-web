// @flow

import React from 'react';
import InputForm from 'components/atomic/molecules/InputForm';
import InlineText from 'components/atomic/atoms/InlineText';
import { Colors } from 'variables';

type PropTypes = {
  error: string,
  onChange: Function,
  value: string,
};

export default (props: PropTypes) => (
  <div>
    <div>
      <InputForm
        label="お見積もり料金"
        placeholder="金額を入力してください。"
        unit="円"
        onChange={props.onChange}
        value={props.value}
      />
    </div>
    {props.error && <InlineText.Small color={Colors.error}>{props.error}</InlineText.Small>}
  </div>
);
