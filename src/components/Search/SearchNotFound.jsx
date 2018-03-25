import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Colors, Dimens, FontSizes } from 'variables/';

const PageContainer = styled.div``;

const ContentContainer = styled.div`
  padding: ${Dimens.huge}px 8%;
  padding-bottom: 80px;

  ${media.phone`
    padding-left: 0;
    padding-right: 0;
    padding-top: ${Dimens.medium3}px;
  `};
`;

const Title = styled.h1`
  font-size: ${FontSizes.large}px;
  color: ${Colors.darkGray1};
  padding: 0 4%;
  line-height: 1.5;
`;

const Caption = styled.h2`
  font-size: ${FontSizes.medium}px;
  color: ${Colors.darkGray1};
  padding: 0 4%;
  margin-top: ${Dimens.medium}px;
  line-height: 1.5;
`;

export default props => (
  <PageContainer>
    <ContentContainer>
      <Title>ごめんなさい！<br />入力したキーワードの検索結果はありませんでした。</Title>
    </ContentContainer>
  </PageContainer>
);
