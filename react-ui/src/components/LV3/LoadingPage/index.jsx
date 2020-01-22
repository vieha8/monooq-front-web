import React from 'react';
import styled from 'styled-components';
import { Colors, ZIndexes } from 'variables';
import Loading from 'components/LV1/Loading';

const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 1);
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-color: ${Colors.white};
  z-index: ${ZIndexes.loader};
`;

export default () => (
  <Wrap>
    <Content>
      <Loading loadingPage size="large" />
    </Content>
  </Wrap>
);
