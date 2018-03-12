// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { H3 } from 'components/atoms/Headline';
import ClearfixContainer from 'components/atoms/ClearfixContainer';
import InlineText from 'components/atoms/InlineText';
import InputField from 'components/atoms/InputField';

const InputFieldWrapper = styled.div`
  display: inline-block;
  margin-top: 4px;
  width: 100%;
  ${props => props.unit && `
    width: 85vw;
  `}
`;

const UnitWrapper = styled.div`
  display: inline-block;
  padding: 0 12px;
`

type PropTypes = {
  label: string,
  hint?: string,
  placeholder?: string,
  unit?: string,
  value: string,
  onChange: Function,
}

export default (props: PropTypes) => (
  <Fragment>
    <H3>{props.label}</H3>
    {props.hint && <InlineText.Emphasis>{props.hint}</InlineText.Emphasis>}
    <InputFieldWrapper unit={props.unit}>
      <InputField
        {...props}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </InputFieldWrapper>
    {props.unit && (
      <UnitWrapper>
        <InlineText.Base>{props.unit}</InlineText.Base>
      </UnitWrapper>
    )}
  </Fragment>
);
