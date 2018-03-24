import React from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';
import Form from './Form';

const Container = styled.div`
  background: ${Colors.yellow};
  margin-top: -60px;
  padding: 80px 0;
`;

export default props => (
  <Container>
    <Form
      {...props}
    />
  </Container>
);
