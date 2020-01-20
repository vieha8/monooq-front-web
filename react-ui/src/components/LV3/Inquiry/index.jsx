import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import Button from 'components/LV1/Forms/Button';
import InlineText from 'components/LV1/Texts/InlineText';
import TextLink from 'components/LV1/Texts/TextLink';
import { Colors, Dimens } from 'variables';
import Path from 'config/path';

const Wrap = styled.div``;

const HyperLink = styled.a`
  color: ${Colors.brandPrimary};
`;

const Text = styled.div`
  margin-top: ${Dimens.medium1_26}px;
`;

const ButtonWrap = styled.div`
  max-width: 240px;
  margin: ${Dimens.medium2}px auto ${Dimens.medium2}px 0px;
  ${media.phone`
    width: 100%;
    max-width: 100%;
    padding: 0 0 15px;
  `};
`;

const UnsubscribeText = styled.div``;

export default ({ isLogin }) => (
  <Wrap>
    <Text>
      <InlineText.Base>
        サービス利用でのご不明点は「
        <HyperLink href="https://help.monooq.com/" target="_blank" rel="noopener noreferrer">
          よくある質問
        </HyperLink>
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
  </Wrap>
);
