// @flow

import React from 'react';
import styled from 'styled-components';
import Button from 'components/atomic/atoms/Button';
import InlineText from 'components/atomic/atoms/InlineText';
import { H1 } from 'components/atomic/atoms/Headline';
import TextLink from 'components/atomic/atoms/TextLink';
import InputField from 'components/atomic/atoms/InputField';
import { Colors, FontSizes, Dimens } from 'variables';
import logoUri from 'images/monooq_logo_mark.svg';

const Container = styled.div`
  background: ${Colors.white};
  padding: ${Dimens.large}px;
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
`;

type PropTypes = {
  
}

export default (props: PropTypes) => (
  <Container>
    <Logo src={logoUri} />
    <H1>ログインする</H1>
    <InputField />
    <InputField />
    <TextLink to="">パスワードを忘れた方はこちら</TextLink>
    <Button.Primary>ログインする</Button.Primary>
    <InlineText.Base>お持ちのアカウントでログイン</InlineText.Base>
    <Button.Facebook>Facebookでログインする</Button.Facebook>
    <TextLink to="">初めてのご利用ですか?新規登録はこちら</TextLink>
  </Container>
);
