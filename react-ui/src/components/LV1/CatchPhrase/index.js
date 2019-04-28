// @flow

import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes } from 'variables';

const CatchPhrase = styled.h1`
  font-size: ${FontSizes.xxlarge}px;
  line-height: ${FontSizes.xxlarge * 1.5}px;
  font-weight: bold;
  text-align: left;
  width: 570px;
  height: 114px;
  margin-bottom: ${Dimens.small_10}px;
  ${media.phone`
    font-size: ${FontSizes.medium1}px;
    line-height: ${FontSizes.medium1 * 1.75}px;
    width: 100%;
    height: auto;
  `};
`;

export default CatchPhrase;
