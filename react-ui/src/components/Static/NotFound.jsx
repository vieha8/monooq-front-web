import React, { Fragment } from 'react';
import Path from 'config/path';

import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes } from 'variables';
import DefaultContainer from 'components/atomic/containers/DefaultContainer';
import Footer from 'components/atomic/LV2/Footer';
import LinkList from 'components/atomic/LV2/LinkList';
import { Height as HeaderHeight } from 'components/atomic/LV3/Header';

const MainTitle = styled.div`
  font-size: ${FontSizes.xxlarge}px;
  line-height: ${Dimens.large}px;
  ${media.phone`
    font-size: ${FontSizes.medium2}px;
    line-height: normal;
  `};
`;

const MainTitleContainer = styled(DefaultContainer)`
  margin-top: calc(${HeaderHeight}px + ${Dimens.large2}px);
  margin-bottom: ${Dimens.medium3_40}px;
  ${media.phone`
    margin-top: ${Dimens.medium3_40}px;
  `};
`;

const Text = styled.div`
  line-height: ${Dimens.medium1}px;
`;

const MessageContainer = styled(DefaultContainer)`
  margin-bottom: ${Dimens.medium2}px;
`;

const RecommendLinkContainer = styled(DefaultContainer)`
  margin-bottom: 240px;
`;

export default () => (
  <Fragment>
    <MainTitleContainer>
      <MainTitle>
        ごめんなさい！
        <br />
        お探しのページが見つかりません。
      </MainTitle>
    </MainTitleContainer>

    <MessageContainer>
      <Text>
        404エラー
        <br />
        ご指定のページは削除されたか、移動した可能性があります。
      </Text>
    </MessageContainer>

    <RecommendLinkContainer>
      <Text>参考のリンク</Text>
      <LinkList
        list={[
          {
            text: 'トップページへ戻る',
            path: '/',
          },
          {
            text: 'ホストになる',
            path: Path.signUp(),
          },
          {
            text: 'はじめての方へ',
            path: Path.about(),
          },
          {
            text: 'ヘルプ',
            path: 'https://help.monooq.com/',
            blank: '_blank',
          },
        ]}
      />
    </RecommendLinkContainer>
    <Footer />
  </Fragment>
);
