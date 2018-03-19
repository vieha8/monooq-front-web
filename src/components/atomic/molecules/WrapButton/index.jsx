// @flow

import React from 'react';
import styled from 'styled-components';
import Button from 'components/atomic/atoms/Button';
import InlineText from 'components/atomic/atoms/InlineText';

const Container = styled.div`
  display: table;
  width: 100%;
  height: 40px;
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
  label: string,
  buttonComponent: React.Element<*>,
  button: {
    text: string,
    onClick: Function,
  },
  enabled: boolean,
}

export default (props: PropTypes) => (
  <Container>
    <Cell align="left">
      <Wrapper>
        <InlineText.Base fontSize={11}>{props.label}</InlineText.Base>
      </Wrapper>
    </Cell>
    <Cell align="right">
      <Wrapper>
        {props.enabled ? (
          <props.buttonComponent medium
            onClick={props.button.onClick}
          >
            {props.button.text}
          </props.buttonComponent>
        ) : (
            <props.buttonComponent medium disabled>
              {props.button.text}
            </props.buttonComponent>
          )}
      </Wrapper>
    </Cell>
  </Container>
);
