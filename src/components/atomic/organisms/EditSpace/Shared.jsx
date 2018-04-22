// @flow

import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';

export const Section = styled.div`
  margin-top: ${Dimens.medium3}px;
  ${media.phone`
    margin-top: ${Dimens.medium}px;
  `};
`;

export default {};
