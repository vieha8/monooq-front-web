import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';

const Container = styled.div`
  border-top: 1px solid ${Colors.borderGray};
  padding-top: ${Dimens.medium2}px;
  font-size: ${FontSizes.medium}px;
  color: black;
`;

export default () => (
  <Container>
    この予定をキャンセルしました
  </Container>
);
