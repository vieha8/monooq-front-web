// @flow

import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';

export const Section = styled.div`
  margin-top: 35px;
  ${media.phone`
    margin-top: ${Dimens.medium2}px;
  `};
`;

export default {};
