import React from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';
import Form from './Form';

const Container = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${Colors.yellow};
`;

export default props => (
  <Container>
    <Form
      {...props}
    />
  </Container>
);
