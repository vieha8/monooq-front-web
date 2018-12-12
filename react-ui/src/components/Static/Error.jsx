import React, { Fragment } from 'react';
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
      <MainTitle>ページが表示できません</MainTitle>
    </MainTitleContainer>

    <MessageContainer>
      <Text>ご不便をおかけし大変申し訳ございません。原因究明・改善に努めております。</Text>
      <Text>
        しばらく時間を置いても解決されない場合は、お手数ですが画面右下のボタンからお問い合わせください。
      </Text>
    </MessageContainer>

    <RecommendLinkContainer>
      {[
        {
          text: 'トップページへ戻る',
          path: '/',
        },
      ].map((v, i) => (
        <List key={i.toString()}>
          <Anchor href={v.path}>{v.text}</Anchor>
        </List>
      ))}
    </RecommendLinkContainer>
    <Footer />
  </Fragment>
);
