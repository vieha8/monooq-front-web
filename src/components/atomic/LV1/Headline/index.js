// @flow

import styled from 'styled-components';
import { Colors } from 'variables';
import { media } from 'helpers/style/media-query';

export const H1 = styled.h1`
  color: ${Colors.black};
  font-size: 34px;
  line-height: 1.6;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  ${media.phone`
    font-size: 22px;
  `};
`;

export const H2 = H1.withComponent('h2').extend`
  font-size: 30px;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  ${media.phone`
    font-size: 20px;
  `}
`;

export const H3 = H1.withComponent('h3').extend`
  font-size: 16px;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  ${media.phone`
    font-size: 14px;
  `}
`;
