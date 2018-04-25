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
    remind={<TextLink to={Path.resetPassword()}>パスワードを忘れた方はこちら</TextLink>}
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
      <Button facebook center onClick={props.onClickFacebook} loading={props.isLoginChecking}>
        Facebookでログインする
      </Button>
    }
    toSignup={<TextLink to={Path.signup()}>初めてのご利用ですか?新規登録はこちら</TextLink>}
  />
);
