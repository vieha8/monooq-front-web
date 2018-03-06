import React from 'react';
import styled from 'styled-components';
import { ContentContainer } from 'components/Page';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const FillContentContainer = ContentContainer.extend`
  float: none;
`;

const Content = styled.div`
  padding-bottom: 300px;
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
  `}
`;

const Header = styled.div`
  font-size: ${FontSizes.large}px;
  line-height: 51px;
  letter-spacing: -0.5px;
  color: ${Colors.black};
`;

const Text = styled.div`
  display: block;
  font-size: ${FontSizes.medium}px;
  text-align: left;
  color: ${Colors.black};
  line-height: 1.6;
`;

const Link = styled.a`
  display: block;
  font-size: ${FontSizes.medium}px;
  text-align: left;
  color: ${Colors.linkBlue};
`;

const Row = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

export default () => (
  <FillContentContainer>
    <Content>
      <Header>退会処理が完了しました</Header>
      <Row>
        <Text>モノオクをご利用頂き、ありがとうございました。退会処理が完了しました。</Text>
      </Row>
      <Row>
        <Text>これからもみなさんにより便利に物置きシェアサービスを使って頂くために、</Text>
        <Text>サービス改善に努めて参ります。</Text>
      </Row>
      <Row>
        <Link href="/">トップページに戻る</Link>
      </Row>
    </Content>
  </FillContentContainer>
);
