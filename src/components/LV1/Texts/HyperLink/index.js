import styled from 'styled-components';
import { Colors, FontSizes } from 'variables';
import { mediaMin } from 'helpers/style/media-query';

const HyperLink = styled.a`
  color: ${Colors.brandPrimary};
  font-size: ${FontSizes.small_15}px;
  &:active {
    color: ${Colors.brandPrimary};
    opacity: 0.8;
  }
  ${mediaMin.tablet`
    &:hover {
      color: ${Colors.brandPrimary};
      opacity: 0.8;
    }
  `};
`;

export default HyperLink;
