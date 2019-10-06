// @flow

import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { FontSizes, Colors } from 'variables';

const CatchPhraseSub = styled.h2`
  color: ${Colors.black2};
  display: block;
  font-size: ${FontSizes.medium_18}px;
  font-weight: bold;
  line-height: 116.75%;
  text-align: center;
  ${media.phone`
    width: 100%;
    font-size: ${FontSizes.small_12}px;
  `};
`;

export default CatchPhraseSub;
