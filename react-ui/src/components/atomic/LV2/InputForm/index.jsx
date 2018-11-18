// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { H3 } from 'components/atomic/LV1/Headline';
import InlineText from 'components/atomic/LV1/InlineText';
import InputField from 'components/atomic/LV1/InputField';
import TextArea from 'components/atomic/LV1/TextArea';

const InputFieldWrapper = styled.div`
  display: inline-block;
  margin-top: ${props => props.margintop || 4}px;
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

const HintBottomWrap = styled.div`
  margin-top: 5px;
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
    <H3 bold>{props.label}</H3>
    {props.hint && <InlineText.EmphasisSmall>{props.hint}</InlineText.EmphasisSmall>}
    <InputFieldWrapper unit={props.unit} margintop={props.margintop}>
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
    {props.hintbottom && (
      <HintBottomWrap>
        <InlineText.Tiny>{props.hintbottom}</InlineText.Tiny>
      </HintBottomWrap>
    )}
    {props.unit && (
      <UnitWrapper>
        <InlineText.Base>{props.unit}</InlineText.Base>
      </UnitWrapper>
    )}
  </Fragment>
);
