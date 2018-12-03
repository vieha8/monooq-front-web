// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import Check from 'components/atomic/LV1/Check';
import { H3 } from 'components/atomic/LV1/Headline';
import InlineText from 'components/atomic/LV1/InlineText';
import InputField from 'components/atomic/LV1/InputField';
import TextArea from 'components/atomic/LV1/TextArea';

const InputFieldWrapper = styled.div`
  display: inline-block;
  margin-top: ${props => props.margintop || 6}px;
  width: 100%;
  ${props =>
    props.unit &&
    `
      width: calc(100% - 40px);
    `};
`;

const UnitWrapper = styled.div`
  display: inline-block;
  padding: 0 12px;
`;

const HintBottomWrap = styled.div`
  margin-top: 5px;
`;

const CheckWrap = styled.div`
  margin-top: 15px;
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
    {props.checkbox ? (
      <CheckWrap>
        <Check checked={props.checked} onClick={props.onClick}>
          {props.checktext}
        </Check>
      </CheckWrap>
    ) : (
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
    )}
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
