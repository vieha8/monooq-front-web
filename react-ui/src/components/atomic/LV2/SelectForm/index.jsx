// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { H3 } from 'components/atomic/LV1/Headline';
import InlineText from 'components/atomic/LV1/InlineText';
import Select from 'components/atomic/LV1/Select';

const SelectWrapper = styled.div`
  margin-top: 6px;
`;

type PropTypes = {
  label: string,
  options: Array<{
    text: string,
    value: any,
  }>,
  hint?: string,
  value: string,
  onChange: Function,
};

export default (props: PropTypes) => (
  <Fragment>
    <H3 bold>{props.label}</H3>
    {props.hint && <InlineText.EmphasisTiny>{props.hint}</InlineText.EmphasisTiny>}
    <SelectWrapper>
      <Select value={props.value} onChange={props.onChange}>
        {props.options.map((option, i) => (
          <option key={`select_form_option_${i}`.toString()} value={option.value}>
            {option.text}
          </option>
        ))}
      </Select>
    </SelectWrapper>
  </Fragment>
);
