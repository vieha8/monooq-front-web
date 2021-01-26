import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import Select from 'components/LV1/Forms/Select';
import { H3 } from 'components/LV1/Texts/Headline';
import InlineText from 'components/LV1/Texts/InlineText';

const SelectWrapper = styled.div`
  margin-top: 6px;
  ${props =>
    props.width &&
    `
    width: ${props.width};
  `};
  ${props =>
    props.isInline &&
    `
    &:not(:first-child) {
      margin-left: ${Dimens.small_10}px;
    }
  `};
`;

const CustomSelect = ({ label, hint, value, onChange, options, width, isInline, className }) => (
  <Fragment>
    {label && (
      <H3 bold as="h3">
        {label}
      </H3>
    )}
    {hint && <InlineText.EmphasisTiny>{hint}</InlineText.EmphasisTiny>}
    <SelectWrapper width={width} isInline={isInline}>
      <Select value={value} onChange={onChange} className={className}>
        {options.map((option, i) => (
          <option key={`select_form_option_${i}`.toString()} value={option.value}>
            {option.text}
          </option>
        ))}
      </Select>
    </SelectWrapper>
  </Fragment>
);

export default CustomSelect;
