// @flow

import React from 'react';
import styled from 'styled-components';
import Button from 'components/LV1/Forms/Button';
import TextLink from 'components/LV1/Texts/TextLink';
import { Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.span`
  display: table;
  height: 100%;
  ${media.tablet`
    margin-right: 3px;
  `};
`;

const TextWrapper = styled.span`
  width: 128px;
  ${media.tablet`
    width: auto;
    max-width: 128px;
  `};
  ${media.phone`
    min-width: 128px;
  `};
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  &:not(:first-child) {
    margin-left: 8px;
  }
`;

const OnlyPC = styled.span`
  display: block;
  ${media.tablet`
    display: none;
  `};
`;

const OnlyPhone = styled.span`
  display: none;
  ${media.tablet`
    display: block;
  `};
`;

type PropTypes = {
  loginUrl: string,
  signupUrl: string,
};

export default ({ signupUrl, loginUrl }: PropTypes) => (
  <Container>
    <OnlyPC>
      <TextWrapper>
        <TextLink href={signupUrl} color={Colors.black}>
          モノオクとは？
        </TextLink>
      </TextWrapper>
      <TextWrapper>
        <TextLink href={signupUrl} color={Colors.black}>
          利用の流れ
        </TextLink>
      </TextWrapper>
      <TextWrapper>
        <TextLink href={signupUrl} color={Colors.black}>
          よくある質問
        </TextLink>
      </TextWrapper>
      <TextWrapper>
        <TextLink href={loginUrl} color={Colors.white} colorHover={Colors.brandPrimary} bold>
          ログイン
        </TextLink>
      </TextWrapper>
      <TextWrapper>
        <Button quaternary link href={signupUrl} fontbold height={40} lineheight={15}>
          新規登録
        </Button>
      </TextWrapper>
    </OnlyPC>
    <OnlyPhone>
      <TextWrapper>
        <Button
          primary
          link
          href={loginUrl}
          fontSize={FontSizes.small_12}
          fontSizeSp={FontSizes.small_12}
          fontbold
          height={36}
          lineheight={12}
        >
          新規登録・ログイン
        </Button>
      </TextWrapper>
    </OnlyPhone>
  </Container>
);
