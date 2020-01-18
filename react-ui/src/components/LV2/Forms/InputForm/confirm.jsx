import React, { Fragment } from 'react';
import styled from 'styled-components';
import { H3 } from 'components/LV1/Texts/Headline';
import InlineText from 'components/LV1/Texts/InlineText';

const Field = styled.div`
  display: inline-block;
  margin-top: 6px;
  width: 100%;
`;

export default ({ label, value }) => (
  <Fragment>
    <H3 bold as="h3">
      <InlineText.Base fontSize={12}>{label}</InlineText.Base>
    </H3>
    <Field>
      <InlineText.Base bold>{value}</InlineText.Base>
    </Field>
  </Fragment>
);
