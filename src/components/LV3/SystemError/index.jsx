import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes } from 'variables';
import PageDefault from 'components/LV1/PageDefault';
import ImageLogo from 'components/LV1/Images/ImageLogo';
import Text from 'components/LV1/Texts/TextStatic';
import MainTitleWrap from 'components/LV2/Texts/MainTitleStatic';

const WrapContent = styled.div`
  text-align: center;
`;

const MessageWrap = styled.div`
  margin-bottom: ${Dimens.medium2}px;
`;

const MonoboyWrap = styled.div`
  width: 100%;
  max-width: 200px;
  margin: 0px auto ${Dimens.small_11}px;
  padding-top: ${Dimens.medium2_36}px;
  ${media.phone`
    max-width: 120px;
    padding-top: ${Dimens.medium1_26}px;
  `};
`;

export default () => (
  <PageDefault>
    <WrapContent>
      <MonoboyWrap>
        <ImageLogo.MonoboyBlack />
      </MonoboyWrap>
      <MainTitleWrap
        mainTitle="Sorry..."
        mainTitleSub="予期せぬエラーが発生しました"
        noMarginTop
        fontSizeSp={FontSizes.medium1}
      />
      <MessageWrap>
        <Text>
          ご不便をおかけし大変申し訳ございません。
          <br />
          日々改善に努めております。しばらく時間を置いて再度試しても解決されない場合は、お手数ですが
          <a href="mailto:support@monooq.com">support@monooq.com</a>
          までお問い合わせください。
        </Text>
      </MessageWrap>
    </WrapContent>
  </PageDefault>
);
