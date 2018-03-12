// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { H3 } from 'components/atoms/Headline';
import InlineText from 'components/atoms/InlineText';
import InputField from 'components/atoms/InputField';

const InputFieldWrapper = styled.div`
  margin-top: 4px;
`;

type PropTypes = {
  label: string,
  hint?: string,
  placeholder?: string,
  value: string,
  onChange: Function,
}

export default (props: PropTypes) => (
  <Fragment>
    <H3>{props.label}</H3>
    {props.hint && <InlineText.Emphasis>{props.hint}</InlineText.Emphasis>}
    <InputFieldWrapper>
      <InputField
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </InputFieldWrapper>
  </Fragment>
);
