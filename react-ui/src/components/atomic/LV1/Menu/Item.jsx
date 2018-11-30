// @flow

import styled from 'styled-components';
import { Colors } from 'variables';
import { media } from 'helpers/style/media-query';

const MenuItem = styled.li`
  display: table;
  width: 100%;
  padding: 0px 10px;
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
  ${media.phone`
    padding: 0px 5px;
  `};
`;

export default MenuItem;
