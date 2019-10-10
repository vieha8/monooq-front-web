// @flow

import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'semantic-ui-react';
import { Colors, Dimens, FontSizes } from 'variables';

const Container = styled.div`
  display: flex;
  cursor: pointer;
  vertical-align: top;
`;

const Label = styled.div`
  width: calc(100% - 27px);
  margin-left: ${Dimens.small_10}px;
  vertical-align: middle;
  font-size: ${FontSizes.small}px;
  line-height: ${Dimens.medium1}px;
  color: ${Colors.black};
`;

type PropTypes = {
  checked?: boolean,
  children: string,
  onClick: Function,
};

export default ({ onClick, checked, children }: PropTypes) => (
  <Container onClick={onClick}>
    <Checkbox checked={checked} />
    <Label>{children}</Label>
  </Container>
);
