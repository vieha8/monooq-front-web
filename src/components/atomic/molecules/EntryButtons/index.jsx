// @flow

import React from 'react';
import styled from 'styled-components';
import Button from 'components/atomic/atoms/Button';

const Container = styled.div`
  display: table;
  width: 100%;
`;

const Cell = styled.div`
  display: table-cell;
  width: 50%;
  text-align: ${props => props.align};
`;

const Wrapper = styled.div`
  max-width: 224px;
`;

type PropTypes = {
  backButton: {
    text: string,
    onClick: Function,
  },
  disabledButton: {
    text: string,
  },
  enabledButton: {
    text: string,
    onClick: Function,
  },
  enabled: boolean,
};

export default (props: PropTypes) => (
  <Container>
    <Cell align="left">
      <Wrapper>
        <Button secondary onClick={props.backButton.onClick}>
          {props.backButton.text}
        </Button>
      </Wrapper>
    </Cell>
    <Cell align="right">
      <Wrapper>
        {props.enabled ? (
          <Button primary onClick={props.enabledButton.onClick}>
            {props.enabledButton.text}
          </Button>
        ) : (
          <Button primary disabled>
            {props.disabledButton.text}
          </Button>
        )}
      </Wrapper>
    </Cell>
  </Container>
);
