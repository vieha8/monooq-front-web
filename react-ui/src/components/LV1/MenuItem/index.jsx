// @flow

import styled from 'styled-components';
import { Colors } from 'variables';
import { media } from 'helpers/style/media-query';

const MenuItem = styled.li`
  position: relative;
  display: table;
  width: 100%;
  margin: auto;
  font-weight: 500;
  border-top: 1px solid ${Colors.borderGray2};
  &:hover {
    cursor: pointer;
    background: ${Colors.lightGray1Bg};
  }
  &:before {
    position: absolute;
    top: 50%;
    right: 20px;
    display: block;
    content: '';
    width: 10px;
    height: 10px;
    margin-top: -5px;
    border-top: 1.5px solid ${Colors.black2};
    border-right: 1.5px solid ${Colors.black2};
    transform: rotate(45deg);
  }
  &:first-child {
    border-top: none;
  }
  &:last-child:before {
    content: none;
  }
  ${media.tablet`
    width: calc(100% - 40px);
  `};
  ${media.phone`
    padding: 0px;
  `};
`;

export default MenuItem;
