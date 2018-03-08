import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

export const Content = styled.div`
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
  `};
`;

export const Text = styled.div`
  font-size: ${FontSizes.medium}px;
  color: ${Colors.black};
  line-height: 1.6;
`;

export const ToTopLink = styled.a`
  display: block;
  color: ${Colors.linkBlue};
  font-size: ${FontSizes.medium}px;
  margin-top: ${Dimens.medium}px;
`;
