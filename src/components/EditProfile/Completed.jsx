import React from 'react';
import styled from 'styled-components';
import { ContentContainer } from 'components/Page';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Content = styled.div`
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
  `}
`;

const ToProfileLink = styled.a`
  display: block;
  font-size: ${FontSizes.medium}px;
  text-align: left;
  color: ${Colors.linkBlue};
  &:hover {
    color: ${Colors.linkBlue};
  }
`;

export default props => (
  <ContentContainer>
    <Content>
      <ToProfileLink href="/profile/1">自分のページを見る</ToProfileLink>
    </Content>
  </ContentContainer>
);
