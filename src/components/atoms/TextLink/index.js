// @flow

import styled from 'styled-components';
import { Colors } from 'variables';

const TextLink = styled.a`
  color: ${Colors.linkBlue};
  line-height: 1.6;
  font-size: ${props => props.fontSize || 16}px;
  cursor: pointer;

  &:link {
    color: ${Colors.linkBlue};
  }
  &:visited {
    color: ${Colors.linkBlue};
  }
  &:hover {
    color: ${Colors.linkBlue};
    opacity: 0.8;
  }
  &:active {
    color: ${Colors.linkBlue};
  }

  ${props =>
    props.disabled &&
    `
    cursor: not-allowed;
    color: ${Colors.lightGray1};
    &:link { color: ${Colors.lightGray1}; }
    &:visited { color: ${Colors.lightGray1}; }
    &:hover { color: ${Colors.lightGray1}; opacity: 1; }
    &:active { color: ${Colors.lightGray1}; }
  `};
`;

export default TextLink;
