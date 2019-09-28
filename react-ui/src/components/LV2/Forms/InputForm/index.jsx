// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import Check from 'components/LV1/Forms/CheckBox';
import InputField from 'components/LV1/Forms/InputField';
import TextArea from 'components/LV1/Forms/TextArea';
import { H3 } from 'components/LV1/Texts/Headline';
import InlineText from 'components/LV1/Texts/InlineText';

const InputFieldWrapper = styled.div`
  display: inline-block;
  margin-top: ${props => props.margintop || 8}px;
  width: 100%;
  ${props =>
    props.unit &&
    `
      width: calc(100% - 40px);
    `};
`;

const UnitWrapper = styled.div`
  display: inline-block;
  padding: 0 ${Dimens.small2}px;
`;

const HintBottomWrap = styled.div`
  margin-top: ${Dimens.small}px;
`;

const CheckWrap = styled.div`
  margin-top: ${Dimens.small}px;
`;

type PropTypes = {
  label?: string,
  hint?: string,
  checkbox?: boolean,
  checked?: boolean,
  onClick?: Function,
  onKeyDown?: Function,
  checktext?: string,
  margintop?: number,
  extension?: React.Element<*>,
  multiline?: boolean,
  rows?: number,
  placeholder?: string,
  value: string,
  type?: string,
  autoComplete?: string,
  onChange?: Function,
  hintbottom?: string,
  unit?: string,
  className?: string,
};

export default ({
  label,
  hint,
  checkbox,
  checked,
  onClick,
  onKeyDown,
  checktext,
  margintop,
  extension,
  multiline,
  rows,
  placeholder,
  value,
  type,
  autoComplete,
  onChange,
  hintbottom,
  unit,
  className,
}: PropTypes) => (
  <Fragment>
    <H3 bold>{label}</H3>
    {hint && <InlineText.EmphasisSmall>{hint}</InlineText.EmphasisSmall>}
    {checkbox ? (
      <CheckWrap>
        <Check checked={checked} onClick={onClick} onKeyDown={onKeyDown}>
          {checktext}
        </Check>
      </CheckWrap>
    ) : (
      <InputFieldWrapper unit={unit} margintop={margintop}>
        {extension ||
          (multiline ? (
            <TextArea rows={rows} placeholder={placeholder} value={value} onChange={onChange} />
          ) : (
            <InputField
              type={type}
              autoComplete={autoComplete}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className={className}
            />
          ))}
      </InputFieldWrapper>
    )}
    {hintbottom && (
      <HintBottomWrap>
        <InlineText.Tiny>{hintbottom}</InlineText.Tiny>
      </HintBottomWrap>
    )}
    {unit && (
      <UnitWrapper>
        <InlineText.Base>{unit}</InlineText.Base>
      </UnitWrapper>
    )}
  </Fragment>
);
