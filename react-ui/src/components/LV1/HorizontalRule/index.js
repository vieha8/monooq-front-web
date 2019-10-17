// @flow

import styled from 'styled-components';
import { Dimens, Colors } from 'variables';
import { media } from 'helpers/style/media-query';

const Hr = styled.hr`
  border: 0;
  height: 1px;
  width: ${props => (props.width ? props.width : '100%')};
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : Colors.lightGray2)};
  margin: ${props => (props.margin ? props.margin : `${Dimens.medium4}px 0`)};
  ${media.tablet`
    margin: ${props => (props.marginPhone ? props.marginPhone : `${Dimens.medium_20}px 0`)};
  `};
`;

export default Hr;
