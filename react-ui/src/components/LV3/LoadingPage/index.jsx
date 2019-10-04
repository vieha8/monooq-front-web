// @flow

import React from 'react';
import styled from 'styled-components';
import Loading from 'components/LV1/Loading';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 1);
`;

const Content = styled.div`
  position: relative;
  top: 50%;
`;

export default () => (
  <Container>
    <Content>
      <Loading size="large" />
    </Content>
  </Container>
);
