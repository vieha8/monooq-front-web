import React, { Fragment } from 'react';
import styled from 'styled-components';
import DefaultContainer from 'components/atomic/containers/DefaultContainer';
import Footer from 'components/atomic/LV2/Footer';
import MainTitleContainer from 'components/atomic/LV2/StaticMainTitle';
import RecommendLinkList from 'components/atomic/LV2/RecommendLinkList';
import Text from 'components/atomic/LV1/StaticText';

const MessageContainer = styled(DefaultContainer)`
  margin-bottom: 30px;
`;

export default () => (
  <Fragment>
    <MainTitleContainer mainTitle="ページが表示できません" />

    <MessageContainer>
      <Text>ご不便をおかけし大変申し訳ございません。原因究明・改善に努めております。</Text>
      <Text>
        しばらく時間を置いても解決されない場合は、お手数ですが画面右下のボタンからお問い合わせください。
      </Text>
    </MessageContainer>

    <RecommendLinkList
      Text="参考のリンク"
      list={[
        {
          text: 'トップページへ戻る',
          path: '/',
        },
      ]}
    />

    <Footer />
  </Fragment>
);
