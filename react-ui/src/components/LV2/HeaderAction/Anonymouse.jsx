// @flow

import React from 'react';
import styled from 'styled-components';
import TextLink from 'components/LV1/TextLink';
import { Colors, FontSizes } from 'variables';
import Button from 'components/LV1/Button';
import { media } from 'helpers/style/media-query';

const Container = styled.span`
  display: table;
  height: 100%;
  margin-right: 35px;
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
  loginUri: string,
  onClickLogin: Function,
  signupUri: string,
};

export default ({ signupUri, loginUri, onClickLogin }: PropTypes) => (
  <Container>
    <OnlyPC>
      <TextWrapper>
        <TextLink href={signupUri} color={Colors.brandPrimary} bold>
          新規登録
        </TextLink>
      </TextWrapper>
      <TextWrapper>
        <Button
          primary
          link
          href={loginUri}
          onClick={onClickLogin}
          fontbold
          height={40}
          lineheight={15}
        >
          ログイン
        </Button>
      </TextWrapper>
    </OnlyPC>
    <OnlyPhone>
      <TextWrapper>
        <Button
          primary
          link
          href={loginUri}
          onClick={onClickLogin}
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
