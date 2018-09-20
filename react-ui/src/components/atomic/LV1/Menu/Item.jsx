// @flow

import styled from 'styled-components';
import { Colors } from 'variables';

const MenuItem = styled.li`
  display: table;
  width: 100%;
  border: 1px solid ${Colors.borderGray};
  background: ${Colors.white};
  &:hover {
    cursor: pointer;
    background: ${Colors.lightGray1Bg};
  }
  &:not(:last-child) {
    border-bottom: none;
  }
  ${props =>
    !props.show &&
    `
    display: none;
  `};
`;

export default MenuItem;
