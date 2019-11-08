import styled from 'styled-components';
import { FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const Text = styled.div`
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : `${FontSizes.small_15}px`)};
  line-height: ${props =>
    props.fontSize ? `${props.fontSize * 1.5}px` : `${FontSizes.small_15 * 1.5}px`};
  ${media.phone`
    font-size: ${props => (props.fontSizeSp ? `${props.fontSizeSp}px` : `${FontSizes.small}px`)};
    line-height: ${props =>
      props.fontSizeSp ? `${props.fontSizeSp * 1.5}px` : `${FontSizes.small * 1.5}px`};
  `};
`;

export default Text;
