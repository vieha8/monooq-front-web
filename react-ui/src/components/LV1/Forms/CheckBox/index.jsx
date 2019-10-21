// @flow

import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'semantic-ui-react';

const Container = styled.div`
  display: flex;
  cursor: pointer;
  vertical-align: top;
`;

type PropTypes = {
  label: string,
  checked?: boolean,
  onClick?: Function,
  onClickCheck?: Function,
};

export default ({ onClick, label, checked, onClickCheck, options }: PropTypes) => (
  <Container onClick={onClick}>
    <Checkbox label={label} checked={checked} onChange={onClickCheck} {...options} />
  </Container>
);
