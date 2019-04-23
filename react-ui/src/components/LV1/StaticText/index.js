// @flow

import styled from 'styled-components';
import { FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const Text = styled.div`
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : `${FontSizes.small_15}px`)};
  line-height: ${props =>
    props.fontSize ? `${props.fontSize * 2}px` : `${FontSizes.small_15 * 2}px`};
  ${media.phone`
    font-size: ${props => (props.fontSizeSp ? `${props.fontSizeSp}vw` : `4.5vw`)};
    line-height: ${props => (props.fontSizeSp ? `${props.fontSizeSp * 1.5}vw` : `${4.5 * 1.5}vw`)};
  `};
`;

export default Text;
