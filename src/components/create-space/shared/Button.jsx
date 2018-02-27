import React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

export const ButtonsContainer = styled.div`
  width: 100%;
`;

const Container = styled.div`
  display: inline-block;
  margin-top: ${Dimens.medium3}px;
  text-align: ${props => props.position || 'left'};
  width: 50%;
  ${media.phone`
    width: auto;
    &:not(:first-child) {
      margin-left: ${Dimens.medium}px;
    }
  `}
`;

const Wrapper = styled.div`
  display: inline-block;
  width: 100%;
  max-width: ${props => props.width || 200}px;
  ${media.phone`
    max-width: ${props => props.width || 100}px;
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
  <Container position={props.position}>
    <Wrapper width={props.width}>
      <Button
        onClick={props.onClick}
        style={{
          ...(props.border ? styles.borderButton : styles.button),
          ...(props.fill || props.wide ? styles.fillButton : {}),
          ...styles.buttonDisabled,
        }}
      >
        {props.children}
      </Button>
    </Wrapper>
  </Container>
);
