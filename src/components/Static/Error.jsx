import React, { Fragment } from 'react';
import Path from 'config/path';

import styled from 'styled-components';
import {media} from 'helpers/style/media-query';

import { Footer } from 'components/Shared';

const DefaultContainer = styled.div`
  padding: 0 116px;
  ${media.phone`
    padding: 0 8vw;
  `};
`;

const MainTitle = styled.div`
  font-size: 34px;
  line-height: 51px;
  ${media.phone`
    font-size: 32px;
  `};
`;

const MainTitleContainer = DefaultContainer.extend`
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

const MessageContainer = DefaultContainer.extend`
  margin-bottom: 30px;
`;

const RecommendLinkContainer = DefaultContainer.extend`
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
      <MainTitle>ごめんなさい！<br />処理に問題が発生しました。</MainTitle>
    </MainTitleContainer>

    <MessageContainer>
      <Text>しばらくお待ちいただくか、お急ぎの場合はお問い合わせください。</Text>
    </MessageContainer>

    <RecommendLinkContainer>
      <Text>参考のリンク</Text>
      {[
        {
          text: "トップページへ戻る",
          path: "/",
        },
        {
          text: "ホストになる",
          path: Path.signup(),
        },
        {
          text: "はじめての方へ",
          path: Path.about(),
        },
        {
          text: "よくあるご質問",
          path: "#",
        },
      ].map((v,i)=>{
        return (
          <List key={i}><Anchor href={v.path}>{v.text}</Anchor></List>
        );
      })}
    </RecommendLinkContainer>

    <Footer />
  </Fragment>
);
