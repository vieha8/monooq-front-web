// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { H3 } from 'components/atomic/LV1/Headline';
import InlineText from 'components/atomic/LV1/InlineText';

const Field = styled.div`
  display: inline-block;
  margin-top: 6px;
  width: 100%;
`;

type PropTypes = {
  label: string,
  value: string,
};

export default (props: PropTypes) => (
  <Fragment>
    <H3 bold>
      <InlineText.Base fontSize={12}>{props.label}</InlineText.Base>
    </H3>
    <Field>
      <InlineText.Base bold>{props.value}</InlineText.Base>
    </Field>
  </Fragment>
);
