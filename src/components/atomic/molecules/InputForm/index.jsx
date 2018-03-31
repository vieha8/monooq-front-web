// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { H3 } from 'components/atomic/atoms/Headline';
import ClearfixContainer from 'components/atomic/atoms/ClearfixContainer';
import InlineText from 'components/atomic/atoms/InlineText';
import InputField from 'components/atomic/atoms/InputField';

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
  extension?: React.Element<*>,
}

export default (props: PropTypes) => (
  <Fragment>
    <H3>{props.label}</H3>
    {props.hint && <InlineText.Emphasis>{props.hint}</InlineText.Emphasis>}
    <InputFieldWrapper unit={props.unit}>
      {props.extension ? props.extension
        : (
          <InputField
            {...props}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
          />
        )}
    </InputFieldWrapper>
    {props.unit && (
      <UnitWrapper>
        <InlineText.Base>{props.unit}</InlineText.Base>
      </UnitWrapper>
    )}
  </Fragment>
);
