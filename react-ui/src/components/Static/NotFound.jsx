import React, { Fragment } from 'react';
import Path from 'config/path';

import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import DefaultContainer from 'components/atomic/containers/DefaultContainer';
import Footer from 'components/atomic/LV2/Footer';

const MainTitle = styled.div`
  font-size: 34px;
  line-height: 51px;
  ${media.phone`
    font-size: 32px;
  `};
`;

const MainTitleContainer = styled(DefaultContainer)`
  margin-top: 80px;
  margin-bottom: 37px;
  ${media.phone`
    margin-top: 40px;
  `};
`;

const Text = styled.div`
  font-size: 16px;
  line-height: 24px;
`;

const MessageContainer = styled(DefaultContainer)`
  margin-bottom: 30px;
`;

const RecommendLinkContainer = styled(DefaultContainer)`
  margin-bottom: 240px;
`;

const Anchor = styled.a`
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

const List = styled.div`
  font-size: 16px;
  line-height: 24px;
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
      {[
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
          path: Path.helpTop(),
        },
      ].map((v, i) => {
        return (
          <List key={i}>
            <Anchor href={v.path}>{v.text}</Anchor>
          </List>
        );
      })}
    </RecommendLinkContainer>
    <Footer />
  </Fragment>
);
