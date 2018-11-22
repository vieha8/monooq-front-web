// @flow

import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';

export const Section = styled.div`
  margin-top: ${Dimens.medium2}px;
  ${media.phone`
    margin-top: ${Dimens.small2}px;
  `};
`;

export default {};
