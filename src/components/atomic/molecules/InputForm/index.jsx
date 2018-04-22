// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { H3 } from 'components/atomic/atoms/Headline';
import InlineText from 'components/atomic/atoms/InlineText';
import InputField from 'components/atomic/atoms/InputField';
import TextArea from 'components/atomic/atoms/TextArea';

const InputFieldWrapper = styled.div`
  display: inline-block;
  margin-top: 4px;
  width: 100%;
  ${props =>
    props.unit &&
    `
      width: 80%;
    `};
`;

const UnitWrapper = styled.div`
  display: inline-block;
  padding: 0 12px;
`;

type PropTypes = {
  label: string,
  hint?: string,
  placeholder?: string,
  unit?: string,
  value: string,
  onChange: Function,
  extension?: React.Element<*>,
  multiline?: boolean,
};

export default (props: PropTypes) => (
  <Fragment>
    <H3>{props.label}</H3>
    {props.hint && <InlineText.EmphasisSmall>{props.hint}</InlineText.EmphasisSmall>}
    <InputFieldWrapper unit={props.unit}>
      {props.extension ? (
        props.extension
      ) : props.multiline ? (
        <TextArea
          {...props}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      ) : (
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
