// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { H3 } from 'components/atoms/Headline';
import InlineText from 'components/atoms/InlineText';
import Select from 'components/atoms/Select';

const SelectWrapper = styled.div`
  margin-top: 4px;
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
}

export default (props: PropTypes) => (
  <Fragment>
    <H3>{props.label}</H3>
    {props.hint && <InlineText.Emphasis>{props.hint}</InlineText.Emphasis>}
    <SelectWrapper>
      <Select
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map((option, i) => (
          <option key={`select_form_option_${i}`} value={option.value}>{option.text}</option>
        ))}
      </Select>
    </SelectWrapper>
  </Fragment>
);
