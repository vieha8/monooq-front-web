// @flow

import styled from 'styled-components';
import { Dimens, Colors } from 'variables';
import { media } from 'helpers/style/media-query';

const Hr = styled.hr`
  border: 0;
  height: 1px;
  width: 100%;
  background-color: ${Colors.lightGray2};
  margin: ${Dimens.medium4}px 0;
  ${media.phone`
    margin: ${Dimens.medium_20}px 0;
  `};
`;

export default Hr;
