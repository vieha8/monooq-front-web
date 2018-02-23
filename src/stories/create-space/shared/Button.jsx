import React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { Colors, FontSizes, Dimens } from '../../../variables';

const Container = styled.div`
  display: inline-block;
  text-align: right;
  width: 50%;
  max-width: 600px;
  margin-top: ${Dimens.medium3}px;
  text-align: ${props => props.position || 'left'};
`;

const styles = {
  button: {
    backgroundColor: Colors.pink,
    color: Colors.white,
    width: '200px',
    height: '60px',
    fontSize: FontSizes.medium,
  },
  borderButton: {
    backgroundColor: Colors.white,
    color: Colors.pink,
    width: '200px',
    height: '60px',
    fontSize: FontSizes.medium,
    border: `1px solid ${Colors.pink}`,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
};

export default props => (
  <Container position={props.position}>
    <Button
      style={{
        ...(props.border ? styles.borderButton : styles.button),
        ...styles.buttonDisabled,
      }}
    >
      {props.children}
    </Button>
  </Container>
);
