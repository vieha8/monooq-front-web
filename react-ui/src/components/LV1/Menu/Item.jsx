// @flow

import styled from 'styled-components';
import { Colors } from 'variables';
import { media } from 'helpers/style/media-query';

const MenuItem = styled.li`
  display: table;
  width: 100%;
  margin: auto;
  background: ${Colors.white};
  &:hover {
    cursor: pointer;
    background: ${Colors.lightGray1Bg};
  }
  &:not(:last-child) {
    border-bottom: none;
  }
  ${media.tablet`
    width: calc(100% - 40px);
  `};
  ${media.phone`
    padding: 0px;
  `};
`;

export default MenuItem;
