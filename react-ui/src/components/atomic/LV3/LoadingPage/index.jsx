// @flow

import React from 'react';
import styled from 'styled-components';
import Loading from 'components/atomic/LV1/Loading';
import Header from 'components/atomic/containers/Header';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.8);
`;

const Content = styled.div`
  position: relative;
  top: 50%;
`;

type PropTypes = {
  hideProgress?: boolean,
};

export default (props: PropTypes) => (
  <Container>
    <Header />
    <Content>{!props.hideProgress && <Loading size="large" />}</Content>
  </Container>
);
