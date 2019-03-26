// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Height as HeaderHeight } from 'components/LV3/Header';

const Content = styled.div`
  margin-top: ${HeaderHeight}px;
`;

type PropTypes = {
  meta: React.Element<*>,
  header: React.Element<*>,
  profile: React.Element<*>,
};

export default ({ meta, header, profile }: PropTypes) => (
  <Fragment>
    {meta}
    {header}
    <Content>{profile}</Content>
  </Fragment>
);
