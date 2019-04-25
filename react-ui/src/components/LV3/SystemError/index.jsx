import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import DefaultContainer from 'components/LV1/DefaultContainer';
import MainTitleContainer from 'components/LV2/StaticMainTitle';
import Text from 'components/LV1/StaticText';

const MessageContainer = styled(DefaultContainer)`
  margin-bottom: ${Dimens.medium2}px;
`;

export default () => (
  <Fragment>
    <MainTitleContainer mainTitle="Sorry..." mainTitleSub="予期せぬエラーが発生しました" />
    <MessageContainer>
      <Text>
        ご不便をおかけし大変申し訳ございません。
        <br />
        日々改善に努めております。しばらく時間を置いて再度試しても解決されない場合は、お手数ですが
        <a href="mailto:support@monooq.com">support@monooq.com</a>までお問い合わせください。
      </Text>
    </MessageContainer>
  </Fragment>
);
