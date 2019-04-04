// @flow

import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { FontSizes } from 'variables';

const SubCatchPhrase = styled.span`
  display: block;
  font-size: ${FontSizes.medium3}px;
  line-height: ${FontSizes.medium3 * 1.5}px;
  ${media.phone`
    font-size: ${FontSizes.medium}px;
    line-height: ${FontSizes.medium * 1.75}px;
    width: 100%;
  `};
`;

export default SubCatchPhrase;
