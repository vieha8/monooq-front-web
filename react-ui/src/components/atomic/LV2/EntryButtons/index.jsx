// @flow

import React from 'react';
import styled from 'styled-components';
import Button from 'components/atomic/LV1/Button';
import { Dimens } from 'variables';

const Container = styled.div`
  display: table;
  width: 100%;
`;

const Cell = styled.div`
  display: table-cell;
  width: 50%;
  text-align: ${props => props.align};
  padding-right: ${Dimens.small}px;
  &:not(:first-child) {
    padding-left: ${Dimens.small}px;
  }
`;

const Wrapper = styled.div`
  max-width: 224px;
`;

type PropTypes = {
  loading?: boolean,
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
        <Button secondary loading={props.loading} onClick={props.backButton.onClick}>
          {props.backButton.text}
        </Button>
      </Wrapper>
    </Cell>
    <Cell align="right">
      <Wrapper>
        {props.enabled ? (
          <Button primary loading={props.loading} onClick={props.enabledButton.onClick}>
            {props.enabledButton.text}
          </Button>
        ) : (
          <Button primary loading={props.loading} disabled>
            {props.disabledButton.text}
          </Button>
        )}
      </Wrapper>
    </Cell>
  </Container>
);
