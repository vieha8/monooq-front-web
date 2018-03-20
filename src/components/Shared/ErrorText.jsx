import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';

const ErrorText = styled.span`
  display: block;
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.error};
  line-height: 1.5;
  margin-top: ${Dimens.small}px;
`;

export default props => (
  props.errors.map((e, i) => (
    <ErrorText key={`error_text_${i}`}>{e}</ErrorText>
  ))
);
