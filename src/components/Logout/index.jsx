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

const Title = styled.div`
  display: block;
  font-size: ${FontSizes.medium}px;
  text-align: left;
  color: ${Colors.black};
`;

const ToTopLink = styled.a`
  display: block;
  margin-top: ${Dimens.medium2}px;
  font-size: ${FontSizes.medium}px;
  text-align: left;
  color: ${Colors.linkBlue};
  &:hover {
    color: ${Colors.linkBlue};
  }
`;

export default () => (
  <ContentContainer>
    <Content>
      <Title>ログアウトが完了しました。</Title>
      <ToTopLink href="/">トップページへ戻る</ToTopLink>
    </Content>
  </ContentContainer>
);
