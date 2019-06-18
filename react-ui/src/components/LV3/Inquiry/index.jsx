// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Link } from 'react-router-dom';
import InlineText from 'components/LV1/InlineText';
import TextLink from 'components/LV1/TextLink';
import Button from 'components/LV1/Button';

import { Colors, Dimens } from 'variables';
import Path from 'config/path';

const LinkText = styled(Link)`
  color: ${Colors.brandPrimary};
`;

const Text = styled.div`
  margin-top: ${Dimens.medium1_26}px;
`;

const ButtonWrap = styled.div`
  max-width: 240px;
  margin: 30px auto;
  ${media.phone`
    display: block;
    width: 100%;
    max-width: 100%;
    left: 0px;
    bottom: 0px;
    z-index: 1000;
    text-align: center;
    padding: 0 0 15px;
  `};
`;

const UnsubscribeText = styled.div`
  ${media.phone`
    position: absolute;
    bottom: 15px;
  `};
`;

type PropTypes = {
  isLogin: boolean,
};

export default ({ isLogin }: PropTypes) => (
  <Fragment>
    <Text>
      <InlineText.Base>
        サービス利用でのご不明点は「
        <LinkText to={Path.howToUse()}>よくある質問</LinkText>
        」をご確認ください。
        <br />
        上記で解決しなかった場合やその他のお問い合わせは、LINEにて対応しております。
        <br />
        モノオク公式LINEアカウントを友だち追加してご連絡ください。
        <br />
        モノオクカスタマーサポートが順次返信いたします。
      </InlineText.Base>
      <ButtonWrap>
        <Button line reactGACategory="Inquiry" reactGAAction="Push LINE Register Button">
          友だち追加
        </Button>
      </ButtonWrap>
    </Text>
    {isLogin && (
      <UnsubscribeText>
        <TextLink to={Path.unsubscribe()} fontsizesp={15} color={Colors.brandPrimary}>
          退会希望の方はこちら
        </TextLink>
      </UnsubscribeText>
    )}
  </Fragment>
);
