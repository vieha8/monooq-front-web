// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import Select from 'components/LV1/Forms/Select';
import { H3 } from 'components/LV1/Texts/Headline';
import InlineText from 'components/LV1/Texts/InlineText';

const SelectWrapper = styled.div`
  margin-top: 6px;
`;

type PropTypes = {
  label: string,
  hint?: string,
  value: string,
  onChange: Function,
  options: Array<{
    text: string,
    value: any,
  }>,
  className?: string,
};

export default ({ label, hint, value, onChange, options, className }: PropTypes) => (
  <Fragment>
    <H3 bold>{label}</H3>
    {hint && <InlineText.EmphasisTiny>{hint}</InlineText.EmphasisTiny>}
    <SelectWrapper>
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
