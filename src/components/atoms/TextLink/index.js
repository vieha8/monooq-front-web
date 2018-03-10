// @flow

import styled from 'styled-components';
import { Colors } from 'variables';

const TextLink = styled.a`
  color: ${Colors.linkBlue};
  line-height: 1.6;
  font-size: 16px;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }

  ${props =>
    props.disabled &&
    `
    color: ${Colors.lightGray1};
  `} ${props =>
      props.small &&
      `
    font-size: 12px;
  `};
`;

export default TextLink;
