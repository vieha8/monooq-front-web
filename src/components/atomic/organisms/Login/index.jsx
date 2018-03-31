// @flow

import React from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import Button from 'components/atomic/atoms/Button';
import InlineText from 'components/atomic/atoms/InlineText';
import { H1 } from 'components/atomic/atoms/Headline';
import TextLink from 'components/atomic/atoms/TextLink';
import IconInputField from 'components/atomic/molecules/IconInputField';
import logoUri from 'images/monooq_logo_mark.svg';
import Form from './Form';

const Logo = styled.img`
  width: 60px;
  height: 60px;
`;

type PropTypes = {
  onClickFacebook: Function,
  onClickLogin: Function,
  onChangeEmail: Function,
  onChangePassword: Function,
  email: string,
  password: string,
  loginFailed: boolean,
  buttonDisabled: boolean,
  isLoginChecking: boolean,
}

export default (props: PropTypes) => (
  <Form
    logo={<Logo src={logoUri} />}
    title={<H1>ログインする</H1>}
    email={
      <IconInputField
        iconClassName="fal fa-envelope"
        placeholder="example.com"
        value={props.email}
        onChange={e => props.onChangeEmail(e.target.value)}
      />
    }
    pass={
      <IconInputField
        iconClassName="fal fa-unlock-alt"
        placeholder="パスワード"
        value={props.password}
        onChange={e => props.onChangePassword(e.target.value)}
      />
    }
    remind={<TextLink to={Path.passwordReset()}>パスワードを忘れた方はこちら</TextLink>}
    login={
      <Button
        primary
        center
        onClick={props.onClickLogin}
        disabled={props.buttonDisabled}
        loading={props.isLoginChecking}
      >
        ログインする
      </Button>
    }
    otherLogin={<InlineText.Base>お持ちのアカウントでログイン</InlineText.Base>}
    facebook={
      <Button
        facebook
        center
        onClick={props.onClickFacebook}
        loading={props.isLoginChecking}
      >
        Facebookでログインする
      </Button>
    }
    toSignup={<TextLink to={Path.signup()}>初めてのご利用ですか?新規登録はこちら</TextLink>}
  />
);
