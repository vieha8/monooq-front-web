import React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { Colors, FontSizes, Dimens } from '../../../variables';
import { media } from '../../../helpers/style/media-query';

const Container = styled.div`
  display: inline-block;
  text-align: right;
  width: ${props => (props.fill ? '100%' : '50%')};
  max-width: 600px;
  margin-top: ${Dimens.medium3}px;
  text-align: ${props => props.position || 'left'};
  ${media.phone`
    width: 120px;
  `}
`;

const ButtonWrapper = styled.div`
  width: 200px;
  ${media.phone`
    width: 100px;
  `}
`;

const styles = {
  button: {
    backgroundColor: Colors.pink,
    color: Colors.white,
    width: '100%',
    height: '50px',
    fontSize: FontSizes.medium,
  },
  borderButton: {
    backgroundColor: Colors.white,
    color: Colors.pink,
    width: '100%',
    height: '50px',
    fontSize: FontSizes.medium,
    border: `1px solid ${Colors.pink}`,
  },
  fillButton: {
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
};

export default props => (
  <Container fill={props.fill} position={props.position}>
    <ButtonWrapper>
      <Button
        style={{
          ...(props.border ? styles.borderButton : styles.button),
          ...(props.fill ? styles.fillButton : {}),
          ...styles.buttonDisabled,
        }}
      >
        {props.children}
      </Button>
    </ButtonWrapper>
  </Container>
);
