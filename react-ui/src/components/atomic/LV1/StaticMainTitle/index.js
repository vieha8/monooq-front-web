// @flow

import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const MainTitle = styled.div`
  font-size: ${FontSizes.xlarge}px;
  line-height: ${Dimens.large}px;
  margin-bottom: ${Dimens.medium3}px;
  ${media.phone`
    font-size: ${FontSizes.medium2}px;
    line-height: normal;
    margin-bottom: ${Dimens.medium_20}px;
  `};
`;

export default MainTitle;
