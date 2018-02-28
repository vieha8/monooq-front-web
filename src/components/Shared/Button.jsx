import React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { Colors } from 'variables';

const Container = styled.div`
  ${props => props.borderColor && `
    border: 1px solid ${props.borderColor};
    border-radius: 6px;
  `}
`;

const CustomButton = styled(Button)`
  max-width: ${props => props.style.maxWidth}px;
  color: ${props => props.style.fontColor || Colors.white} !important;
  background: ${props => props.style.bgColor || Colors.pink} !important;
  font-size: ${props => props.style.fontSize || Colors.white}px !important;
  font-weight: ${props => (props.style.bold ? 'bold' : 'normal')} !important;
`;

export default props => (
  <Container {...props}>
    <CustomButton
      fluid={props.fluid}
      onClick={props.onClick}
      style={props}
    >
      {props.children}
    </CustomButton>
  </Container>
);
