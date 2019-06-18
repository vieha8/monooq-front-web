import React, { Fragment } from 'react';
import Path from 'config/path';

import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes } from 'variables';
import DefaultContainer from 'components/LV1/DefaultContainer';
import Footer from 'components/LV2/Footer';
import MainTitleContainer from 'components/LV2/StaticMainTitle';
import RecommendLinkList from 'components/LV2/RecommendLinkList';
import Text from 'components/LV1/StaticText';
import Logo from 'components/LV1/Logo';

const WrapContent = styled.div`
  text-align: center;
`;

const MessageContainer = styled(DefaultContainer)`
  margin-bottom: ${Dimens.large}px;
  ${media.phone`
    margin-bottom: ${Dimens.medium_20}px;
  `};
`;

const MonoboyWrap = styled.div`
  width: 100%;
  max-width: 200px;
  margin: 0px auto ${Dimens.small_11}px;
  padding-top: ${Dimens.medium2_36}px;
  ${media.phone`
    max-width: 120px;
    padding-top: 0px;
  `};
`;

const BrStyled = styled.br`
  display: none;
  ${media.tablet`
    display: block;
  `};
`;

export default () => (
  <Fragment>
    <WrapContent>
      <MonoboyWrap>
        <Logo.MonoboyBlack />
      </MonoboyWrap>

      <MainTitleContainer
        mainTitle="ごめんなさい！"
        mainTitleSub="お探しのページが見つかりません。"
        noMarginTop
        fontSizeSp={FontSizes.medium1}
      />

      <MessageContainer>
        <Text fontSizeSp={FontSizes.small_15}>
          404エラー
          <br />
          ご指定のページは削除されたか、
          <BrStyled />
          移動した可能性があります。
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
            text: 'よくある質問',
            path: 'https://help.monooq.com/',
            blank: '_blank',
          },
        ]}
      />
    </WrapContent>

    <Footer />
  </Fragment>
);
