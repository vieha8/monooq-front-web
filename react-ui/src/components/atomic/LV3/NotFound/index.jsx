import React, { Fragment } from 'react';
import Path from 'config/path';

import styled from 'styled-components';
import { Dimens } from 'variables';
import DefaultContainer from 'components/atomic/LV1/DefaultContainer';
import Footer from 'components/atomic/LV2/Footer';
import MainTitleContainer from 'components/atomic/LV2/StaticMainTitle';
import RecommendLinkList from 'components/atomic/LV2/RecommendLinkList';
import Text from 'components/atomic/LV1/StaticText';

const MessageContainer = styled(DefaultContainer)`
  margin-bottom: ${Dimens.medium2}px;
`;

export default () => (
  <Fragment>
    <MainTitleContainer
      mainTitle="ごめんなさい！"
      mainTitleSub="お探しのページが見つかりません。"
    />

    <MessageContainer>
      <Text>
        404エラー
        <br />
        ご指定のページは削除されたか、移動した可能性があります。
      </Text>
    </MessageContainer>

    <RecommendLinkList
      Text="参考のリンク"
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

    <Footer />
  </Fragment>
);
