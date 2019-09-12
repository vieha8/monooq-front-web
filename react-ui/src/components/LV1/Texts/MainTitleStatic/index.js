// @flow

import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const MainTitleStatic = styled.div`
  font-size: ${FontSizes.xlarge}px;
  font-weight: bold;
  line-height: ${Dimens.medium3_44}px;
  margin-bottom: ${Dimens.medium_22}px;
  ${media.phone`
    font-size: ${FontSizes.medium2}px;
    line-height: normal;
    margin-bottom: ${Dimens.small2}px;
  `};
`;

export default MainTitleStatic;
