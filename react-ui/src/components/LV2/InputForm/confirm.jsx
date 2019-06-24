// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { H3 } from 'components/LV1/Headline';
import InlineText from 'components/LV1/InlineText';

const Field = styled.div`
  display: inline-block;
  margin-top: 6px;
  width: 100%;
`;

type PropTypes = {
  label: string,
  value: string,
};

export default ({ label, value }: PropTypes) => (
  <Fragment>
    <H3 bold>
      <InlineText.Base fontSize={12}>{label}</InlineText.Base>
    </H3>
    <Field>
      <InlineText.Base bold>{value}</InlineText.Base>
    </Field>
  </Fragment>
);
