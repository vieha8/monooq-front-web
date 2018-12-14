// @flow

import styled from 'styled-components';
import { FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const Text = styled.p`
  font-size: ${FontSizes.small_15}px;
  line-height: ${FontSizes.small_15 * 2}px;
  ${media.phone`
    font-size: 4.5vw;
    line-height: ${4.5 * 1.5}vw;
  `};
`;

export default Text;
