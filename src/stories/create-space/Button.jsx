import React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { Colors, FontSizes, Dimens } from '../../variables';

const Container = styled.div`
  text-align: right;
  width: 100%;
  max-width: 600px;
  margin-top: ${Dimens.medium3}px;
`;

const styles = {
  button: {
    backgroundColor: Colors.pink,
    color: Colors.white,
    width: '240px',
    height: '60px',
    fontSize: FontSizes.medium,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
};

export default props => (
  <Container>
    <Button style={{ ...styles.button, ...styles.buttonDisabled }}>
      {props.children}
    </Button>
  </Container>
);
