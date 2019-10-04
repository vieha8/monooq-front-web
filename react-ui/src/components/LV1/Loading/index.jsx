// @flow

import React from 'react';
import styled from 'styled-components';
import { Loader } from 'semantic-ui-react';

const Wrap = styled.span`
  ${props =>
    props.loadingPage &&
    `
    position: fixed;
    top: calc(50% - 27.42px);
    left: calc(50% - 27.42px);
  `};
`;

type PropTypes = {
  loadingPage?: boolean,
  size: 'mini' | 'medium' | 'large',
};

export default ({ loadingPage, size }: PropTypes) => (
  <Wrap loadingPage={loadingPage}>
    <Loader active inline="centered" size={size} />
  </Wrap>
);
