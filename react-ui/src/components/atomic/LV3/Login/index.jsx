// @flow

import React from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import Button from 'components/atomic/LV1/Button';
import InlineText from 'components/atomic/LV1/InlineText';
import { H1 } from 'components/atomic/LV1/Headline';
import TextLink from 'components/atomic/LV1/TextLink';
import IconInputField from 'components/atomic/LV2/IconInputField';
import logoUri from 'images/monooq_logo_mark.svg';
import { Colors } from 'variables';
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
};

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
        type="password"
        iconClassName="fal fa-unlock-alt"
        placeholder="パスワード"
        value={props.password}
        onChange={e => props.onChangePassword(e.target.value)}
      />
    }
    failed={
      props.loginFailed && (
        <InlineText.Small color={Colors.error}>
          ユーザー名またはパスワードに誤りがあります。
        </InlineText.Small>
      )
    }
    remind={<TextLink to={Path.resetPassword()}>パスワードをお忘れの方はこちら</TextLink>}
    login={
      <Button
        primary
        fill={1}
        onClick={props.onClickLogin}
        disabled={props.buttonDisabled}
        loading={props.isLoginChecking}
      >
        ログイン
      </Button>
    }
    facebook={
      <Button facebook fill={1} onClick={props.onClickFacebook} loading={props.isLoginChecking}>
        Facebookでログイン
      </Button>
    }
    toSignup={<TextLink to={Path.signUp()}>新規登録はこちら</TextLink>}
  />
);
