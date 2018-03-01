import React from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';

const Container = styled.div`
  display: table;
  width: ${props => props.size || 16}px;
  height: ${props => props.size || 16}px;
  text-align: center;
`;

const IconWrapper = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const Icon = styled.i`
  font-size: ${props => props.fontSize || 16}px;
  color: ${props => props.color || Colors.orange};
`;

export default props => (
  <Container {...props}>
    <IconWrapper>
      <Icon className={`far fa-${props.name}`} {...props} />
    </IconWrapper>
  </Container>
);
