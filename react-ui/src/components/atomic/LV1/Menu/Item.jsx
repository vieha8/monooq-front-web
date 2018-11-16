// @flow

import styled from 'styled-components';
import { Colors } from 'variables';

const MenuItem = styled.li`
  display: table;
  width: 100%;
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
  ${props =>
    props.line &&
    `
    border-top: 1px solid ${Colors.borderGray};
  `};
`;

export default MenuItem;
