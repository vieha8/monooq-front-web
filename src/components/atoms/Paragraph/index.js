// @flow

import styled from 'styled-components';
import { Colors } from 'variables';
import { media } from 'helpers/style/media-query';

export const Paragraph = styled.p`
  color: ${Colors.black};
  font-size: 16px;
  line-height: 1.6;
  ${props =>
    props.small &&
    `
    font-size: 12px;
  `} ${media.phone`
    font-size: 14px;
    ${props =>
      props.small &&
      `
      font-size: 11px;
    `}
  `};
`;

export default Paragraph;
