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
  line-height: 1.5;
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
      <Header>退会処理が完了できませんでした</Header>
      <Row>
        <Text>現在進行中の取引があります。</Text>
        <Text>荷物の引取りや、引き渡しが完了していない場合は退会退会ができません。</Text>
        <Text>スケジュールを確認して取引を完了してください。</Text>
      </Row>
      <Row>
        <Link href="/hostidtemp/deposit-schedule">預かりスケジュールを見る</Link>
      </Row>
    </Content>
  </FillContentContainer>
);
