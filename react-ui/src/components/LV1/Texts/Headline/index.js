import styled from 'styled-components';
import { Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

export const H1 = styled.h1`
  color: ${Colors.black};
  font-size: ${FontSizes.medium2}px;
  line-height: normal;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  ${media.phone`
    font-size: ${FontSizes.medium2}px;
  `};
`;

export const H2 = styled(H1.withComponent('h2'))`
  font-size: 26px;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  ${media.phone`
    font-size: 20px;
  `};
`;

export const H3 = styled(H1.withComponent('h3'))`
  font-size: ${FontSizes.small_15}px;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  ${media.phone`
    font-size: ${FontSizes.small_15}px;
  `};
`;
