// @flow

import React from 'react';
import styled from 'styled-components';
import Loading from 'components/atomic/atoms/Loading';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255,255,255,0.8);
`;

const Content = styled.div`
  position: relative;
  top: 50%;
`;

export default () => (
  <Container>
    <Content><Loading size="large" /></Content>
  </Container>
);
