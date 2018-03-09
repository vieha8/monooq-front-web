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

const MessagePragrah = styled.div`
  font-size: 18px;
  line-height: 32px;
  margin-bottom: 45px;
`;

const ToTopPageLink = styled.a`
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
      <MessagePragrah>違反・不適切な内容を送信しました。<br />これからもみなさんにより便利に物置きシェアサービスを使って頂くために、サービス改善に努めて参ります。</MessagePragrah>
      <ToTopPageLink href="/">トップページに戻る</ToTopPageLink>
    </Content>
  </ContentContainer>
);
