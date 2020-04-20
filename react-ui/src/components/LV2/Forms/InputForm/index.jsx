import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, Colors } from 'variables';
import Check from 'components/LV1/Forms/CheckBox';
import InputField from 'components/LV1/Forms/InputField';
import { H3 } from 'components/LV1/Texts/Headline';
import InlineText from 'components/LV1/Texts/InlineText';

const Label = styled(H3)`
  display: ${props => (props.labelSub ? 'inline' : 'display')};
`;

const LabelSub = styled(InlineText.Tiny)`
  margin-left: ${Dimens.xxsmall_4}px;
  color: ${Colors.lightGray10};
`;

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
  ${props =>
    props.hintBottomRight &&
    `
      text-align: right;
    `};
`;

export default ({
  label,
  labelSub,
  hint,
  checkbox,
  fontSize,
  labelCheckBox,
  checked,
  onChange,
  onClick,
  onClickCheck,
  onKeyDown,
  options,
  name,
  margintop,
  extension,
  multiline,
  rows,
  placeholder,
  value,
  type,
  autoComplete,
  hintbottom,
  hintBottomRight,
  unit,
  className,
  disabled,
}) => (
  <Fragment>
    {label && (
      <Label as="h3" bold labelSub={labelSub}>
        {label}
      </Label>
    )}
    {labelSub && <LabelSub>{labelSub}</LabelSub>}
    {hint && <InlineText.EmphasisSmall>{hint}</InlineText.EmphasisSmall>}
    {checkbox ? (
      <Check
        fontSize={fontSize}
        label={labelCheckBox}
        checked={checked}
        onClick={onClick}
        onClickCheck={onClickCheck}
        onKeyDown={onKeyDown}
        className={className}
        options={options}
      />
    ) : (
      <InputFieldWrapper unit={unit} margintop={margintop}>
        {extension ||
          (multiline ? (
            <InputField
              as="textarea"
              rows={rows}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
          ) : (
            <InputField
              name={name}
              type={type}
              autoComplete={autoComplete}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className={className}
              onKeyDown={onKeyDown}
              disabled={disabled}
            />
          ))}
      </InputFieldWrapper>
    )}
    {hintbottom && (
      <HintBottomWrap hintBottomRight={hintBottomRight}>
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
