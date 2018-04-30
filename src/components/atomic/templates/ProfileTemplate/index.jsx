// @flow

import React from 'react';
import styled from 'styled-components';
import { Height as HeaderHeight } from 'components/atomic/LV3/Header';

const Content = styled.div`
  margin-top: ${HeaderHeight}px;
`;

type PropTypes = {
  header: React.Element<*>,
  profile: React.Element<*>,
  footer: React.Element<*>,
};

export default (props: PropTypes) => (
  <div>
    {props.header}
    <Content>{props.profile}</Content>
    {props.footer}
  </div>
);
