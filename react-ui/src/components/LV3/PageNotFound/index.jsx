import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes } from 'variables';
import PageDefault from 'components/LV1/PageDefault';
import ImageLogo from 'components/LV1/Images/ImageLogo';
import Text from 'components/LV1/Texts/TextStatic';
import MainTitleWrap from 'components/LV2/Texts/MainTitleStatic';
import LinkList from 'components/LV2/Lists/LinkList';

const WrapContent = styled(PageDefault)`
  text-align: center;
  margin: 100px auto ${Dimens.medium3_40}px;
  ${media.tablet`
    margin: ${Dimens.large4_80}px auto ${Dimens.medium3_40}px;
  `};
`;

const MessageWrap = styled.div`
  margin-bottom: ${Dimens.medium3_40}px;
  ${media.phone`
    margin-bottom: ${Dimens.medium_20}px;
  `};
`;

const MonoboyWrap = styled.div`
  width: 100%;
  max-width: 200px;
  margin: 0px auto;
  ${media.phone`
    max-width: 120px;
  `};
`;

const BrStyled = styled.br`
  display: none;
  ${media.tablet`
    display: block;
  `};
`;

export default () => (
  <WrapContent>
    <MonoboyWrap>
      <ImageLogo.MonoboyBlack />
    </MonoboyWrap>
    <MainTitleWrap
      mainTitle="ごめんなさい！"
      mainTitleSub="お探しのページが見つかりません。"
      noMarginTop
      fontSizeSp={FontSizes.medium1}
    />
    <MessageWrap>
      <Text fontSizeSp={FontSizes.small_15}>
        404エラー
        <br />
        ご指定のページは削除されたか、
        <BrStyled />
        移動した可能性があります。
      </Text>
    </MessageWrap>
    <LinkList
      list={[
        {
          text: 'トップページへ戻る',
          path: '/',
        },
      ]}
      isCenter
    />
  </WrapContent>
);
